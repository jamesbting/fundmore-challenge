//a wrapper class that will be responsible for the interaction between all the components

import React from "react";

//custom components import
import TopBar from "./TopBar/TopBar";
//import APICaller from "../HelperFiles/APICaller";
import Team from "./Team/Team";
//import Superhero from "../HelperFiles/Superhero";
import Result from "./Result/Result";
import "./SuperHeroApp.css";

export default class SuperHeroApp extends React.Component {
  constructor() {
    super();
    this.state = {
      team: [],
      currentQuery: "batman", //default to batman on start because i dont know how to deal with an empty query, in java I would use the Optional wrapper class, but I am not aware of any similar class in Javascript
    };
    this.onChangeQueryHandler = this.onChangeQueryHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentQuery !== prevProps.currentQuery) {
      this.setState({ currentQuery: this.props.currentQuery });
    }
  }

  //pass this query change handler to the search bar
  onChangeQueryHandler = (event) => {
    if (event.key === "Enter") {
      this.setState({ currentQuery: event.target.value.toLowerCase() });
    }
  };

  render() {
    return (
      <>
        {/* Make the top bar element */}
        <TopBar handler={this.onChangeQueryHandler}></TopBar>
        {/* return the super hero details page */}
        <div className="rowContainer">
          {" "}
          <div className="resultsContainer">
            <Result query={this.state.currentQuery}></Result>
          </div>
          <div className="teamContainer">
            <Team hero={this.state.hero}></Team>
          </div>
        </div>
      </>
    );
  }
}
