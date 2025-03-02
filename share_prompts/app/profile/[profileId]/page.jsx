"use client";
import ProfileDetails from "@components/Profile";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";

export default function UserProfile({ params }) {
  const [posts, setPosts] = useState([]);
  const { profileId } = use(params);

  const fetchUserPosts = async () => {
    try {
      const resp = await fetch(`/api/users/${profileId}/posts`);
      if (!resp.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts = await resp.json();
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!profileId) return;
    fetchUserPosts();
  }, [profileId]);

  return (
    <ProfileDetails
      name={"User"}
      desc={`Welcome to ${
        posts?.at(0)?.creator?.username ?? ""
      } personalized profile page.`}
      data={posts}
    />
  );
}
