import React from 'react';
import './App.css';



class UserDetailView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
        }
    }
    componentDidMount(){
        // console.log(this.props.dataUser)
    }

    render(){
       var data = this.props.dataUser
       var subclasses = data.subclasses;
       var equipments = data.equipments;
       var spells = data.spells;
   
       return(<div className="w3-container w3-card w3-padding">
           <div className="w3-row-padding">
            <a href="/userView" className="w3-button w3-highway-red w3-hover-red"><i className="fa fa-arrow-left"></i></a>
           </div>
           <br/>
           <div className="w3-row-padding">
             <div className="w3-col l4">
              <img className="char-img" src={ require(`${data.imageUrl}`) } />
             </div>
             <div className="w3-col l8 w3-center">
             <div className="w3-row">
                <div className="w3-col l6">
                <h6>Name : {data.name}</h6>
                </div>
                <div className="w3-col l6">
                <h6>Age : {data.age}</h6>
                </div>
                </div>
                <div className="w3-row">
                <div className="w3-col l6">
                <h6>Class : {data.classes}</h6>
                </div>
                <div className="w3-col l6">
                <h6>Race : {data.races}</h6>
                </div> 
              </div>
             </div>
           </div>
           <br/>
           <div className="w3-container w3-padding">
                 <div className="w3-row-padding">
                     <div className="w3-col l4 w3-card">
                     <table className="w3-table w3-bordered w3-centered">
                  <thead>
                      <tr className="w3-highway-red">
                          <th>Subclasses</th>
                      </tr>
                  </thead>
                  <tbody>
                  {subclasses.length>0? subclasses.map((data, key) => {
              return (
              <tr key={key}>
                <td>{data.name}</td>
              </tr>
              )
           }):<tr>
           <td>{"No Classes Found"}</td>
         </tr>}            
                  </tbody>
                 </table>             
           </div>
           <div className="w3-col l4 w3-card">
                     <table className="w3-table w3-bordered w3-centered">
                  <thead>
                      <tr className="w3-highway-red">
                          <th>Equipments</th>
                      </tr>
                  </thead>
                  <tbody>
                  {equipments.length>0? equipments.map((data, key) => {
              return (
              <tr key={key}>
                <td>{data.item.name}</td>
              </tr>
              )
           }):<tr>
           <td>{"No Equipment Found"}</td>
         </tr>}            
                  </tbody>
                 </table>             
           </div>
           <div className="w3-col l4 w3-card">
                     <table className="w3-table w3-bordered w3-centered">
                  <thead>
                      <tr className="w3-highway-red">
                          <th>Spells</th>
                      </tr>
                  </thead>
                  <tbody>
                  {spells.length>0?spells.map((data, key) => {
              return (
              <tr key={key}>
                <td>{data.name}</td>
              </tr>
              )
           }):<tr>
           <td>{"No Spells Found"}</td>
         </tr>}            
                  </tbody>
                 </table>             
           </div>
       </div>
       </div>
       </div>
       )
    }
}

export default UserDetailView;