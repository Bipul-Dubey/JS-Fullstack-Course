import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
// GET (READ)
export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const prompts = await Prompt.findById(id).populate("creator");
    if (!prompts) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating prompt", error);
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

// PATCH (UPDATE)
export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    // Update the prompt in a single operation
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      { prompt, tag },
      { new: true }
    ).populate("creator");

    if (!updatedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (DELETE)
export const DELETE = async (res, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const prompts = await Prompt.findByIdAndDelete(id);
    if (!prompts) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting prompt", error);
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
