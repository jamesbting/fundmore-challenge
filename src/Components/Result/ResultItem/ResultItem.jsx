import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

import "./ResultItem.css";

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: this.props.hero,
      expanded: false,
      handler: props.handler,
    };
  }

  //new search query has been give from this component's parent props - set the state and re-render
  static getDerivedStateFromProps(props, state) {
    if (props.hero.toString() !== state.hero.toString()) {
      return { hero: props.hero };
    }
    return null;
  }

  //handle when expanded
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  //handler for adding to team
  handleAddToTeam = () => {
    const handler = this.state.handler;
    const hero = this.state.hero;
    handler(hero);
  };

  render() {
    const hero = this.props.hero;
    let expanded = this.state.expanded;
    //result card for a hero
    return (
      <Card className={"searchResultCardRoot"} key={`${hero.name}-${hero.id}`}>
        <CardMedia
          className={"media"}
          image={`${hero.image.url}`}
          title={`Image of ${hero.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {hero.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Alignment: {hero.biography.alignment}{" "}
            {/* Right now it says "good" instead of "Good" (same for neutral and evil) - needs to be fixed*/}
            <br></br>
            Publisher: {hero.biography.publisher}
          </Typography>
        </CardContent>
        {/* The hidden details that can be expanded */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {/* My gut tells me there is a better wat to do this, but I can't think of it
                    TODO: think of a better way that is more extensible */}
              Stats:
              <br></br>
              Intelligence: {hero.powerstats.intelligence}
              <br></br>
              Strength: {hero.powerstats.strength}
              <br></br>
              Speed: {hero.powerstats.speed}
              <br></br>
              Durability: {hero.powerstats.durability}
              <br></br>
              Power: {hero.powerstats.power}
              <br></br>
              Combat: {hero.powerstats.combat}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions>
          {/* Button to handle expanding for mor details to a team */}
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Ver mais"
          >
            <ExpandMoreIcon />
          </IconButton>
          {/* Button to handle adding to a team */}

          <Button size="small" onClick={this.handleAddToTeam}>
            Add to Team
          </Button>
        </CardActions>
      </Card>
    );
  }
}
