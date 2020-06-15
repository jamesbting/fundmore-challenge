//this class makes the api call to the super hero api, and returns a div with all the results
import React from "react";
import Paper from "@material-ui/core/Paper";

import ResultItem from "./ResultItem/ResultItem";

const API_KEY = 3001192003309876; // my own api key - replace it with your own API Key if you fork this repository (https://superheroapi.com/index.html)

export default class Result extends React.Component {
  //baseURL: the base url to call the api with (API key should be included here)
  //proxyURL: the proxy url to call forward the request to in order to eliminate CORS errors
  //both should be passed from the SuperHeroAppComponent
  constructor(props) {
    super(props);
    this.state = {
      baseURL: `https://superheroapi.com/api/${API_KEY}`,
      proxyURL: "https://cors-anywhere.herokuapp.com/",
      results: [],
    };
    this.handleRemoveResult = this.handleRemoveResult.bind(this);
  }

  //check if the query has changed - if so call the api, and then re render this component with the new results
  componentDidUpdate(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.callAPI(this.props.query);
    }
  }

  componentDidMount() {
    this.callAPI(this.props.query);
  }

  //function that takes as input a string that represents a query
  callAPI(query) {
    this.setState({ results: [] }); //empty the previous results

    //if the query is the empty string, do not call the api, and instead do nothing
    if (query === "") {
      return;
    }

    //non empty string

    //clean the query to remove spaces and encode them properly as URLs, no need to sanitize the input because the React DOM already does that for us
    //https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks
    const cleanedQuery = query.replace(" ", "%20");
    const URL = `${this.state.baseURL}/search/${cleanedQuery}`;
    fetch(this.state.proxyURL + URL)
      .then((result) => result.json())
      .then((data) => {
        //only update upon receiving a success
        if (data.response === "success") {
          this.setState({ results: data.results });
        } else {
          //tell the user no such superhero exists
          alert(
            `No such superhero with the name "${query}" could be found. Try searching for another one.`
          );
        }
      })
      .catch(console.log);
  }

  //remove the result from the result list after it has been added to the team
  handleRemoveResult = (hero) => {
    this.setState((prevState) => ({
      results: prevState.results.filter((element) => element.id !== hero.id),
    }));
  };

  //show the results by passing each result as a prop to ResultItem to generate a new card component with all the information
  render() {
    const results = this.state.results;
    const addHandler = this.props.addToTeamHandler;
    //if no results are found, default to a message telling the user to search for a superhero

    if (this.state.results.length === 0) {
      return (
        <div>
          <h1>Search Results:</h1>
          <p>Try searching for a superhero.</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Search Results:</h1>
        <Paper>
          {results.map((result) => (
            <ResultItem
              hero={result}
              addHandler={addHandler}
              key={result.id}
              removeHandler={this.handleRemoveResult}
            ></ResultItem>
          ))}
        </Paper>
      </div>
    );
  }
}
