"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

function PromptCardList({ data = [], handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <div key={"prompt-" + index} className="flex items-center mb-4">
          <PromptCard post={post} key={"prompt-card" + index} />
        </div>
      ))}
    </div>
  );
}

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchText = (e) => {
    // Implement search functionality here
  };

  const handleTagClick = (tag) => {
    router.push(`/tags/${tag}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full items-center">
        <input
          type="text"
          placeholder="Seach for a tag or a username"
          className="search_input peer"
          required
          value={searchText}
          onChange={handleSearchText}
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
}
