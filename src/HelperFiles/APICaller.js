//this class is responsible for calling the API and returning the responses as javascript objects
//this class in particular is meant to call the Superhero API (https://superheroapi.com/index.html) for
//data about various superheros
//when instansitating this class, you should already have an aceess token
export default class APICaller {
  //this takes as input a integer representing the access token. it will t
  constructor(token) {
    if (typeof token !== "number") {
      throw TypeError(`The token must be a number! You gave a ${typeof token}`);
    }
    this.token = token;
    this.baseURL = `https://superheroapi.com/api/${this.token}`;
    this.proxyURL = "https://cors-anywhere.herokuapp.com/"; // a proxy url to forward the request and avoid a
    this.result = null;
  }

  //a function tha calls the the API to search for a super hero by a string that is the name
  //returns a character id
  //it is async
  async searchByName(name) {
    if (typeof name !== "string") {
      throw TypeError(`The token must be a number! You gave a ${typeof token}`);
    }

    const URL = `${this.baseURL}/search/${name}`;
    const response = await fetch(this.proxyURL + URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const result = JSON.parse(JSON.stringify(data));

    return result;
  }
}
