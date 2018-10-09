module.exports = {
  siteMetadata: {
    title: 'awst.in',
    language: 'en',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "awst.in",
        short_name: "awst.in",
        start_url: "/",
        background_color: "#00dead",
        theme_color: "#00dead",
        display: "minimal-ui",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sw',
  ],
};
