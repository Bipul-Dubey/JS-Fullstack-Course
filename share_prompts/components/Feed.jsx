"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

function PromptCardList({ data = [], handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <div key={"prompt-" + index} className="flex items-center mb-4">
          <PromptCard post={post} key={"prompt-card" + index} handleTagClick={handleTagClick} />
        </div>
      ))}
    </div>
  );
}

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch all posts from the API
  const fetchAllPosts = async () => {
    try {
      const response = await fetch("/api/prompt");

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data); // Set all posts
      setFilteredPosts(data); // Set filtered posts initially
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all posts on component mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchText) {
      setFilteredPosts(posts); // If search text is empty, show all posts
      return;
    }

    try {
      const response = await fetch(`/api/prompt?query=${searchText}`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setFilteredPosts(data); // Update filtered posts
    } catch (error) {
      console.error(error);
    }
  };

  // Handle clear search
  const handleClearSearch = async () => {
    setSearchText("");
    await fetchAllPosts();
  };

  // Handle tag click
  const handleTagClick = (tag) => {
    setSearchText(tag)
  };

  return (
    <section className="feed">
      <form className="relative w-full flex items-center gap-2" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          required
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
}