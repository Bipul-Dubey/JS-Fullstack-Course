import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("query"); // Get the search word

    // Define the search criteria
    const searchCriteria = searchQuery
      ? {
        $or: [
          { tag: { $regex: searchQuery, $options: "i" } }, // Search in tag (case-insensitive)
          { prompt: { $regex: searchQuery, $options: "i" } }, // Search in prompt (case-insensitive)
        ],
      }
      : {}; // If no query, return all prompts

    // Fetch prompts that match the search criteria and populate the creator field
    const prompts = await Prompt.find(searchCriteria).populate("creator");

    // Return the filtered prompts as a JSON response
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};