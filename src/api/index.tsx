const API_KEY: string = "f7e5346f3dbaa2b500da070bdda05af4";
const BASE_URL: string = "https://api.themoviedb.org/3/";
const getMovies = async () => {
    const response = await fetch(
        `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );

    const data = await response.json();

    return data;
};

const getMovie = async (movieId: string) => {
    const response = await fetch(
        `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
};

// eslint-disable-next-line import/prefer-default-export
export { getMovies, getMovie };
