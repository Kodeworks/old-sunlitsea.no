module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "sls-yellow": {
                    DEFAULT: "#FFF1A3",
                },
                black: {
                    DEFAULT: "#1A1A1A"
                }
            },
            fontFamily: {
                heading: ['Everett', 'sans-serif']
            },
            height: {
                "3d-vis": '1200vh'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}