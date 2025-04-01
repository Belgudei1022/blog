"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "../../../lib/types";
import { Image, Tag } from "lucide-react";
import { useSession } from "next-auth/react";

const availableTags = ["Tech", "Life", "Education", "Health", "Travel"];

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  const authorId = session?.user.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
          imageUrl:imageUrl,
          tags: selectedTags,
          authorId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/posts");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Нийтлэл үүсгэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const addCustomTag = () => {
    if (customTag.trim() !== "" && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">New Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Гарчиг
              </label>
              <input
                type="text"
                placeholder="Нийтлэлийн гарчиг оруулна уу"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 transition placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Агуулга
              </label>
              <textarea
                placeholder="Таны бодол, түүх..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 transition placeholder-gray-400 resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Зураг (сонголттой)
              </label>
              <div className="flex">
                <input
                  type="url"
                  placeholder="Зургийн URL оруулна уу"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md shadow-sm focus:ring-gray-700 focus:border-gray-700 transition placeholder-gray-400"
                />
                <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
                  <Image className="text-gray-500" size={20} />
                </span>
              </div>
            </div>

            {/* Таг сонгох хэсэг */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Тагууд
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      selectedTags.includes(tag)
                        ? "bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    } transition`}>
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Шинэ таг нэмэх */}
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Шинэ таг оруулах..."
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-gray-700 focus:border-gray-700"
                />
                <button
                  type="button"
                  onClick={addCustomTag}
                  className="px-4 bg-gray-800 text-white rounded-r-md hover:bg-gray-900 transition">
                  <Tag size={20} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-grow flex items-center justify-center bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-black focus:ring-2 focus:ring-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Хадгалж байна..." : "Нийтлэл Үүсгэх"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/posts")}
                className="flex-grow flex items-center justify-center bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition duration-300">
                Цуцлах
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
