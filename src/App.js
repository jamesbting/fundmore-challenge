import React from "react";
import SuperHeroApp from "./Components/SuperHeroApp";
import { Helmet } from "react-helmet";

const TITLE = "Superhero Team Builder";
function App() {
  return (
    <div className="App">
      {/* Modify the head element to ensure the tab has the correct title */}
      <Helmet>
        {" "}
        <title>{TITLE}</title>
      </Helmet>
      <SuperHeroApp></SuperHeroApp>
    </div>
  );
}

export default App;
