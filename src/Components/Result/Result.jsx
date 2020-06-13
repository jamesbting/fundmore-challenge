//this class makes the api call to the super hero api, and returns a div with all the results
import React from "react";

import ResultItem from "./ResultItem/ResultItem";

const API_KEY = 3001192003309876; // my api key - replace it with your own API Key

export default class Result extends React.Component {
  //this constructor accepts 2 values as input
  //baseURL: the base url to call the api with (API key should be included here)
  //proxyURL: the proxy url to call forward the request to in order to eliminate CORS errors
  //both should be passed from the SuperHeroAppComponent
  constructor(props) {
    super(props);
    this.state = {
      baseURL: `https://superheroapi.com/api/${API_KEY}`,
      proxyURL: "https://cors-anywhere.herokuapp.com/",
      query: props.query,
      results: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.state.query) {
      this.callAPI(nextProps.query);
      this.setState({ query: nextProps.query });
    }
  }

  //pull from the api
  componentDidMount() {
    const query = this.state.query;
    this.callAPI(query);
  }

  callAPI(query) {
    const cleanedQuery = query.replace(" ", "%20"); //clean the query to remove spaces and encode them properly as URLs

    const URL = `${this.state.baseURL}/search/${cleanedQuery}`;
    fetch(this.state.proxyURL + URL)
      .then((result) => result.json())
      .then((data) => {
        //only update upon receiving a success
        if (data.response === "success") {
          this.setState({ results: data.results, sucessfulQuery: true });
        } else {
          alert(
            `No such superhero with the name ${query} could be found. Try searching for another one.`
          );
        }
      })
      .catch(console.log);
  }

  //show the results by passing the results as a prop to ResultItem
  render() {
    const results = this.state.results;
    return <ResultItem results={results}></ResultItem>;
  }
}
