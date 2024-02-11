export const capitalizeSentences = (text = "") => {
  if (!text) return;
  const sentences = text?.split(".");

  const capitalizedSentences = sentences?.map((sentence) => {
    const trimmedSentence = sentence?.trim();
    return (
      trimmedSentence?.charAt(0)?.toUpperCase() + trimmedSentence?.slice(1)
    );
  });

  const result = capitalizedSentences.join(". ");
  return result;
};
