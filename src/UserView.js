import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



class UserView extends React.Component{
    constructor(){
        super();
        this.state ={
            data:[],
            checker :{}
        }
    }
    componentDidMount(){
        fetch('https://rakuten-dnd.herokuapp.com/api/getCharacterData').then(data =>{
            return data.json()
        }).then(response =>{
            this.setState({data:response})
        })
    }
    render(){
        console.log(this.state.data)
        return(
            <div>
                <div className="parent">
              {this.state.data.length>0?this.state.data.map((iter,index) =>{
                    return (<div className ="box" >
                           <ExpansionPanel>
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography ><label>Name:{iter.name}</label></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                  Age: {iter.age}<br></br>
                                  Race: {iter.races && iter.races.name?iter.races.name:''}<br></br>
                                  Size Description : {iter.classes&& iter.classes.size_description?iter.classes.size_description:''}<br></br>
                                  Speed :{iter.races && iter.races.speed?iter.races.speed:''}<br></br>
                                  Class Name : {iter.classes&& iter.classes.name?iter.classes.name:''}<br></br>     
                                  Equipment: {iter.equipments && iter.equipments.name?iter.equipments.name:''}<br></br>
                                  Equip Desc :{iter.equipments && iter.equipments.desc?iter.equipments.desc[0]:''}<br></br>
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>);
                 }):''}
                </div>
            </div>
        )
    }
}

export default UserView;