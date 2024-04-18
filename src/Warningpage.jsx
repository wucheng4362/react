import React, { Component } from 'react'
import './App13.css'

export default class Warningpage extends Component {
  constructor(props){
    super(props);
    this.state={showWarning:true}
  }
  toggleClick=()=>{
    this.setState((state)=>({showWarning:!state.showWarning}))
  }
  render() {
    return (
      <div>
        {this.state.showWarning?<WarningBanner/>:null}
        <button onClick={this.toggleClick}>
          {
            this.state.showWarning?'Hide':'show'
          }
        </button>
      </div>
    )
  }
}
function WarningBanner(props){
  return (
    <div className="warning">
        Warning!
    </div>
  )
}
