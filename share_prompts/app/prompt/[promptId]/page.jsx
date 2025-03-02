"use client";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function UpdatePrompt({ params }) {
  const router = useRouter();
  const { promptId } = use(params);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!promptId) return;
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
        setPost({
          prompt: "",
          tag: "",
        });
      }
    };
    fetchPrompt();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error("Failed to update prompt");
      }
      router.push("/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update prompt", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      post={post}
      type={"Edit"}
      handleSubmit={handleSubmit}
      setPost={setPost}
      submitting={submitting}
    />
  );
}
