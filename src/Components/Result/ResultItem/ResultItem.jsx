import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

import "./ResultItem.css";

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: this.props.results, expanded: false };
  }

  //new search
  componentWillReceiveProps(newProps) {
    if (newProps.results.toString() !== this.props.results.toString()) {
      this.setState({ results: newProps.results });
    }
  }

  //handle when expanded
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const results = this.props.results;
    let expanded = this.state.expanded;
    // the list or results, where each result is a card
    return (
      <div>
        <h1>Results:</h1>
        <IconButton
          onClick={this.handleExpandClick}
          aria-expanded={expanded}
          aria-label="Ver mais"
        >
          Show more details
          <ExpandMoreIcon />
        </IconButton>
        {results.map((result) => (
          <Card className={"searchResultCardRoot"} key={result.id}>
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
              </Typography>
            </CardContent>
            {/* The hidden details that can be expanded */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
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
            </Collapse>
            {/* Button to handle team */}
            <CardActions>
              <Button size="small">Add to Team</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}
