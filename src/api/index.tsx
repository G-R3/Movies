const API_KEY: string = "f7e5346f3dbaa2b500da070bdda05af4";
const BASE_URL: string = "https://api.themoviedb.org/3/";

const getMovies = async () => {
    const response = await fetch(
        `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );

    const data = await response.json();

    return data;
};

const getMovie = async (movieId: number) => {
    const response = await fetch(
        `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
};

const getMovieCredits = async (movieId: number) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );

    const data = response.json();

    return data;
};

const getMovieRecommendations = async (movieId: number) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );

    const data = response.json();

    return data;
};

const getTrending = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );

    const data = response.json();

    return data;
};

// eslint-disable-next-line import/prefer-default-export
export {
    getMovies,
    getMovie,
    getMovieCredits,
    getMovieRecommendations,
    getTrending,
};
