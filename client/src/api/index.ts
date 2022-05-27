const getMovies = async (pageNumber = 1) => {
    const response = await fetch(`/api/movies?page=${pageNumber}`, {
        method: "GET",
    });
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
