module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "eStack Sharer",
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
				name: `eStack Sharer`,
				short_name: `eStack`,
				start_url: `/`,
				background_color: `#EFECFF`,
				theme_color: `#3B28CC`,
				display: `standalone`,
				icon: "src/assets/images/logo.png",
			},
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /\.inline\.svg$/, // See below to configure properly
				},
			},
		},
	],
};
