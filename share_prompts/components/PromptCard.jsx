"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt).then(() => {
      setCopied(post.prompt);
      setTimeout(() => setCopied(""), 3000);
    });
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={() => {
              if (session?.user.id === post.creator._id) {
                router.push(`/profile`);
              } else {
                router.push(`/profile/${post.creator._id}`);
              }
            }}
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="copy"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            height={12}
            width={12}
          />
        </div>
      </div>

      <p className="my-4 text-sm to-gray-700">{post.prompt}</p>
      <p
        className="text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag && post.tag.includes("#") ? post.tag : `#${post.tag}`}
      </p>

      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex justify-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
