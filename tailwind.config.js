/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,scss}", "./dest/**/*.{html,js,scss}"],
    theme: {
        extend: {
            colors: {
                brand: "#00A76F",
                bodyText: "#6F767E",
                stroke: "#E8E8E8",
            },
            fontFamily: {
                inter: '"Inter", sans-serif',
            },
            zIndex: {
                999999: "999999",
                99999: "99999",
                9999: "9999",
                999: "999",
                99: "99",
                9: "9",
                1: "1",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        //…
    ],
};
