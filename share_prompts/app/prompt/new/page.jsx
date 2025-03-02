"use client";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function CreatePrompt() {
  const router = useRouter();
  const { data } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: data?.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create prompt");
      }
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      handleSubmit={createPrompt}
      submitting={submitting}
    />
  );
}
