"use client";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/services/Category";
import { useState } from "react";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateCategoryModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    try {
      const fromData = new FormData();
      fromData.append("data", JSON.stringify(data)); // All Data
      fromData.append("icon", imageFiles[0] as File); // One Image

      const res = await createCategory(fromData);
      console.log(res);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        if (res?.errorSources[0].message) {
          toast.error(res?.errorSources[0].message);
        } else {
          toast.error(res.message);
        }
      }
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-x-2 mt-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 w-full"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  imagePreview={imagePreview}
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  className="mt-8"
                />
              ) : (
                <div className="mt-8">
                  <NMImageUploader
                    setImagePreview={setImagePreview}
                    setImageFiles={setImageFiles}
                    label="Upload Logo"
                  />
                </div>
              )}
            </div>
            <Button
              disabled={isSubmitting ? true : false}
              type="submit"
              className="mt-5 w-full"
            >
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
