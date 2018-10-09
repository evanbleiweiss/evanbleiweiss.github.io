import * as d3 from 'd3'; 
// import React from 'react';
import React, { Component } from 'react';
// import './App.css';
// import { scaleLinear } from 'd3-scale’;
// import { max } from 'd3-array';
// import { select } from 'd3-selection';

import BarChart from '../components/BarChart';
import Layout from '../components/Layout';

// export class BarChart extends Component {
//    constructor(props){
//       super(props)
//       this.createBarChart = this.createBarChart.bind(this)
//    }

//    componentDidMount() {
//       this.createBarChart()
//    }

//    componentDidUpdate() {
//       this.createBarChart()
//    }

//    createBarChart() {
//       const node = this.node
//       const dataMax = d3.max(this.props.data)
//       const yScale = d3.scaleLinear()
//          .domain([0, dataMax])
//          .range([0, this.props.size[1]])

//    d3.select(node)
//       .selectAll('rect')
//       .data(this.props.data)
//       .enter()
//       .append('rect')
   
//    d3.select(node)
//       .selectAll('rect')
//       .data(this.props.data)
//       .exit()
//       .remove()
   
//    d3.select(node)
//       .selectAll('rect')
//       .data(this.props.data)
//       .style('fill', '#fe9922')
//       .attr('x', (d,i) => i * 25)
//       .attr('y', d => this.props.size[1] - yScale(d))
//       .attr('height', d => yScale(d))
//       .attr('width', 25)
//    }

// render() {
//       return <svg ref={node => this.node = node}
//       width={500} height={500}>
//       </svg>
//    }
// }
// export default BarChart

class App extends Component {
   render() {
   return (
     <Layout>
      <div className='App'>
      <div className='App-header'>
      <h2>d3ia dashboard</h2>
      </div>
      <div>
      <BarChart data={[5,10,1,3]} size={[500,500]} />
      </div>
      </div>
    </Layout>
   )
   }
}

export default App;
