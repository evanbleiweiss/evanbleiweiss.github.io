import React from 'react';
import Helmet from 'react-helmet';
import { Container } from 'rebass';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import Layout from '../components/Layout';

// import '../css/blog-post.css'; // make it pretty!

injectGlobal`
  h1, h3 {
    color: #00DEAD;
  }
`;

const StyledPostContainer = styled.div`
  background: #CCC;
`;

function showHide() {
//   const elements = document.getElementsByTagName('h3');
//   console.log(elements);
//   console.log("asdadadsa");
//   // console.log(elements.map( a => a.getBoundingClientRect() ));
};

export default function Template({
  data // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { markdownRemark: post } = data; // data.markdownRemark holds our post data
  // console.log(data);
  // showHide();
  return (
    <Layout>
      <Container>
        <StyledPostContainer>
          <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
          <div className="blog-post">
            <h1>{post.frontmatter.title}</h1>
            <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
      </StyledPostContainer>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
  }
`;


// import React from 'react'

// export default function Template({
//   data, // this prop will be injected by the GraphQL query below.
// }) {
//   const { markdownRemark } = data; // data.markdownRemark holds our post data


//   console.log('data')
//   console.log(data)
//   const { frontmatter, html } = markdownRemark;
//   console.log('html')
//   console.log(html)
  
//   return (
//     <div className="blog-post-container">
//       <div className="blog-post">
//         <h1>{frontmatter.title}</h1>
//         <h2>{frontmatter.date}</h2>
//         <div
//           className="blog-post-content"
//           dangerouslySetInnerHTML={{ __html: html }}
//         />
//       </div>
//     </div>
//   );
// }

// export const pageQuery = graphql`
//   query BlogPostByPath($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         path
//         title
//       }
//     }
//   }
// `;

