module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "sls-yellow": {
                    DEFAULT: "#FFF1A3",
                }
            }
        },
        fontFamily: {
            heading: ['Everett', 'sans-serif']
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}