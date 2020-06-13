import React from "react";
import TeamMember from "./TeamMember/TeamMember";
export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      averageStats: [0, 0, 0, 0, 0, 0, 0], // current average stats are in the following order: Intelligence, Strength, Speed, Durability, Power, Combat
      apiKey: props.apiKey,
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

  render() {
    const stats = this.renderStats();
    const apiKey = this.state.apiKey;
    return (
      <div>
        <TeamMember apiKey={apiKey} hero={this.state.hero}></TeamMember>
        {stats}
      </div>
    );
    //}
  }

  //converts the average stats to a string with the name of each stat
  averageStatsToString() {
    let string = "";
    for (let i = 0; i < this.stats.length; i++) {
      string += `${this.stats[i]}: ${this.state.averageStats[i].toString()} `;
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
}
