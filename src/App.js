import { Component } from "react";
import "./App.css";
import Cardlist from "./component/card-list/card-list.component.jsx";
import SearchBox from "./component/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    // Step 1 - Initialize the default state
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        // Step 2 - Set the state to the initialized state created above
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.setState);
          }
        )
      );
  }

  // Step 4 - In the onSearchChange call back function, event is passed into it as a
  // parameter and fron there the value is passed into the searchField.
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    console.log("render");

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // Step 5 - The searchField is then used to filter the array the was fetched and stored in
    // monsters state.
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          // Step 3 - Whatever is typed in the SearchBox component is captured in the SearchChange callback
          onChangeHandler={onSearchChange}
          placeholder="searchbox"
          className="monsters-search-box"
        />
        {/* Step 6 - The filtered array is what is being used to create the card list array */}
        <Cardlist monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
