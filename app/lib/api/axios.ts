import axios from "axios";

const tmdbApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default tmdbApi;

console.log("API URL:", JSON.stringify(process.env.NEXT_PUBLIC_TMDB_API_URL));
console.log("Token:", JSON.stringify(process.env.NEXT_PUBLIC_TMDB_API_TOKEN));
