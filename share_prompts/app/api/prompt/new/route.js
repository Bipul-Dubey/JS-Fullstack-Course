import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, tag, prompt } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();
    return new Response({
      status: 201,
      body: JSON.stringify({
        message: "Prompt created successfully",
        newPrompt,
      }),
    });
  } catch (error) {
    console.error("Error creating prompt", error);
    return new Response({
      status: 500,
      body: JSON.stringify({ message: "Error creating prompt" }),
    });
  }
};
