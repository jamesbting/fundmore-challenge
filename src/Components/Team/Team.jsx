//a react class that represents the team built by the user
//returns a component that will calculate the team averages on the fly, as well as display each team member in their own card
import React from "react";
import TeamMember from "./TeamMember/TeamMember";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

import "./Team.css";
export default class Team extends React.Component {
  constructor() {
    super();
    this.state = {
      averageStats: [0, 0, 0, 0, 0, 0, 0], // current average stats are in the following order: Intelligence, Strength, Speed, Durability, Power, Combat
    };
    this.stats = [
      "Intelligence",
      "Strength",
      "Speed",
      "Durability",
      "Power",
      "Combat",
    ];
  }

  static getDerivedStateFromProps(props, state) {
    if (props.teamMembers !== state.teamMembers) {
      const teamMembers = props.teamMembers;
      const newAverages = Team.calculateNewAverages(teamMembers);
      return { averageStats: newAverages };
    }
    return null;
  }

  render() {
    // if there are no members in the team, then do nothing
    if (this.props.teamMembers.length === 0) {
      return (
        <div>
          <h1>Your Team:</h1>
          <p>
            You haven't added anyone to your team yet. Search for a superhero to
            add them to your team.
          </p>
        </div>
      );
    }
    const teamMembers = this.props.teamMembers;
    const stats = this.renderStats();

    return (
      <div>
        <h1>Your Team:</h1>
        <Paper>
          {" "}
          <div className="teamBox">
            <div className="teamMembers">
              {teamMembers.map((member) => (
                <TeamMember
                  member={member}
                  removeFromTeamHandler={this.props.removeFromTeamHandler}
                ></TeamMember>
              ))}
            </div>
            <div className="teamStats">{stats}</div>
          </div>
        </Paper>
      </div>
    );
  }

  //function that returns a div that contains the average stats of the current team
  renderStats() {
    return (
      <div className="averageStatContainer">
        <h2>Average Stats:</h2>
        <p>This shows the average stats amongst all the team members.</p>
        {this.stats.map((stat) => (
          <div
            className="averageStat"
            id={`${stat}`}
          >{`${stat}: ${this.state.averageStats[
            this.stats.indexOf(stat)
          ].toFixed(1)}`}</div>
        ))}
      </div>
    );
  }

  //function to calculate the averages
  //called by component will receive props in order to achieve separation of concerns
  static calculateNewAverages(teamMembers) {
    const n = teamMembers.length;
    const newAverages = [0, 0, 0, 0, 0, 0, 0];
    if (n === 0) {
      return newAverages;
    }
    //sum each stat for each team member
    for (const member of teamMembers) {
      newAverages[0] += parseInt(member.powerstats.intelligence);
      newAverages[1] += parseInt(member.powerstats.strength);
      newAverages[2] += parseInt(member.powerstats.speed);
      newAverages[3] += parseInt(member.powerstats.durability);
      newAverages[4] += parseInt(member.powerstats.power);
      newAverages[5] += parseInt(member.powerstats.combat);
    }
    //divide by the number of team members to get the average
    for (let i = 0; i < newAverages.length; i++) {
      newAverages[i] = newAverages[i] / n;
    }
    return newAverages;
  }
}

Team.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromTeamHandler: PropTypes.func.isRequired,
};
