/*functional component that simply holds the text at the bottom of the page
it was done in this manner to make the component extensible for many projects
precondition: it takes a props object as input that contains the following attributes:
                name: string representing the name of the creator
                purpose: string representing why this app was created
                creatorLink: string representing a URL to the creator's website or personal portfolio
                sourceCodeLink: string representing a URL to the source code of this app
postcondition: it creates a div that contains the following text: "This React app was created by (NAME) for (PURPOSE). Check out the source code on Github"
the name and purpose can be modified by the parent class
*/
import React from "react";
import PropTypes from "prop-types";

export default function CreditBox(props) {
  CreditBox.propTypes = {
    name: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    creatorLink: PropTypes.string.isRequired,
    sourceCodeLink: PropTypes.string.isRequired,
  };

  return (
    <div className="creditBox">
      <p>
        This React app was created by{" "}
        <a href={props.creatorLink} target="_blank" rel="noopener noreferrer">
          {props.name}
        </a>{" "}
        {props.purpose} Check out the source code on{" "}
        <a
          href={props.sourceCodeLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        .
      </p>
    </div>
  );
}
