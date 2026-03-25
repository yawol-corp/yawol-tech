import Exa from "exa-js";

const apiKey = import.meta.env.VITE_EXA_API_KEY;

if (!apiKey) {
  console.warn("VITE_EXA_API_KEY is not defined in environment variables.");
}

export const exa = new Exa(apiKey);

export type SearchResult = {
  title: string;
  url: string;
  text?: string;
  highlights?: string[];
  score?: number;
  publishedDate?: string;
  author?: string;
};

export async function search(query: string) {
  if (!apiKey) return [];

  const response = await exa.search(query, {
    type: "auto",
    numResults: 10,
    contents: {
      text: { maxCharacters: 1000 }, // Full text but limited for preview
    },
  });

  return response.results as SearchResult[];
}
