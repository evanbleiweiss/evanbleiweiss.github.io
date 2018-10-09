import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex, Heading, Provider as RebassProvider, Text } from 'rebass';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import Footer from './Footer';
import Header from './Header';

injectGlobal`
  body {
    margin: 0;
    text-size-adjust: 100%;
    background-color: #444;
  }

  main h2 {
    font-family: 'Sanchez';
  }
  
  main {
    margin: 20px;
    background-color: #DDD;
    font-family: 'Ubuntu';
  }
`;

const Layout = ({ children }) => (
  <RebassProvider 
    theme={{
      fonts: {
        // sans: 'Poriet One'
      },
      blogPost: {
        background: 'red',
      }

    }}
    is={Flex} 
    flexDirection="column" 
    css={{ minHeight: '100vh' 
  }}>

    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              language
            }
          }
        }
      `}
      render={data => (
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        >
          <html lang={data.site.siteMetadata.language} />
          <link href="https://fonts.googleapis.com/css?family=Sanchez:400" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:400" rel="stylesheet" />
        </Helmet>
      )}
    />

    <Header brand={<Heading>awst.in</Heading>} />

    <Box is="main" flex={1}>
      {children}
    </Box>

    <Footer>
      <Text align="center">Thanks for stopping by!</Text>
    </Footer>
  </RebassProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
