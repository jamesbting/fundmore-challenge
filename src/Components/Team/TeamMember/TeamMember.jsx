// team member class that represents a member of the team, and generates a react card with all the relevant information

import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import "./TeamMember.css";

export default class TeamMember extends React.Component {
  constructor() {
    super();
    this.state = { member: null };
  }

  //check for new props, and update accordingly
  static getDerivedStateFromProps(props, state) {
    if (props.member !== state.member) {
      return { member: props.member };
    }
    return null;
  }

  //handle when the user clicks the "Remove from team button"
  handleRemoveFromTeam = () => {
    this.props.removeFromTeamHandler(this.state.member);
  };

  render() {
    const { id, name, image, powerstats } = this.props.member; //de-structure to reduce the code base and improve readability

    //for building the list using the map function
    //these two arrays are here so that, in case a new stat is added, we can just add it to the stat array and the name, and then the map function below
    //will add it automatically - promotes maintainability and extensibility of the code
    const stats = [
      powerstats.intelligence,
      powerstats.strength,
      powerstats.speed,
      powerstats.durability,
      powerstats.power,
      powerstats.combat,
    ];
    const statNames = [
      "Intelligence",
      "Strength",
      "Speed",
      "Durability",
      "Power",
      "Combat",
    ];

    return (
      <Card className={"searchResultCardRoot"} key={id}>
        <CardMedia
          className={"media"}
          image={`${image.url}`}
          title={`Image of ${name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* build a list of the stats for this team member */}
            {statNames.map((statName) => (
              <p>{`${statName}: ${stats[statNames.indexOf(statName)]}`}</p>
            ))}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={this.handleRemoveFromTeam}
            variant="contained"
            color="primary"
          >
            Remove from team{" "}
          </Button>
        </CardActions>
      </Card>
    );
  }
}
