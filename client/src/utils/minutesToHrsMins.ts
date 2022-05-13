const minutesToHrsMins = (minutes: number) => {
    const hr = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hr}h ${mins}m`;
};

export default minutesToHrsMins;
