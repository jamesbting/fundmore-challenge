import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import "./ResultItem.css";

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: this.props.results };
  }

  //new search
  componentDidUpdate(newProps) {
    if (newProps.results !== this.state.results) {
      this.setState({ results: newProps.results });
    }
  }

  render() {
    const results = this.props.results;
    // KNOWN BUG: Calling search twice causes the application to crash
    return (
      <div>
        <h1>Results:</h1>

        {results.map((result) => (
          <Card className={"searchResultCardRoot"} key={result.id}>
            {/* <CardActionArea> */}
            <CardMedia
              className={"media"}
              image={`${result.image.url}`}
              title={`Image of ${result.name}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {result.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Alignment: {result.biography.alignment}{" "}
                {/* Right now it says "good" instead of "Good" (same for neutral and evil) - needs to be fixed*/}
                <br></br>
                Publisher: {result.biography.publisher}
                <br></br>
                <br></br>
                {/* My gut tells me thee is a better wat to do this, but I can't think of it
                    TODO: think of a better way that is more extensible */}
                Stats:
                <br></br>
                Intelligence: {result.powerstats.intelligence}
                <br></br>
                Strength: {result.powerstats.strength}
                <br></br>
                Speed: {result.powerstats.speed}
                <br></br>
                Durability: {result.powerstats.durability}
                <br></br>
                Power: {result.powerstats.power}
                <br></br>
                Combat: {result.powerstats.combat}
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
          </Card>
        ))}
      </div>
    );
  }
}
