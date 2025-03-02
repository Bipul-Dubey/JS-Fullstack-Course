"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileDetails from "@components/Profile";
import { useSession } from "next-auth/react";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchUserPosts = async () => {
    try {
      const resp = await fetch(`/api/users/${session?.user.id}/posts`);
      if (!resp.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts = await resp.json();
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (post) => {
    router.push(`/prompt/${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Prompt?"
    );
    if (!confirm) return;
    try {
      const resp = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error("Failed to delete post");
      }
      fetchUserPosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!session?.user) return;
    fetchUserPosts();
  }, [session?.user]);

  return (
    <ProfileDetails
      name="My"
      desc="Welcome to your personalized profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
