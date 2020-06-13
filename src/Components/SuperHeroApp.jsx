//a wrapper class that will be responsible for the interaction between all the components

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//custom components import
import TopBar from "./TopBar/TopBar";
import APICaller from "../HelperFiles/APICaller";
import Team from "./Team/Team";
import Superhero from "../HelperFiles/Superhero";
import Result from "./Result/Result";
import "./SuperHeroApp.css";

const API_KEY = 3001192003309876; // my api key - replace it with your own API Key

export default class SuperHeroApp extends React.Component {
  constructor() {
    super();
    this.state = {
      baseURL: `https://superheroapi.com/api/${API_KEY}`,
      proxyURL: "https://cors-anywhere.herokuapp.com/", // a proxy url to forward the request and avoid a CORS error
      team: [],
      currentQuery: "batman", //default to batman on start because i dont know how to deal with an empty query, in java I would use the Optional wrapper class, but I am not aware of any similar class in Javascript
    };
    this.onChangeQueryHandler = this.onChangeQueryHandler.bind(this);
  }

  componentDidUpdate(newProps) {
    if (newProps.currentQuery !== this.state.currentQuery) {
      this.setState({ currentQuery: newProps.currentQuery });
    }
  }

  //pass query change handler to the search bar
  onChangeQueryHandler = (event) => {
    if (event.key === "Enter") {
      this.setState({ currentQuery: event.target.value.toLowerCase() });
    }
  };

  render() {
    return (
      <>
        s{/* Make the top bar element */}
        <TopBar handler={this.onChangeQueryHandler}></TopBar>
        {/* return the super hero details page */}
        <div className="rowContainer">
          {" "}
          <div className="resultsContainer">
            <Result
              baseURL={this.state.baseURL}
              proxyURL={this.state.proxyURL}
              query={this.state.currentQuery}
            ></Result>
          </div>
          <div className="teamContainer">
            <Team hero={this.state.hero}></Team>
          </div>
        </div>
      </>
    );
  }
}
