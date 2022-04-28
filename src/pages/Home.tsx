const Home = (): JSX.Element => {
    return (
        <main className="text-center h-64 flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl">Movie Manager</h1>
            <p className="text-base">Track and organize your movies</p>
            <button
                type="button"
                className="bg-violet-400 text-white p-2 rounded-md"
            >
                Get Started
            </button>
        </main>
    );
};

export default Home;
