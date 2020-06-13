//this class makes the api call to the super hero api, and returns a div with all the results
import React from "react";

import ResultItem from "./ResultItem/ResultItem";

export default class Result extends React.Component {
  //this constructor accepts 2 values as input
  //baseURL: the base url to call the api with (API key should be included here)
  //proxyURL: the proxy url to call forward the request to in order to eliminate CORS errors
  //both should be passed from the SuperHeroAppComponent
  constructor(props) {
    super(props);
    this.state = {
      baseURL: props.baseURL,
      proxyURL: props.proxyURL,
      query: props.query,
      results: [],
    };
  }

  componentDidUpdate(newProps) {
    if (newProps.query !== this.props.query) {
      this.callAPI(newProps.query);
      this.setState({ query: newProps.query });
    }
  }
  //pull from the api
  componentDidMount() {
    this.callAPI(this.state.query);
  }

  callAPI(query) {
    const URL = `${this.state.baseURL}/search/${query}`;
    fetch(this.state.proxyURL + URL)
      .then((result) => result.json())
      .then((data) => this.setState({ results: data.results }))
      .catch(console.log);
  }

  //show the results
  render() {
    const results = this.state.results;
    return <ResultItem results={results}></ResultItem>;
  }
}
