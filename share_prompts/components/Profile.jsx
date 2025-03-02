import React from "react";
import PromptCard from "./PromptCard";

export default function ProfileDetails({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post, index) => (
          <div key={"prompt-" + index} className="flex items-center mb-4">
            <PromptCard
              post={post}
              key={"prompt-card" + index}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
