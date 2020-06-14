import React from "react";
import TeamMember from "./TeamMember/TeamMember";
export default class Team extends React.Component {
  constructor() {
    super();
    this.state = {
      //teamMembers: props.teamMembers,
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
    const stats = this.renderStats();
    // if  there are no members in the team, then do nothing
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
    return (
      <div>
        <h1>Your Team:</h1>
        {stats}
        {teamMembers.map((member) => (
          <TeamMember member={member}></TeamMember>
        ))}
      </div>
    );
  }

  //converts the average stats to a string with the name of each stat
  //might be useful to do memoization
  averageStatsToString() {
    let string = "";
    for (let i = 0; i < this.stats.length; i++) {
      string += `${this.stats[i]}: ${this.state.averageStats[i].toFixed(1)} `; //1 decimal point
    }
    return string;
  }

  renderStats() {
    return (
      <div className="averageStatContainer">
        {" "}
        Average Stats: {`${this.averageStatsToString()}`}
      </div>
    );
  }

  //function to calculate the averages
  //called by component will recieve props in order to achieve separation of concerns
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

  static areEqualShallow(a, b) {
    for (var key in a) {
      if (!(key in b) || a[key] !== b[key]) {
        return false;
      }
    }
    for (var key in b) {
      if (!(key in a) || a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
}
