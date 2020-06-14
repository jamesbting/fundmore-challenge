//class that simply holds the text at the bottom of the page
import React from "react";
export default class CreditBox extends React.Component {
  render() {
    return (
      <div className="creditBox">
        <p>
          This React app was created by{" "}
          <a
            href="https://www.linkedin.com/in/james-b-ting/"
            target="_blank"
            rel="noopener noreferrer"
          >
            James Ting
          </a>{" "}
          as a solution to the Fundmore.ai coding challenge. Check out the
          source code on{" "}
          <a
            href="https://github.com/jamesbting/fundmore-challenge"
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
}
