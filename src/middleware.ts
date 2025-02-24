import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

// ✅ Role-based private route সেটআপের জন্য TypeScript type ডিফাইন করা হয়েছে
type Role = keyof typeof roleBasedPrivateRoutes;

// ✅ লগইন ও রেজিস্ট্রেশন পেজগুলোর জন্য আলাদা route নির্ধারণ করা হয়েছে
const authRoutes = ["/login", "/register"];

// ✅ Role অনুযায়ী অনুমোদিত প্রাইভেট রুট নির্ধারণ করা হয়েছে
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/], // 🔹 user রোলের জন্য অনুমোদিত রুট
  admin: [/^\/admin/], // 🔹 admin রোলের জন্য অনুমোদিত রুট
};

// ✅ Middleware ফাংশন যা প্রতিটি রিকোয়েস্টের আগে রান করবে
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl; // 🔹 বর্তমান URL থেকে path বের করা হয়েছে
  const userInfo = await getCurrentUser(); // 🔹 লগইন করা ইউজারের তথ্য পাওয়া হচ্ছে

  // ✅ যদি ইউজার লগইন না করা থাকে
  if (!userInfo) {
    // 🔹 যদি ইউজার "/login" বা "/register" পেজে যেতে চায়, তাহলে অনুমোদিত দেওয়া হবে
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // 🔹 অন্য যেকোনো পেজের জন্য ইউজারের "/login" এ রিডাইরেক্ট করা হবে
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`, // 🔹 রিডাইরেক্ট করবে পর আগের পেজের পাথ সংরক্ষণ করা হচ্ছে
          request.url
        )
      );
    }
  }

  // ✅ যদি ইউজার লগইন করা থাকে এবং তার role অনুযায়ী অনুমতি থাকে
  if (userInfo.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role]; // 🔹 ইউজারের রোল অনুযায়ী অনুমোদিত রুট বের করা হচ্ছে
    // 🔹 ইউজারের রিকোয়েস্ট করা path যদি role-based private route এর মধ্যে থাকে, তাহলে অ্যাক্সেস অনুমোদন
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url)); // 🔹 অন্য কোনো পেজে যেতে চাইলে হোম পেজে রিডাইরেক্ট করা হবে
};

// ✅ Middleware কোন কোন পাথের জন্য কাজ করবে তা নির্ধারণ করা হয়েছে
export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
