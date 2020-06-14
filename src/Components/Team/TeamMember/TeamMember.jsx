import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

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

  render() {
    const member = this.props.member;
    return (
      <Card className={"searchResultCardRoot"} key={member.id}>
        <CardMedia
          className={"media"}
          image={`${member.image.url}`}
          title={`Image of ${member.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {member.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Stats:
            <br></br>
            Intelligence: {member.powerstats.intelligence}
            <br></br>
            Strength: {member.powerstats.strength}
            <br></br>
            Speed: {member.powerstats.speed}
            <br></br>
            Durability: {member.powerstats.durability}
            <br></br>
            Power: {member.powerstats.power}
            <br></br>
            Combat: {member.powerstats.combat}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    );
  }
}
