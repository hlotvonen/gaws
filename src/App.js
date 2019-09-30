import React, { Component } from 'react';
import './App.css';

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
    fetch('https://spreadsheets.google.com/feeds/list/1Hk2VpFMLtBee2Tz9eDjBK02hmfCoEq01xeJyj0Zcq98/od6/public/values?alt=json')
    .then( (response) => {
      return response.json()
    }).then( (json) => {
      const sheetData = JSON.stringify(json, null, 2)
      const parsedSheetData = JSON.parse(sheetData)
      const entries = parsedSheetData.feed.entry
      const texts = []
      //get the text entry from each response
      for (const entry in entries) {
        //console.log([[entries[entry].gsx$option1]])
        texts.push([[entries[entry].gsx$option1.$t], [entries[entry].gsx$option2.$t], [entries[entry].gsx$option3.$t], [entries[entry].gsx$option4.$t], [entries[entry].gsx$option5.$t]])
      }
      //let's make an array for the texts that will be shown
      //and one that holds all different text entries
      this.setState({
        data: texts
      });
      this.newTexts()
    }).catch( (ex) => {
      //let's take the placeholder array in case we fail getting data from google spreadsheets
      this.setState({
        data: null
      });
      console.log('parsing failed', ex)
    })
  }

  getArrayRandomElement = (arr) => {
    if (arr && arr.length) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    // The undefined will be returned if the empty array was passed
  }
  newTexts = () => {
    let newtexts = {}
    if( this.state.data != null ) {
      newtexts = {
        0:  this.getArrayRandomElement(this.state.data[0]),
        1:  this.getArrayRandomElement(this.state.data[1]),
        2:  this.getArrayRandomElement(this.state.data[2]),
        3:  this.getArrayRandomElement(this.state.data[3]),
        4:  this.getArrayRandomElement(this.state.data[4]),
        5:  this.getArrayRandomElement(this.state.data[5]),
        6:  this.getArrayRandomElement(this.state.data[6]),
        7:  this.getArrayRandomElement(this.state.data[7]),
        8:  this.getArrayRandomElement(this.state.data[8]),
        9:  this.getArrayRandomElement(this.state.data[9]),
        10:  this.getArrayRandomElement(this.state.data[10]),
        11:  this.getArrayRandomElement(this.state.data[11]),
        12:  this.getArrayRandomElement(this.state.data[12]),
        13:  this.getArrayRandomElement(this.state.data[13])
      }
    }
    this.setState({
      texts: newtexts
    })
  }

  render() {
    let texts = this.state.texts
    return (
      <div>
        <button onClick={this.newTexts}>Generate new</button>
        {Object.keys(texts).map((text, index) => <span key={index}>{texts[index]}</span>)}
      </div>
    )
  }
}

export default App;
