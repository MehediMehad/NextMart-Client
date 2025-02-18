import { useState } from "react";
import { Input } from "../../input";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TNMImageUploaderProps {
  setImageFiles: React.Dispatch<React.SetStateAction<File[] | []>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[] | []>>;
  label?: string;
  className?: string;
}

const NMImageUploader = ({
  setImageFiles,
  setImagePreview,
  label,
  className,
}: TNMImageUploaderProps) => {
  // const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  // const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        id="image-uploader"
        onChange={handleImageChange}
        accept="image/*"
        type="file"
        multiple
        className="hidden"
      />
      <label
        htmlFor="image-uploader"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        {label || "Upload"}
      </label>
    </div>
  );
};

export default NMImageUploader;
