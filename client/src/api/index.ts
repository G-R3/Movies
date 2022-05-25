const getMovies = async () => {
    const response = await fetch(`/api/movies`);
    const data = await response.json();

    return data;
};

const getTrending = async () => {
    const response = await fetch(`/api/movies/trending`);
    const data = response.json();

    return data;
};

// eslint-disable-next-line import/prefer-default-export
export { getMovies, getTrending };
