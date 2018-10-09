//via https://www.codementor.io/blackmind/creating-graphs-as-react-components-with-d3-js-5x0qujojy
import React from 'react';

const Bar = (props) => {
  return (
    <rect
      className={props.className}
      {...props}
    />
  );
}

Bar.propTypes = {
  fill: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  className: React.PropTypes.string
}

Bar.defaultProps = { className: 'barchart-bar' };

export default Bar;
