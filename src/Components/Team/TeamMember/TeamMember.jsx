import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import Superhero from "../../../HelperFiles/Superhero";

import "./TeamMember.css";
export default class TeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card className={"root"}>
        <CardActionArea>
          <CardMedia
            className={"media"}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Batman
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              This is a card for Batman
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
