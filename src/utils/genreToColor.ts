interface Theme {
    background: string;
    color: string;
}
const colorMap: Record<string, Theme> = {
    // pink
    Action: {
        background: "#FED7E2",
        color: "#702459",
    },
    Romance: {
        background: "#FED7E2",
        color: "#702459",
    },
    // cyan
    Adventure: {
        background: "#C4F1F9",
        color: "#086F83",
    },
    Animation: {
        background: "#76E4F7",
        color: "#065666",
    },
    // orange
    Comedy: {
        background: "#FEEBC8",
        color: "#7B341E",
    },
    History: {
        background: "#FBD38D",
        color: "#652B19",
    },
    // red
    Crime: {
        background: "#FED7D7",
        color: "#822727",
    },
    // yellow
    Documentary: {
        background: "#F6E05E",
        color: "#5F370E",
    },
    Family: {
        background: "#FEFCBF",
        color: "#744210",
    },
    // Teal
    Drama: {
        background: "#B2F5EA",
        color: "#234E52",
    },
    "TV Movie": {
        background: "#81E6D9",
        color: "#234E52",
    },
    // purple
    Fantasy: {
        background: "#D6BCFA",
        color: "#322659",
    },
    "Science Fiction": {
        background: "#E9D8FD",
        color: "#44337A",
    },
    // gray
    Horror: {
        background: "#E2E8F0",
        color: "#1A202C",
    },
    // blue
    Music: {
        background: "#90CDF4",
        color: "#1A365D",
    },
    Mystery: {
        background: "#BEE3F8",
        color: "#2A4365",
    },
    // green
    Thriller: {
        background: "#C6F6D5",
        color: "#22543D",
    },
    // black & white
    War: {
        background: "#000000",
        color: "#ffffff",
    },

    Western: {
        background: "#FFFAF0",
        color: "#9C4221",
    },
};

export default colorMap;
