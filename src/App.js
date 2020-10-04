import React from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      monsters: [],
      searchField: "",
    };

    // we need to set ht context of this explicitly to user defined functions
    // because by default JS dosent determine and resolve the context of the functions
    // for render and componentDidMount, this binding is not required, bcoz we are caling super here
    // and the Component class sets the thic context to these methods
    // NOTE: WE DO NOT NEED TO BIND THIS EXLICITLY FOR ES6 ARROW FUNCTIONS
    // BECAUSE WHEN JS INTERPRETS THE CLASS IT RECOGNIZES ARROW FUNCTION
    // AND BINDS THE CLASS CONTEXT TO THE ARROW FUNCTION
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // from here we are reading the json body from response and returning as new promise
        return response.json();
      })
      .then((users) => {
        // the new promise is actually handled in here
        this.setState({ monsters: users });
      });
  }

  handleChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  // setState is an async function call
  // so when ever we set the value is state usinf this method
  // its not guaranteed to be set immediately
  render() {
    // destructuring the items from state
    const { monsters, searchField } = this.state;
    const filterdMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        {
          // <input
          //   type="search"
          //   placeholder="Search monsters"
          //   onChange={(event) => {
          //     this.setState({ searchField: event.target.value });
          //     // this console would not print the updated state as
          //     // setState is an async method, in order to check the state
          //     // after the setState completes, we can use a callback with setState
          //     // console.log(this.state);
          //     //  this.setState({ searchField: event.target.value }, () => {
          //     //   console.log(this.state);
          //     //});
          //   }}
          // />
        }
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filterdMonsters}></CardList>
      </div>
    );
  }
}

export default App;
