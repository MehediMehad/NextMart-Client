"use client";
import { ICategory } from "@/types";
import CreateCategoryModal from "./CreateCategoryModal";
import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { deleteCategory } from "@/services/Category";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";

type CategoriesProps = {
  categories: ICategory[]
}

const MangeCategories = ({categories}: CategoriesProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);


  const handleDelete = (data: ICategory) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.icon || "https://res.cloudinary.com/dxbpbbpbh/image/upload/v1741200524/bzodt9ruhku-1741200514653-icon-c5a00375d647591a14dd36e31151acb1.jpg"}
            alt={row.original.name || "product-icon"}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <NMTable data={categories} columns={columns} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MangeCategories;
