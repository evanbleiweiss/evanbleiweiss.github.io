import * as d3 from 'd3'; 
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../components/Layout';

// Application file
// with help from 
// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
// and 
// https://github.com/jkeohan/react-d3/blob/master/07-d3-demo/js/App.js
class App extends React.Component {
    // Set initial state in the `constructor()` function
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            numPoints:10
        };
    }

    // When the component mounts, run the `updatePoints()` method
    componentDidMount() {
        this.updatePoints()
    }

    // When the component updates, run the `updatePoints()` method
    componentDidUpdate() {
       this.updatePoints()
    }

    // Method to update the cirlces using D3
    updatePoints() {
        // Randomly generate points based on the `width` and `height` props
        let data = d3.range(this.state.numPoints).map((d) => {
            return {x: Math.random() * this.props.width, y: Math.random() * this.props.height}
        });

        // Select all the circles within thje <g> element
        let circles = d3.select(this.chartArea).selectAll('circle').data(data);

        // Use the .enter() method to get your entering elements, and assign their positions
        circles.enter().append('circle')
            .attr('r', (d) => 3)
            .attr('fill', (d) => "blue")
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y);
    }
    
    // Render method
    render() {
        
        // Return HTML elements to hold the chart
        return (                  
          <Layout>
            <div id="main">
            <div className="container">
                <div>
                    <button className="btn btn-primary" onClick={(d) => this.setState({numPoints:this.state.numPoints +10})}>+ 10 points</button>
                </div>
                <div className="chart-wrapper">
                    <svg className="chart" width="400" height="400">
                      {/*<svg className="chart" width={this.props.width} height={this.props.height}>*/}
                        <g ref={(node) => { this.chartArea = node; }}
                            transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`} />
                    </svg>
                </div>
            </div>            
            </div>            
          </Layout>
        )
    }
}

// Set default properties
App.defaultProps = {
    margin: {
        left: 0,
        right: 10,
        top: 20,
        bottom: 50
      },
      width: 400,
      height: 400
};

// Render application
// ReactDOM.render(
//     <App width={400} height = {400}/>,
//     document.getElementById('main')
// );

export default App;
