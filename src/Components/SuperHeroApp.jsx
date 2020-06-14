//a wrapper class that will be responsible for the interaction between all the components
//will pass data between the components
import React from "react";

//custom components import
import TopBar from "./TopBar/TopBar";
import Team from "./Team/Team";
import Result from "./Result/Result";
import CreditBox from "./CreditBox/CreditBox";
import "./SuperHeroApp.css";

export default class SuperHeroApp extends React.Component {
  constructor() {
    super();
    this.state = {
      team: [],
      currentQuery: "", //default to empty string on start
    };

    //bind the this key word to this instance of the SuperHero so that when it is called outside of the function
    //it updates the correct state
    this.onChangeQueryHandler = this.onChangeQueryHandler.bind(this);
    this.onAddToTeamHandler = this.onAddToTeamHandler.bind(this);
  }

  //check if the props has changed (the current query and/or the team), and if so
  //set the state appropriately and then re-render this component and children
  componentDidUpdate(prevProps) {
    if (this.props.currentQuery !== prevProps.currentQuery) {
      this.setState({ currentQuery: this.props.currentQuery });
    } else if (this.props.team !== prevProps.team) {
      this.setState({ team: this.props.team });
    }
  }

  //pass this query change handler to the search bar
  //set the state to the new query if and only if the enter key was pressed
  onChangeQueryHandler = (event) => {
    if (event.key === "Enter") {
      this.setState({ currentQuery: event.target.value.toLowerCase() });
    }
  };

  //pass this team handler to the results
  //this function pushes the new member to the current team array, and then updates the state
  //once the state has been updated, the component should rerender
  onAddToTeamHandler = (hero) => {
    const newTeam = this.state.team;
    newTeam.push(hero);
    this.setState({ team: newTeam });
  };

  render() {
    const team = this.state.team;
    return (
      <>
        {/* Make the top bar element */}
        <TopBar handler={this.onChangeQueryHandler}></TopBar>
        {/* return the super hero details page */}
        <div className="appContainer">
          <div className="resultsContainer">
            <Result
              query={this.state.currentQuery}
              addToTeamHandler={this.onAddToTeamHandler}
            ></Result>
          </div>
          <div className="teamContainer">
            <Team teamMembers={team}></Team>
          </div>
          {/* Credit box */}
        </div>
        <div className="bottomContainer">
          <CreditBox></CreditBox>
        </div>
      </>
    );
  }
}
