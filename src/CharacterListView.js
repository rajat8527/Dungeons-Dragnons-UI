import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CharacterDetailView from './CharacterDetailView';


class CharacterListView extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      checker: {},
      moreInfo: true,
      dataObj: {},
      showMoreDetail: false,
      flag: false
    }
  }

  baseUrl = 'https://cors-anywhere.herokuapp.com/';

  deleteAllCharacters() {
    this.setState({ loadDeleteAll: true })
    fetch(this.baseUrl + 'https://rakuten-dnd-character-app.herokuapp.com/api/deleteAllCharacters', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://rakuten-dnd-ui.herokuapp.com'
      },
    })
      .then(() => this.setState({data:[],flag:true}))
      .catch((error) => {
        this.setState({ loadDeleteAll: false })
        console.error('Error:', error);
      });
  }

  deleteCharacterById(id){
    var newData = this.state.data
    this.setState({
      data: newData.filter(x => x._id !== id).reverse(),
    });
    this.setState({ loadDeleteById: true })
    fetch(this.baseUrl + 'https://rakuten-dnd-character-app.herokuapp.com/api/deleteCharacterById/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://rakuten-dnd-ui.herokuapp.com'
      },
    }).then(response => {
      if (response.status === 'error') {
        this.setState({
          data: newData
        });
      } else {
        this.setState({flag: true });
        console.log("deleted successfully..")
      }
    })
      .catch((error) => {
        this.setState({ loadDeleteById: false })
        console.error('Error:', error);
      });
  }

  fetchCharacter() {
    fetch(this.baseUrl + 'https://rakuten-dnd-character-app.herokuapp.com/api/getCharacterData', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://rakuten-dnd-ui.herokuapp.com'
      }
    }).then(data => {
      return data.json()
    }).then(response => {
      if (response.length > 0) {
        this.setState({ data: response })
      }
      else {
        this.setState({ data: [], flag: true })
      }

    })
  }

  componentDidMount() {
    this.fetchCharacter()
  }
  dataTransferview(data) {
    this.setState({ dataObj: data, showMoreDetail: true })
  }


  render() {
    console.log(this.state.data)
    return (
      <div>{!this.state.showMoreDetail ? (
        <div className="parent">
         {this.state.data.length>0? <div className="w3-container">
          <div className="w3-row">
                  <button className="w3-button delete-all w3-highway-red w3-hover-red w3-round-xxlarge w3-right" onClick={() => this.deleteAllCharacters()}>{this.state.loadDeleteAll ? <FontAwesomeIcon spin icon={faSpinner} /> : 'Delete All Characters'}</button>
                </div>
          </div>
      :''}
          {this.state.data.length > 0 ? this.state.data.reverse().map((iter, index) => {
            return (
              <div className="w3-container">
                <br />
                <div className="w3-card">
                  <div className="w3-row">
                    <div className="w3-col l3">
                      <img alt="notfound" className="char-img" src={require(`${iter.imageUrl}`)} />
                    </div>
                    <div className="w3-col l9 w3-center">
                      <div className="w3-row">
                        <div className="w3-col l4">
                          <h6>Name : {iter.name}</h6>
                        </div>
                        <div className="w3-col l4">
                          <h6>Age : {iter.age}</h6>
                        </div>
                        <div className="w3-col l4">
                          <h6>Race : {iter.races}</h6>
                        </div>
                      </div>
                      <div className="w3-row">
                        <div className="w3-col l4">
                          <h6>Class : {iter.classes}</h6>
                        </div>
                        <div className="w3-col l4"></div>
                        <div className="w3-col w3-padding l4 w3-right">
                          <div className="w3-bar">
                            <button onClick={() => { this.dataTransferview(iter) }} className="w3-button w3-padding w3-round-xxlarge w3-highway-red w3-hover-red" ><b>More Info</b></button>
                            <button onClick={() => { this.deleteCharacterById(iter._id) }} className="delete-by-id w3-button w3-padding w3-round-xxlarge w3-highway-red w3-hover-red" ><b>Delete</b></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            );
          }) : (this.state.flag ? <div className="w3-center w3-panel w3-highway-red w3-padding"><h5><b>No Characters Found, Please create one !</b></h5></div> : <div className="w3-center"><FontAwesomeIcon className="w3-xxlarge w3-center" spin icon={faSpinner} /></div>)}
        </div>) : <CharacterDetailView dataUser={this.state.dataObj} />}

      </div>
    )
  }
}

export default CharacterListView;