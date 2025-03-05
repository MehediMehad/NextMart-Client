import MangeCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async () => {
  const {data, meta} = await getAllCategories()
  console.log("Categories fetched: ", data, meta);
  
  return (
    <div>
      <MangeCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
