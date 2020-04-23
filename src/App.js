import React from 'react';
import './App.css';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CharacterListView from './CharacterListView';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      classes: [],
      races: [],
      equipments: [],
      finalObject: {},
      buttonFlag:false,
      serviceWait: false,
      showDetail: false,
      errorMessage: '',
      hasError: true
    }
  }
  handleChangeClasses = selectedOption => {
    
    this.setState({ selectedOptionClasses: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeRaces = selectedOption => {
    this.setState({ selectedOptionRaces: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeEquipment = selectedOption => {
    this.setState({ selectedOptionEquipment: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeName = e => {
    this.setState({ name: e.target.value });
    console.log(`Option selected:`, e.target.value);
  };
  handleChangeAge = e => {
    this.setState({ age: e.target.value });
    console.log(`Option selected:`, e.target.value);
  };
  setObj(key, value) {
    var obj = this.state.finalObject
    obj[key] = value
    this.setState({ finalObject: obj })
  }

  baseUrl = 'https://cors-anywhere.herokuapp.com/';
  saveCharacterData() {
    this.setState({ serviceWait: true })
    fetch(this.baseUrl + 'https://rakuten-dnd-character-app.herokuapp.com/api/saveCharacterData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://rakuten-dnd-ui.herokuapp.com'
      },
      body: JSON.stringify({
        classes: this.state.selectedOptionClasses?this.state.selectedOptionClasses['value']:"",
        races: this.state.selectedOptionRaces? this.state.selectedOptionRaces['value']:"",
        age: this.state.age?this.state.age:"",
        name: this.state.name?this.state.name:""
      }),
    })
      .then((response) => {
        if(response.ok){
          response.json()
          this.setState({hasError: false})
        this.setState({ serviceWait: true })
        this.setState({ showDetail: true })
        }
      })
      .catch(error => {
        let errorNames = '';
        error.errors.map(iter => {
          errorNames = iter.field + ', ' + errorNames;
        })
        this.setState({errorMessage: errorNames + ' is required'});
      })
      
  }


  submit = () => {
    setTimeout(() => {
      this.saveCharacterData()
    }, 1000)
  }

  componentDidMount() {

    fetch(this.baseUrl + 'https://www.dnd5eapi.co/api/classes').then((response) => {
      return response.json()
    }).then((data) => {
      let newArray = []
      data.results.map(iter => {
        let obj = {}
        obj['value'] = iter.index;
        obj['label'] = iter.index;
        newArray.push(obj)
      })
      this.setState({ classes: newArray })
    })
    fetch(this.baseUrl + 'https://www.dnd5eapi.co/api/races').then((response) => {
      return response.json()
    }).then((data) => {
      let newArray = []
      data.results.map(iter => {
        let obj = {}
        obj['value'] = iter.index;
        obj['label'] = iter.index;
        newArray.push(obj)
      })
      this.setState({ races: newArray })
    })
  }
  render() {

    return (
      <div>
        {!this.state.showDetail ? (<div className="App">
          <div class="w3-card w3-padding">
            <div class="w3-row-padding">
              <div class="w3-panel w3-round w3-highway-red w3-text-white">
                <h3>Customize Your D&amp;D Character</h3>
              </div>
            </div>
            <div class="w3-row-padding">
              <div class="w3-col l6 s6 m6">

                <input class="w3-input w3-border"
                  placeholder="Enter Character Name.."
                  name="Name"
                  type="text"
                  checked={this.state.isGoing}
                  onChange={this.handleChangeName} />

              </div>
              <div class="w3-col l6 s6 m6">

                <input class="w3-input w3-border"
                  placeholder="Enter Character Age..."
                  name="Age"
                  type="text"
                  value={this.state.numberOfGuests}
                  onChange={this.handleChangeAge} />

              </div>
            </div>
            <br />
            <div class="w3-row-padding">
              <div class="w3-col l6 s6 m6">
                <Select placeholder="Select Class"
                  value={this.state.selectedOptionClasses}
                  onChange={this.handleChangeClasses}
                  options={this.state.classes}
                />
              </div>
              <div class="w3-col l6 s6 m6">
                <Select placeholder="Select Race"
                  value={this.state.selectedOptionRaces}
                  onChange={this.handleChangeRaces}
                  options={this.state.races}
                />
              </div>
            </div>
            <br />
            <div class="w3-row">
              <button class="w3-highway-red w3-round-xxlarge nav-button w3-large w3-button w3-hover-red" onClick={this.submit}>{this.state.serviceWait ? <FontAwesomeIcon spin icon={faSpinner} /> : 'Create'}</button>
              { !this.state.hasError && this.state.errorMessage &&
                 <h5 className="w3-panel w3-text-white w3-padding w3-red"> { this.state.errorMessage } </h5> }
            </div>
          </div>

        </div>) : <CharacterListView />}

      </div>

    );
  }
}

export default App;
