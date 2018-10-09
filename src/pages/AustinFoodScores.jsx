import * as d3 from 'd3'; 
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { HistogramChart, BarChart, ScatterChart } from '../components/Charts';
import { Container, Text } from 'rebass';
import { countBy, forIn, min, size, sum, uniq } from 'lodash';
// import static_data from '../../data/Food_Establishment_Inspection_Scores.csv'

import Layout from '../components/Layout';

/* Article Design Concept
 * 
 * - URL
 * - Data ETL
 *   - Range
 *   - Scale
 *   - Labels
 * - Controls
 * - Styling
 *
 *
 *
 * HELPFUL URL
 * - https://www.robinwieruch.de/react-fetching-data/
 * - https://www.robinwieruch.de/react-with-graphql-tutorial/
 * */

class FoodInspection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loaded_data: false
    };
  }

  componentWillMount() {
    this.getData()
  }

  componentWillUnmount() {
    this.setState({
      data:  null,
      loaded_data: false
    });
  }

  async getData() {
    await fetch(this.props.dataUri) 
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
    .then(data => this.setState({data, loaded_data: true }));
    }
  // will need to look into methods for alternative code loading
  // could be a thing that graphql handles well
  // isJson(data) {
  //   if (data.json()) return data.json();
  // }

  distribution(){
    let collection = [];
    const scores = this.state.data.map( record => this.extractScore(record) );
    const mean = sum(scores) / scores.length;
    scores.map( i => collection.push( Math.pow((i - mean), 2) ));
    const variance = sum(collection) / (collection.length - 1);
    const standard_deviation = Math.sqrt(variance);

    return ({ standard_deviation, variance });
  }

  mostInspectedEstablishments(data) { 
    let names = data.map(  record => this.extractName(record) );
    const names_count = countBy(names);
    let most_inspected = []; 
    forIn(names_count, (count , name ) => (most_inspected.push( {"x": Math.floor(Math.random() * this.props.sizing.width), "y": Math.random() * this.props.sizing.height, "r": count * 0.5 , "label": name })));
    return ( {names, inspections_per_location: most_inspected} )
  }

   makeCircles(data) {
     let chart_data= []; 
     forIn(data, d => (chart_data.push( {"x": humanTime(+d.inspection_date), "y": +d.score , "r": count / this.props.width, "label": d.restaurant_name +" "+ d.score +" "+ humanTime(+d.inspection_date)} )))
     return chart_data;
   }

  aggregateScoresByZip(data) {
    let scores = data.map( record => this.extractScore(record) );
    let zips = data.map(   record => this.extractZipCodeData(record) );

    //[{score: 95, zip: "78717"}]
    let scores_by_zip = scores.map( (value,index) => ({"x": value, "label": zips[index]})) //this depends on the order of data :(

    // {78613: 11, 78617: 3, 78620: 1, 78652: 6, 78653: 6, ...}
    const count_per_zip = countBy(zips);
    let inspections_per_zip = []; 
    let i = 0
    forIn(count_per_zip, (inspection_count,zip) => (inspections_per_zip.push( {"x": (i +=1), "y": inspection_count, "label": zip, width: 2})));
    return({
      count_per_zip,
      scores, 
      scores_by_zip,
      inspections_per_zip,
      zips,

    });
  }

  humanTime(input) {
    return new Date(parseFloat(input) * 1000);
  }

  extractZipCodeData(record) {
    return JSON.parse(record.address.human_address).zip
  }

  extractName(record) {
    return record.restaurant_name; 
  }

  extractScore(record) {
    //prefix + to cast string to int
    return +record.score;
  }

  render() {
    let chart;
    if (this.state.loaded_data) {
      const { data } = this.state;
      let {inspections_per_zip, scores, zips} = this.aggregateScoresByZip(data);
      let {names, inspections_per_location} = this.mostInspectedEstablishments(data);
      const lowest_score = min(scores);
      const unique_zips = uniq(zips);
      names = uniq(names);

      //I want to eventually pass scale and color to the chart
      // const x = d3.scaleLinear()
      //              .domain(d3.extent(scores)).nice()
      //              .range([50, 500]);

      chart = 
        <div>
          <Text>you are viewing {scores.length} records</Text>
          <Text>there are {unique_zips.length} zip codes in this set</Text>
          <Text>There are {names.length} unique establishments in this set</Text>
          <Text>the lowest score is {lowest_score}</Text>
          <ScatterChart data={inspections_per_location} colors={this.props.colors} sizing={this.props.sizing} />
          <HistogramChart data={scores} colors={this.props.colors} sizing={this.props.sizing} xLabel="scores" yLabel="# of inspections" />
          <BarChart data={inspections_per_zip} colors={this.props.colors} sizing={this.props.sizing} xLabel="zip code" yLabel="# of inspections"/>
          {/*            */}
        </div>
    } else {
      chart = "loading..."
    }
    return (
      <Layout>
        <Container>
          <section>
            { chart }
          </section>
        </Container>
      </Layout>
    )
  }
}

FoodInspection.defaultProps = {
  dataUri: 'http://data.austintexas.gov/resource/ecmv-9xxi.json',
  colors: {
    primary: "#099",
    secondary: "#BBB",
    axis: 'green',
    background: 'white',
    text: 'green'
  },
  sizing: {
    width: 400,
    height: 270,
    margin: {
      top: 20,
      right: 20,
      bottom: 10,
      left: 70
    }
  }
};

export default FoodInspection;
