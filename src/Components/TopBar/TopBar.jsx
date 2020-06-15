//a function that is the search bar for the program as a react element
//its a function and not a class since it won't have a life cycle, so there is no need for a state - makes it simpler and more maintainable
//it receives as props a handler from SuperHeroApp, where SuperHeroApp will determine if the
//new query should be submitted to the API or not (when the user presses the enter key)

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchBar from "./SearchBar/SearchBar";

//styles for the bar
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function TopBar(props) {
  const changeViewHandler = () => {
    const changeView = props.changeViewHandler;
    changeView();
  };

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* Title for the top left of the app bar */}
          <Typography className={classes.title} variant="h6" noWrap>
            Superhero Team Builder
          </Typography>
          <SearchBar changeQueryHandler={props.changeQueryHandler} />
          <Button onClick={() => changeViewHandler()} variant="contained">
            {props.message}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
