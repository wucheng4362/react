import React, { Component } from 'react'

// 状态提升
export default class Ztts extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            temperature:''
        }
    }
    handleChange=(e)=>{
        const value=e.target.value;
        this.setState({
            temperature:value
        })
    }
  render() {
    return (
      <fieldset>
          <legend>Enter temperature in Celsius</legend>
          <input type="text" value={this.state.temperature} onChange={this.handleChange}/>
          <BoilingVerdict celsius={this.state.temperature}/>
      </fieldset>
    )
  }
}
function BoilingVerdict(props)
{
    if(props.celsius>=100){
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil</p>
}
