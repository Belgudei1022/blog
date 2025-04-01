"use client";

import React from "react";
import { ChevronRight, User, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MinimalistBlogHero = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-gray-900 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300 opacity-50"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h1 className="text-6xl font-semibold text-gray-800 mb-6">
          Миний Блог
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Хөнгөн, энгийн бөгөөд гүнзгий. Миний бодол, туршлага, ертөнц.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/posts"
            className="bg-gray-900 text-white px-6 py-3 rounded-full 
              hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Нийтлэлүүд</span>
            <ChevronRight className="ml-2 w-5 h-5 opacity-70" />
          </Link>

          {status === "authenticated" ? (
            <Link
              href="/posts/new"
              className="bg-gray-900 text-white px-6 py-3 rounded-full 
                hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Шинэ нийтлэл</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="border border-gray-500 text-gray-800 px-6 py-3 rounded-full 
                hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Нэвтрэх</span>{" "}
              {/* Changed from "Бүртгүүлэх" to "Нэвтрэх" */}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistBlogHero;
