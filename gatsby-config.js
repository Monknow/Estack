module.exports = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "Estack",
    },
    plugins: [
        "gatsby-plugin-styled-components",
        "gatsby-plugin-react-helmet",
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Estack`,
                short_name: `Estack`,
                start_url: `/`,
                background_color: `#EFECFF`,
                theme_color: `#3B28CC`,
                display: `standalone`,
                icon: "src/assets/svg/logo.svg",
            },
        },
        {
            resolve: "gatsby-theme-firebase",
            options: {
                credentials: {
                    apiKey: "AIzaSyCpk9X8jI8nL_uGgh30d9QGC3sPWeJZ3hg",
                    authDomain: "stack-sharer.firebaseapp.com",
                    databaseURL:
                        "https://stack-sharer-default-rtdb.firebaseio.com",
                    projectId: "stack-sharer",
                    storageBucket: "stack-sharer.appspot.com",
                    messagingSenderId: "150299166815",
                    appId: "1:150299166815:web:c66791b692f0236ec1f3ea",
                },
                loginRedirectPath: "/app",
            },
        },
    ],
};
