"use client";
import { ICategory } from "@/types";
import CreateCategoryModal from "./CreateCategoryModal";
import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";

type CategoriesProps = {
  categories: ICategory[]
}

const MangeCategories = ({categories}: CategoriesProps) => {
  const handleDelete = (data: ICategory) => {
    console.log(data);
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
    <>
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">Mange Categories</h1>
      <CreateCategoryModal />
    </div>
    <div className="">
      <NMTable data={categories} columns={columns}/>
    </div>
    </>
  );
};

export default MangeCategories;
