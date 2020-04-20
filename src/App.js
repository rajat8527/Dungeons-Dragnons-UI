import React from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import UserView from './UserView';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      name:'',
      age:'',
      classes:[],
      races:[],
      equipments: [],
      finalObject :{},
      showDetail:false
    }
  }
  handleChangeClasses = selectedOption => {
    this.setState({selectedOptionClasses: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeRaces = selectedOption => {
    this.setState({ selectedOptionRaces:selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeEquipment = selectedOption => {
    this.setState({ selectedOptionEquipment:selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeName = e => {
     this.setState({ name:e.target.value });
    console.log(`Option selected:`, e.target.value);
  };
  handleChangeAge = e => {
     this.setState({ age:e.target.value });
    console.log(`Option selected:`, e.target.value);
  };
  setObj(key,value){
    var obj = this.state.finalObject
    obj[key] = value
    var that = this
    this.setState({finalObject:obj})
  }
  callFinal(key,value){
 
    fetch('https://rakuten-dnd.herokuapp.com/api/saveCharacterData', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.finalObject),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      this.setState({showDetail:true})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  

  }
  submit =() =>{
    var finalObject =this.state.finalObject
    var classObj;
    var racesObj;
    var equipmentObj;
    fetch("http://www.dnd5eapi.co/api/classes/"+this.state.selectedOptionClasses['value']).then((response) =>{
     return response.json()
    }).then(data =>{
      classObj = data
       finalObject['classes'] = classObj;
       this.setObj('classes',classObj)
    })
    fetch("http://www.dnd5eapi.co/api/races/"+this.state.selectedOptionRaces['value']).then((response) =>{
      return response.json()
    }).then(data =>{
      racesObj = data
      finalObject['races'] = racesObj;
       this.setObj('races',racesObj)
    })
    fetch("http://www.dnd5eapi.co/api/equipment/"+this.state.selectedOptionEquipment['value']).then((response) =>{
      return response.json()
    }).then(data =>{
      equipmentObj = data
       finalObject['equipments'] = equipmentObj;
      this.setObj('equipments',equipmentObj)
    })
     
    finalObject['name'] = this.state.name;
    finalObject['age']  = this.state.age;
    var that = this
    this.setState({finalObject:finalObject},() =>{
     setTimeout(() =>{
       that.callFinal()
     },1000)
    })
 

    console.log(finalObject)
  }

  componentDidMount(){
    fetch('http://www.dnd5eapi.co/api/classes').then((response) =>{
     return response.json()
    }).then((data) =>{
      let newArray = []
      data.results.map(iter =>{
        let obj = {}
        obj['value'] = iter.index;
        obj['label'] = iter.index;
        newArray.push(obj)
      })
      this.setState({classes:newArray})
    })
    fetch('http://www.dnd5eapi.co/api/races').then((response) =>{
      return response.json()
     }).then((data) =>{
      let newArray = []
      data.results.map(iter =>{
        let obj = {}
        obj['value'] = iter.index;
        obj['label'] = iter.index;
        newArray.push(obj)
      })
      this.setState({races:newArray})
     })
     fetch('http://www.dnd5eapi.co/api/equipment').then((response) =>{
      return response.json()
     }).then((data) =>{
      let newArray = []
      data.results.map(iter =>{
        let obj = {}
        obj['value'] = iter.index;
        obj['label'] = iter.index;
        newArray.push(obj)
      })
      this.setState({equipments:newArray})
     })
  }
  render(){
 
  return (
    <div>
      {!this.state.showDetail?(<div className="App">
    <label>
          Name :
          <input
            name="Name"
            type="text"
            checked={this.state.isGoing}
            onChange={this.handleChangeName} />
        </label>
        <br />
        <label>
          Age :
          <input
            name="Age"
            type="text"
            value={this.state.numberOfGuests}
            onChange={this.handleChangeAge} />
        </label><br></br>
        <label>
           classes:
         <Select
         value={this.state.selectedOptionClasses}
         onChange={this.handleChangeClasses}
         options={this.state.classes}
       />
       </label>
       <label> races:
         <Select
         value={this.state.selectedOptionRaces}
         onChange={this.handleChangeRaces}
         options={this.state.races}
       />
       </label>
       <label> Equipment:
         <Select
         value={this.state.selectedOptionEquipment}
         onChange={this.handleChangeEquipment}
         options={this.state.equipments}
       />
       </label>
       <button onClick={this.submit}>Submit</button>
    </div>):<UserView/>}
    </div>
    
  );
  }
}

export default App;
