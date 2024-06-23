const EXERCISE_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
  },
};

const YOUTUBE_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
  },
};

const baseUrl = "https://exercisedb.p.rapidapi.com/exercises";
const baseYoutubeUrl = "https://youtube-search-and-download.p.rapidapi.com";

export const getExercises = async (limit = 0) => {
  const response = await fetch(`${baseUrl}?limit=${limit}`, EXERCISE_OPTIONS);
  const data = await response.json();
  return data;
};

export const getExerciseById = async (id) => {
  if (!id) return;
  const response = await fetch(`${baseUrl}/exercise/${id}`, EXERCISE_OPTIONS);
  const data = await response.json();
  return data;
};

export const getExercisesByBodyPart = async (bodyPart = "") => {
  const response = await fetch(
    `${baseUrl}/bodyPart/${bodyPart}`,
    EXERCISE_OPTIONS
  );
  const data = await response.json();
  return data;
};

export const getBodyParts = async () => {
  const response = await fetch(`${baseUrl}/bodyPartList`, EXERCISE_OPTIONS);
  const data = await response.json();
  return data;
};

export const getExerciseByTargetMuscle = async (target = "") => {
  if (!target) return;
  const response = await fetch(`${baseUrl}/target/${target}`, EXERCISE_OPTIONS);
  const data = await response.json();
  return data;
};
export const getExercisesByEquipment = async (equipment = "") => {
  const response = await fetch(
    `${baseUrl}/equipment/${equipment}`,
    EXERCISE_OPTIONS
  );
  const data = await response.json();
  return data;
};

export const getYoutubeRelatedVideo = async (search = "") => {
  const response = await fetch(
    `${baseYoutubeUrl}/search?query=${search}`,
    YOUTUBE_OPTIONS
  );
  const data = await response.json();
  return data;
};
