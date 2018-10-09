import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import { Container, Heading, Link, Text } from 'rebass';
import Layout from '../components/Layout';
import { BarChart, ScatterChart } from '../components/Charts'

const IndexPage = () => (
  <Layout>
    <Container>
      <Heading my={3}>Hi, how are you?</Heading>
      <Text is="p">You've ended up at a site I use to play around with new technologies.</Text>
      <Text is="p">I aim to turn this into a PWA for visualizing public data sets</Text>
      <Text is="p">and also to navigate the issues of DOM ownership between React and D3</Text>
      <Text is="p" my={3}>
        <Link is={GatsbyLink} to="/AustinFoodScores/">
          For example, here I'm starting to chart food inspection dataset from the City of Austin
        </Link>
      </Text>
      <Text is="p" my={3}>
        <a href="https://gitlab.com/vermin/docker-gatsby-d3" target="_blank">
          Care to scope out the source code?
        </a>
      </Text>
      <Text is="p" my={3}>
        Or, if you use the&nbsp;
        <a href="https://beakerbrowser.com/" target="_blank">
          Beaker Browser 
        </a>
        &nbsp;you can navigate to the P2P version of this site at: <br />
        <a href="dat://f6cbf851793a484932444db31098e6581dbaafec96d545ce2b342a044798220b/" target="_blank">
          dat://f6cbf851793a484932444db31098e6581dbaafec96d545ce2b342a044798220b
        </a>
      </Text>
    </Container>
  </Layout>
);

export default IndexPage;
