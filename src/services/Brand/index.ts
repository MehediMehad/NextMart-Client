"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Get All Brands
export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      next: {
        tags: ["BRANDS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// Create Brand
export const createBrand = async (brandData: FormData): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`,{
            method: "POST",
            body: brandData,
            headers :{
                Authorization: (await cookies()).get("accessToken")!.value,
            }
        });
        revalidateTag("BRANDS");
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
};

// Delete Brand
export const deleteBrand = async (brandId: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,{
            method: "DELETE",
            headers :{
                Authorization: (await cookies()).get("accessToken")!.value,
            }
        })
        revalidateTag("BRANDS");
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
}