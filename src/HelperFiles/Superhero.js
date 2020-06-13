//this class should call the API to get the information

export default class Superhero {
  //accepts a javascript object, and then builds a Superhero object
  //the javascript object should be the result of calling SearchByName from the APICaller object
  constructor(information) {
    this.id = parseInt(information.id);
    this.appearance = information.appearance;
    this.image = information.image; //this is actually a url to an image
    this.powerStats = information.stats;
  }

  //some getter methods
  getID = () => this.id;

  getAppearance = () => this.appearance;

  getImage = () => this.image;

  getStats = () => this.stats;
}
