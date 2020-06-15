//functional component that returns a search bar, that can be used to search for superheros in the API
//it takes as props an changeQueryHandler, that allows this class to modify the state of its parent (or grandparent) components
//and sets the state of the parent component to have the new query, so the parent component can do as it pleases with

import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";

import SearchIcon from "@material-ui/icons/Search";

//some styles to make it pretty
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//precondition: props.changeQueryHandler must be a function that modifies the state of the parent component from which it originates, props must be an object
//postcondition: this function returns a search bar component that will accept queries and pass them to the parent component by updating the state of the parent component
export default function SearchBar(props) {
  const classes = useStyles();

  //take the event and the handler that was passed down as a prop, and change the query of the SuperHeroApp class
  const onChangeQueryHandler = (event) => {
    const changeQuery = props.changeQueryHandler;
    changeQuery(event);
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search for a superhero…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onKeyPress={(event) => onChangeQueryHandler(event)}
          inputProps={{
            "aria-label": "search",
          }}
        />
      </div>
      <div className={classes.grow} />
    </>
  );
}

SearchBar.propTypes = {
  changeQueryHandler: PropTypes.func.isRequired,
};
