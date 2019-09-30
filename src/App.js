import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      texts: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(
      "https://spreadsheets.google.com/feeds/list/1fpEKTrmYiFT5WOGOS5sAi-EWolT_Qty1DbgYn05SfXo/od6/public/values?alt=json"
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        const sheetData = JSON.stringify(json, null, 2);
        const parsedSheetData = JSON.parse(sheetData);
        const entries = parsedSheetData.feed.entry;
        const texts = [];
        //get the text entry from each response
        for (const entry in entries) {
          texts.push([
            entries[entry].gsx$option1.$t,
            entries[entry].gsx$option2.$t,
            entries[entry].gsx$option3.$t,
            entries[entry].gsx$option4.$t,
            entries[entry].gsx$option5.$t
          ]);
        }
        //let's make an array for the texts that will be shown
        //and one that holds all different text entries
        this.setState({
          data: texts
        });
        this.newTexts();
      })
      .catch(ex => {
        //let's take the placeholder array in case we fail getting data from google spreadsheets
        this.setState({
          data: null
        });
        console.log("parsing failed", ex);
      });
  };

  getArrayRandomElement = arr => {
    if (arr && arr.length) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    // The undefined will be returned if the empty array was passed
  };

  filterArray = index => {
    let arr = this.state.data[index]
    arr = arr.filter(Boolean)
    return this.getArrayRandomElement(arr)
  };

  randomBoolean = () => {
    const random_boolean = Math.random() >= 0.5;
    return random_boolean
  }

  newTexts = () => {
    let newtexts = {};
    if (this.state.data != null) {
      newtexts = {
        0: this.filterArray(0),
        1: this.filterArray(1),
        2: this.filterArray(2),
        3: this.filterArray(3),
        4: this.filterArray(4),
        5: this.randomBoolean() ? this.filterArray(5) : this.filterArray(6),
        6: this.filterArray(7),
        7: this.filterArray(8),
        8: this.filterArray(9),
        9: this.filterArray(10),
        10: this.filterArray(11),
        11: this.filterArray(12)
      };
    }
    this.setState({
      texts: newtexts
    });
  };

  render() {
    let texts = this.state.texts;
    return (
      <div>
        <h1>Generator for Asemic Writing Systems (G.A.W.S)</h1>
        <button onClick={this.newTexts}>Generate new</button>
        <ol>
          {Object.keys(texts).map((text, index) => (
            <li key={index}>{texts[index]}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
