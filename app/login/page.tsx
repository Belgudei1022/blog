"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleGoogleSignIn = async () => {
  //   const result = await signIn("google", { redirect: false });

  //   if (result?.error) {
  //     console.error("Google Sign-In Failed:", result.error);
  //   } else {
  //     const response = await fetch("/api/auth/session");
  //     const session = await response.json();

  //     if (session?.accessToken) {
  //       sessionStorage.setItem("jwtToken", session.accessToken);
  //     }

  //     router.push("/");
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (res?.error) {
  //       setError("И-мэйл эсвэл нууц үг буруу байна");
  //     } else {
  //       router.push("/");
  //     }
  //   } catch (err) {
  //     setError("Нэвтрэхэд алдаа гарлаа");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-12 pt-[150px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white shadow-lg rounded-xl overflow-hidden max-w-[500px]">
        <div className="px-6 py-8 sm:px-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Нэвтрэлт</h1>
          </div>

          {/* {error && (
            <div className="mb-4 text-center text-red-500 text-sm">{error}</div>
          )} */}

          <form className="space-y-6 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Цахим шуудан
              </label>
              <input
                type="email"
                placeholder="Цахим шууданаа оруулна уу"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 transition placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Нууц үг
              </label>
              <input
                type="password"
                placeholder="Нууц үгээ оруулна уу"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 transition placeholder-gray-400"
              />
            </div>

            {/* <div className="w-full flex flex-row justify-end">
              <Link href="/auth/register">
                <p className="block text-sm font-medium text-gray-700">
                  Бүртгэл үүсгэх
                </p>
              </Link>
            </div> */}

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="flex-grow flex items-center justify-center bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-black focus:ring-2 focus:ring-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Нэвтрэх
              </button>
              <button
                type="button"
                className="flex-grow flex items-center justify-center bg-white text-gray-700 py-3 px-6 rounded-md border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Google-ээр нэвтрэх
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
