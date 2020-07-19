//a wrapper class that will be responsible for the interaction between all the components
//will pass data between the components and is the parent class for all components
//will be rendered by the App component in App.js
import React from "react";

//custom components import
import TopBar from "./TopBar/TopBar";
import Team from "./Team/Team";
import Result from "./Result/Result";
import CreditBox from "./CreditBox/CreditBox";

import "./SuperHeroApp.css";

const NAME = "James Ting";
const PURPOSE = "as a personal project to work with React and REST APIs.";
const CREATOR_LINK = "https://www.linkedin.com/in/james-b-ting/";
const SOURCE_CODE_LINK = "https://github.com/jamesbting/fundmore-challenge";

export default class SuperHeroApp extends React.Component {
  constructor() {
    super();
    this.state = {
      currIDs: new Set(),
      team: [],
      currentQuery: "", //default to empty string on start
      showingTeam: true,
    };
    this.wrapper = React.createRef();

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
      this.setState((prevState, props) => ({
        currentQuery: props.currentQuery,
      }));
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
        showingTeam: false, //change showingTeam to false so the user can see the search results
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
      this.setState({ team: newTeam, currIDs: IDSet, showingTeam: true }); //change the state to showingTeam so that the user can see the team with the new hero added
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

  //pass this handler to the topbar component, which will pass it to the change view button so that the button in the topbar can modify
  //the current view of the app
  changeViewHandler = () => {
    this.setState((prevState) => ({ showingTeam: !prevState.showingTeam }));
  };

  render() {
    const team = this.state.team;
    const showingTeam = this.state.showingTeam;

    //showing the team view
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
            <CreditBox
              name={NAME}
              purpose={PURPOSE}
              creatorLink={CREATOR_LINK}
              sourceCodeLink={SOURCE_CODE_LINK}
            ></CreditBox>
          </div>
        </>
      );

      //showing search results view
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
            <div className="resultsContainer" ref={this.wrapper}>
              <Result
                query={this.state.currentQuery}
                addToTeamHandler={this.onAddToTeamHandler}
              ></Result>
            </div>
            {/* Credit box */}
            <CreditBox
              name={NAME}
              purpose={PURPOSE}
              creatorLink={CREATOR_LINK}
              sourceCodeLink={SOURCE_CODE_LINK}
            ></CreditBox>
          </div>
        </>
      );
    }
  }
}
