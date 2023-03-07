import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=c7471fa7e958e1f0635e4f3471a52345";
//Get Popular Movies
export const getPopoularMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return res.data.results;
};

//   Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return res.data.results;
};

//Get Populat Tv
export const getPopularTv = async () => {
  const res = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return res.data.results;
};

//Get Family Movies
export const getFamilyMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`
  );
  return res.data.results;
};

//Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`
  );
  return res.data.results;
};

//Get Documentary Movies
export const getMovie = async (id) => {
  const res = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return res.data;
};

//Search Movie or Tv by Keyword
export const searchMovieTv = async (query, type) => {
  const res = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`
  );
  return res.data.results;
};
