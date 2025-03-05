import { ICategory } from "@/types";
import CreateCategoryModal from "./CreateCategoryModal";

type CategoriesProps = {
  categories: ICategory[]
}

const MangeCategories = ({categories}: CategoriesProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">Mange Categories</h1>
      <CreateCategoryModal />
    </div>
  );
};

export default MangeCategories;
