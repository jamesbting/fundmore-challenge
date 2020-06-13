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
  constructor(props) {
    super(props);
    this.state = { member: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hero !== this.state.hero) {
      this.setState({ hero: nextProps.hero });
    }
  }

  render() {
    return (
      <Card className={"searchResultCardRoot"} key={this.state.member.id}>
        <CardMedia
          className={"media"}
          image={`${this.state.member.image.url}`}
          title={`Image of ${this.state.member.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.state.member.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Stats:
            <br></br>
            Intelligence: {this.state.member.powerstats.intelligence}
            <br></br>
            Strength: {this.state.member.powerstats.strength}
            <br></br>
            Speed: {this.state.member.powerstats.speed}
            <br></br>
            Durability: {this.state.member.powerstats.durability}
            <br></br>
            Power: {this.state.member.powerstats.power}
            <br></br>
            Combat: {this.state.member.powerstats.combat}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    );
  }
}
