import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Box, Container, NavLink } from 'rebass';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const StyledHeader = styled(Box)`
  background-color: #111;
  border: 10px inset grey;
`
const StyledNavLink = styled(NavLink)`
  font-family: 'Sanchez';
  color: #099;
  transform: rotate(-5deg);
`

const Header = ({ brand, ...props }) => (
  
  <StyledHeader is="header" {...props}>
    <Container>
      <StyledNavLink is={GatsbyLink} to="/" px={0} my={3}>
        {brand}
      </StyledNavLink>
    </Container>
  </StyledHeader>
);

Header.propTypes = {
  brand: PropTypes.node.isRequired,
};

export default Header;
