//a wrapper class that will be responsible for the interaction between all the components
//will pass data between the components
import React from "react";

//custom components import
import TopBar from "./TopBar/TopBar";
import Team from "./Team/Team";
import Result from "./Result/Result";
import CreditBox from "./CreditBox/CreditBox";

import "./SuperHeroApp.css";

//TO DO: ADD A BUTTON TO CHANGE TO THE SEARCH RESULTS AND THE TEAM VIEW

export default class SuperHeroApp extends React.Component {
  constructor() {
    super();
    this.state = {
      currIDs: new Set(),
      team: [],
      currentQuery: "", //default to empty string on start
      showingTeam: true,
    };

    //bind the this key word to this instance of the SuperHero so that when it is called outside of the function
    //it updates the correct state
    this.onChangeQueryHandler = this.onChangeQueryHandler.bind(this);
    this.onAddToTeamHandler = this.onAddToTeamHandler.bind(this);
    this.removeFromTeamHandler = this.removeFromTeamHandler.bind(this);
    this.changeViewHandler = this.changeViewHandler.bind(this);
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
      this.setState({
        currentQuery: event.target.value.toLowerCase(),
        showingTeam: false,
      });
    }
  };

  //pass this team handler to the results
  //this function pushes the new member to the current team array if the current team member's id is not in the set (since IDs are unique)
  //and then updates the state
  //once the state has been updated, the component should re-render
  onAddToTeamHandler = (hero) => {
    const newTeam = this.state.team;
    const IDSet = this.state.currIDs;
    if (IDSet.has(hero.id)) {
      alert(
        `Looks like ${hero.name} is already in the team! Try adding another superhero`
      );
      return false;
    } else {
      newTeam.push(hero);
      IDSet.add(hero.id);
      this.setState({ team: newTeam, currIDs: IDSet, showingTeam: true });
      return true;
    }
  };

  //pass this handler to team member as a prop
  //this function will filter the current team upon the team member getting the remove from team button is clicked
  removeFromTeamHandler = (hero) => {
    this.setState((prevState) => ({
      team: prevState.team.filter((element) => element.id !== hero.id),
    }));
  };

  changeViewHandler = () => {
    this.setState((prevState) => ({ showingTeam: !prevState.showingTeam }));
  };

  render() {
    const team = this.state.team;
    const showingTeam = this.state.showingTeam;
    if (showingTeam) {
      return (
        <>
          {/* Make the top bar element */}
          <TopBar
            changeQueryHandler={this.onChangeQueryHandler}
            changeViewHandler={this.changeViewHandler}
            message={"See search results"}
          ></TopBar>
          {/* return the super hero details page */}
          <div className="appContainer">
            <div className="teamContainer">
              <Team
                teamMembers={team}
                removeFromTeamHandler={this.removeFromTeamHandler}
              ></Team>
            </div>
            {/* Credit box */}
            <CreditBox></CreditBox>
          </div>
        </>
      );
    } else {
      return (
        <>
          {/* Make the top bar element */}
          <TopBar
            changeQueryHandler={this.onChangeQueryHandler}
            changeViewHandler={this.changeViewHandler}
            message={"See your team"}
          ></TopBar>
          {/* return the super hero details page */}
          <div className="appContainer">
            <div className="resultsContainer">
              <Result
                query={this.state.currentQuery}
                addToTeamHandler={this.onAddToTeamHandler}
              ></Result>
            </div>
            {/* Credit box */}
            <CreditBox></CreditBox>
          </div>
        </>
      );
    }
  }
}
