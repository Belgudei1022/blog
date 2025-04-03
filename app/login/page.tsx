"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // Save JWT token to sessionStorage if needed
      if (session) {
        sessionStorage.setItem("jwtToken", JSON.stringify(session));
      }
      router.push("/posts/new");
    }
  }, [status, session, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/posts/new" });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 pt-[150px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white shadow-lg rounded-xl overflow-hidden max-w-[500px]">
        <div className="px-6 py-8 sm:px-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Нэвтрэлт</h1>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form
            onSubmit={handleEmailSignIn}
            className="space-y-6 flex flex-col">
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
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-grow flex items-center justify-center bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-black focus:ring-2 focus:ring-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Нэвтрэх
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={status === "loading"}
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
