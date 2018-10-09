import * as d3 from 'd3'; 
import React, { Component } from 'react';
import { min, size, sum, uniq } from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* Design Goal
 *  <Sparkline
    className='visitors'
    sizing = { ... }
    data={
      data : [{value, label},{...},...]
      data.yAxisLabel : "Counties",
      data.xAxisLabel : "Unemployment (%)"
    }
}
      [...],
      labels: { ... }
    }
/>,
 *
 *
 * */

// Think about extracting these into a common set of params or props
// const svg = d3.select(node)
//   .style('background-color', colors.background)
//   .style('width', sizing.width)
//   .style('height', sizing.height)
//   .attr("width", sizing.width)
//   .attr("height", sizing.height)

// const xAxis = g => g
//   .attr("transform", `translate(0,${chartHeight})`)
//   .call(d3.axisBottom(x).tickSizeOuter(0))
//   .call(g => g.append("text")
//     .attr("x", sizing.width - sizing.margin.right)
//     .attr("y", -4)
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "end")
//     .text(xLabel))

// const yAxis = g => g
//   .attr("transform", `translate(${sizing.margin.left},0)`)
//   .call(d3.axisLeft(y))
//   .call(g => g.select(".domain").remove())
//   .call(g => g.select(".tick:last-of-type text").clone()
//     .attr("x", 4)
//     .attr("text-anchor", "start")
//     .attr("font-weight", "bold")
//     .text(yLabel));

const StyledSVG = styled.svg`
  background: white;
`
const SVG = ({...props}) => { return <StyledSVG></StyledSVG> };

export class ScatterChart extends Component {
    // Set initial state in the `constructor()` function
    constructor(props) {
        super(props);
        // Set initial state
        // this.state = {
        //     numPoints:10
        // };
    }

    // When the component mounts, run the `updatePoints()` method
    componentDidMount() {
        this.createChart()
    }

    // When the component updates, run the `updatePoints()` method
    componentDidUpdate() {
       this.createChart()
    }

    // Method to update the cirlces using D3
    createChart() {
      // Randomly generate points based on the `width` and `height` props
      // let data = d3.range(this.state.numPoints).map((d) => {
      //     return {x: Math.random() * this.props.width, y: Math.random() * this.props.height}
      // });
      let {colors, data, r, sizing} = this.props;

      // set display bounds
      const chartWidth = sizing.width - sizing.margin.left - sizing.margin.right;
      const chartHeight = sizing.height - sizing.margin.top - sizing.margin.bottom;
      const x = d3.scaleLinear()
                 .domain(d3.extent(data, d => d.x)).nice()
                 .range([sizing.margin.left, chartWidth]);

      // Select all the circles within thje <g> element
      let circles = d3.select(this.node).selectAll('circle').data(data);


      // Use the .enter() method to get your entering elements, and assign their positions
      circles.enter().append('circle')
          .attr('r', (d) => d.r)
          .attr('fill', (d) => colors.primary) 
          .attr('cx', (d) => x(d.x))
          .attr('cy', (d) => d.y)
          .append('title')
          .text(d => d.label)
    }
    
    // Render method
    render() {
        // Return HTML elements to hold the chart
        const {sizing} = this.props;
        return (                  
          <StyledSVG className="chart" width={sizing.width} height={sizing.height}>
            <g ref={(node) => { this.node = node; }}
               transform={`translate(${sizing.margin.left}, ${sizing.margin.top})`} />
          </StyledSVG>
        )
    }
}

// Set default properties
ScatterChart.defaultProps = {
  data: [{x: 1, y: 1, r: 4, label: "meep"}, {x:100, y:100, r: 14, label: "meep"}],
  // r: `d3.scale.linear().domain([50,200]).range([0,20])`,
  sizing: {
    width: 400,
    height: 270,
    margin: {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
  },
  colors: {
    axis: 'green',
    background: 'white',
    primary: 'turquoise',
    text: 'green'
  },
  title_prefix: "",
  xLabel: "",
  yLabel: ""
    // data:           PropTypes.array.isRequired, //consider: chart = { data: [{x:3, y:4, label: "thundercloud"},], xlabel: "", ylabel: "" }
    // xRange: d3.time.scale().range([margin,width-margin]).domain([new Date(2011, 08, 15), new Date(2015, 01, 01)]);,
    // yRange: d3.scale.linear().range([height-margin, margin]).domain([77, 100]);,
};

// Render application
// ReactDOM.render(
//     <App width={400} height = {400}/>,
//     document.getElementById('main')
// );

export class BarChart extends Component {
  constructor(props){
    super(props)
    // this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  componentWillUnmount() {
    d3.select(this.node)
    // .select('g').selectAll('rect')
    .remove()

  }

  createBarChart() {
    const node = this.node,
          {colors, data, sizing, title_prefix, xLabel, yLabel} = this.props;

    // collect data dimensions
    const xData = data.map(d => +d.x)
    const yData = data.map(d => +d.y)
    // set display bounds
    const chartWidth = sizing.width - sizing.margin.left - sizing.margin.right;
    const chartHeight = sizing.height - sizing.margin.top - sizing.margin.bottom;

    const svg = d3.select(node)
      .style('background-color', colors.background)
      .style('width', sizing.width)
      .style('height', sizing.height)
      .attr("width", sizing.width)
      .attr("height", sizing.height)

    const x = d3.scaleLinear()
                 .domain(d3.extent(data, d => d.x)).nice()
                 .range([sizing.margin.left, chartWidth]);

    const xAxis = g => g
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(g => g.append("text")
        .attr("x", sizing.width - sizing.margin.right)
        // .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(xLabel))

    const y = d3.scaleLinear()
                .domain(d3.extent(data, d =>  d.y)).nice()
                .range([chartHeight, sizing.margin.top]);

    const yAxis = g => g
      .attr("transform", `translate(${sizing.margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(yLabel));

    const rect = g => g
        .append("rect")
        .style('fill', colors.primary)
        .attr("x", d => x(d.x) + 1)
        .attr("width", d => d.width)
        .attr("y", d => y(d.y))
        .attr("height", d => y(d3.min(yData)) - y(d.y))
        // .append("text")
        // .text(d => d.label)
        .append('title')
        .text(d => title_prefix + d.label + " : "+ d.x)


    svg.append("g")
      .style('fill', colors.primary)
      .selectAll("rect")
      .data(data)
      .enter()
        .call(rect)

    // svg.append("g")
    //   .selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append('rect')
 
    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
   
    svg.select('g').selectAll('rect')
      .data(data)
      .exit()
      .remove();
  }

render() {
    return <svg ref={node => this.node = node}> </svg>
  }
}

BarChart.propTypes = {
    data:           PropTypes.array.isRequired, //consider: chart = { data: [{x:3, y:4, label: "thundercloud"},], xlabel: "", ylabel: "" }
    colors:         PropTypes.object,
    sizing:         PropTypes.object,
    title_prefix:   PropTypes.string,
    xLabel:         PropTypes.string,
    yLabel:         PropTypes.string
}

BarChart.defaultProps = {
  data: [{x: 1, y: 10, width: 4, label: "meep"}, {x: 2, y: 50, width: 4, label: "meep"}, {x:10, y:100, width: 14, label: "meep"}],
  // data: [1,1,1,1,1,1,2,3,3,4,5,6,6,6,6,8],
  sizing: {
    width: 415,
    height: 300,
    margin: {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
    barWidth: 10,
  },
  colors: {
    axis: 'green',
    background: 'white',
    primary: 'turquoise',
    text: 'green'
  },
  hover: "meep",
  title_prefix: "",
  xLabel: "xAxis",
  yLabel: "yAxis"
    // data:           PropTypes.array.isRequired, //consider: chart = { data: [{x:3, y:4, label: "thundercloud"},], xlabel: "", ylabel: "" }
    // xRange: d3.time.scale().range([margin,width-margin]).domain([new Date(2011, 08, 15), new Date(2015, 01, 01)]);,
    // yRange: d3.scale.linear().range([height-margin, margin]).domain([77, 100]);,
    // r: d3.scale.linear().domain([50,200]).range([0,20]);
};


// http://bl.ocks.org/nnattawat/8916402
// <Histogram data={this.props.data} />
export class HistogramChart extends Component {
  constructor(props){
      super(props)
      // this.createChart = this.createChart.bind(this)
      // this.setInputRef = (element) => {
      //   this.input = element;
      // }
   }

   componentDidMount() {
      this.createChart()
   }

  componentDidUpdate() {
      this.createChart()
   }

  createChart() {
    // assign display and data handles
    const node = this.node,
          {colors, data, sizing, title_prefix, xLabel, yLabel} = this.props;

    // set display bounds
    const chartWidth = sizing.width - sizing.margin.left - sizing.margin.right;
    const chartHeight = sizing.height - sizing.margin.top - sizing.margin.bottom;

    const x = d3.scaleLinear()
                 .domain(d3.extent(data)).nice()
                 .range([sizing.margin.left, chartWidth]);

    // chop up data for y axis
    // bins = [Array(6), Array(1), Array(2), Array(1), Array(1), Array(4), Array(0), Array(1)]
    //        0: (6) [1, 1, 1, 1, 1, 1, x0: 1, x1: 2]
    const histogram = d3.histogram().thresholds(x.ticks(9)),
          bins      = histogram(data);

    const y = d3.scaleLinear()
                .domain(d3.extent(bins, d => d.length)).nice()
                .range([chartHeight, sizing.margin.top]);
                
    // const colorScale = d3.scale.threshold()
    //     .domain([0.85, 1])
    //     .range(["#2980B9", "#E67E22", "#27AE60", "#27AE60"]);
      
    const svg = d3.select(node)
      .style('background-color', colors.background)
      .style('width', sizing.width)
      .style('height', sizing.height)
      .attr("width", sizing.width)
      .attr("height", sizing.height)

    const xAxis = g => g
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(g => g.append("text")
        .attr("x", sizing.width - sizing.margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(xLabel))

    const yAxis = g => g
      .attr("transform", `translate(${sizing.margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(yLabel));
  
    svg.append("g")
      .style('fill', colors.primary)
      .selectAll("rect")
      .data(bins)
      .enter().append("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
        .attr("y", d => y(d.length))
        // for when you dont have a 0 value you need the smallest value
        // in the dimension, i.e.
        // .attr("height", d => y(d3.min(yData)) - y(d.y))
        .attr("height", d => y(0) - y(d.length))
        .append('title')
        .text(d => title_prefix +d.length +":"+ d.x0 + " - " + d.x1)
        // .attr('fill', function(d) { return colorScale(d.value); });

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
   
    svg.selectAll('g').selectAll('rect')
      .data(bins)
      .exit()
      .remove();
  }

  render() {
    // Had been using the code below to get a reference 
    return <svg ref={node => this.node = node}></svg>
    //but styled components suggested this instead
    // return <StyledSVG ref={this.setInputRef}></StyledSVG>
  }
}

HistogramChart.propTypes = {
    data:           PropTypes.array.isRequired,
    colors:         PropTypes.object,
    sizing:         PropTypes.object,
    title_prefix:   PropTypes.string,
    xLabel:         PropTypes.string,
    yLabel:         PropTypes.string
    // data:           PropTypes.array.isRequired, //consider: chart = { data: [{x:3, y:4, label: "thundercloud"},], xlabel: "", ylabel: "" }
    // xRange: d3.time.scale().range([margin,width-margin]).domain([new Date(2011, 08, 15), new Date(2015, 01, 01)]);,
    // yRange: d3.scale.linear().range([height-margin, margin]).domain([77, 100]);,
    // r: d3.scale.linear().domain([50,200]).range([0,20]);
}

HistogramChart.defaultProps = {
  className: "chart",
  data: [1,1,1,1,1,1,2,3,3,4,5,6,6,6,6,8],
  sizing: {
    width: 441,
    height: 300,
    margin: {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
    barWidth: 10,
  },
  colors: {
    axis: 'green',
    background: 'white',
    primary: 'turquoise',
    text: 'green'
  },
  title_prefix: "",
  xLabel: "",
  yLabel: ""
    // data:           PropTypes.array.isRequired, //consider: chart = { data: [{x:3, y:4, label: "thundercloud"},], xlabel: "", ylabel: "" }
    // xRange: d3.time.scale().range([margin,width-margin]).domain([new Date(2011, 08, 15), new Date(2015, 01, 01)]);,
    // yRange: d3.scale.linear().range([height-margin, margin]).domain([77, 100]);,
    // r: d3.scale.linear().domain([50,200]).range([0,20]);
};
