import MangeCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async () => {
  const data = await getAllCategories()
  console.log("Categories fetched: ", data);
  
  return (
    <div>
      <MangeCategories />
    </div>
  );
};

export default ProductCategoryPage;
