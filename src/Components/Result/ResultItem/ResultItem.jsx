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
  //since i am comparing the hero objects here !== won't work since it is comparing by reference
  //and while JSON.stringify(props.hero) !== JSON.stringify(state.hero) would work, it returns false if the attributes are in a different order
  //since it is from an API, the attributes being in a different order shouldnt be a big problem, however using isEqual from lodash is a more
  //robust solution and will have slightly better performance since it wont run through the entire object, it will return false at the first difference
  static getDerivedStateFromProps(props, state) {
    var _ = require("lodash"); //require lodash to compare strings
    if (!_.isEqual(props.hero, state.hero)) {
      //if () {
      return { hero: props.hero };
    }
    return null;
  }

  //handle when expanded/collapsed button is clicked
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
    const {
      name,
      image,
      biography,
      powerstats,
      appearance,
      work,
    } = this.props.hero; //use destructuring to make the code more readable and reduce the code base
    let expanded = this.state.expanded;
    return (
      <Card className={"searchResultCardRoot"}>
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
            Full Name: {biography["full-name"]} <br></br>
            Occupation: {work["occupation"]}
            {/* i use biography["full-name"] instead of the dot notation here because  biography.full-name returns NaN*/}
            <br></br>
            Publisher: {biography.publisher}
          </Typography>
        </CardContent>

        {/* The hidden details that can be expanded */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* My gut tells me there is a better way to do this, but I can't think of it
                    TODO: think of a better way that is more extensible */}
            {/* Biography box for the hero */}
            <div className="resultItemBiographyBox">
              <Typography>
                {" "}
                <u>Biography:</u>
                <br></br>
                Alignment: {biography.alignment}{" "}
                {/* Right now it says "good" instead of "Good" (same for neutral and evil) this is due to the API returning "good" instead of "Good"- needs to be fixed*/}
                <br></br>
                Alter Egos: {biography["alter-egos"]}
                <br></br>
                Aliases: {biography["aliases"].join(", ")}{" "}
                {/* the join is to list all the elements with a ", " between them */}
                <br></br>
                Place of Birth: {biography["place-of-birth"]}
                <br></br>
                First Appearance: {biography["first-appearance"]}
              </Typography>
            </div>
            <br></br>
            {/* Appearance box to list what the hero looks like */}
            <div className="resultItemAppearanceBox">
              <Typography>
                {" "}
                <u>Appearance:</u>
                <br></br>
                Gender: {appearance["gender"]}
                <br></br>
                Race: {appearance["race"]}
                <br></br>
                Height: {appearance["height"].join(", ")}
                {/* the join is to list all the elements with a ", " between them */}
                <br></br>
                Weight: {appearance["weight"].join(", ")}
                <br></br>
                Eye color: {appearance["eye-color"]}
                <br></br>
                First Appearance: {appearance["hair-color"]}
              </Typography>
            </div>
            <br></br>
            {/* Box for the states for this hero */}
            <div className="resultItemStatsBox">
              <Typography>
                {" "}
                <u>Stats:</u>
                <br></br>
                Intelligence: {powerstats.intelligence}
                <br></br>
                Strength: {powerstats.strength}
                <br></br>
                Speed: {powerstats.speed}
                <br></br>
                Durability: {powerstats.durability}
                <br></br>
                Power: {powerstats.power}
                <br></br>
                Combat: {powerstats.combat}
              </Typography>
            </div>
          </CardContent>
        </Collapse>
        <CardActions>
          {/* Button to handle expanding for more details to a team */}
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
