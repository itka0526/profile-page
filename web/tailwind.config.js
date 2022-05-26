const tailwindcss = require("tailwindcss");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                "first-custom-animation":
                    "first-custom-animation 2.5s ease forwards 1",
                "second-custom-animation":
                    "second-custom-animation 2.5s ease forwards 1",
                "third-custom-animation":
                    "third-custom-animation 2.5s ease forwards 1",
            },
            keyframes: {
                "first-custom-animation": {
                    "0%": { transform: "translate(0, 0)" },
                    "100%": {
                        transform: "translate(-55%, 100%) ",
                    },
                },
                "second-custom-animation": {
                    "0%": { transform: "translate(0, 0)" },
                    "100%": {
                        transform: " translateX(110%)",
                    },
                },
                "third-custom-animation": {
                    "0%": { transform: "translate(0, 0)" },
                    "100%": {
                        transform: " translate(-55%, -100%)",
                    },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animation-delay")],
};
