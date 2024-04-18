import React, { Component } from "react";

const scaleNames={
  c:'Celsius',
  f:'Fahrenheit'
}

// 温度转换
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default class Ztts1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale:'c'
    };
  }
  handleCeChange=(t)=>
  {
      this.setState({
          temperature:t,
          scale:'c'
      })
  }
  handleFaChange=(t)=>
  {
    this.setState({
      temperature:t,
      scale:'f'
  })
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemratureChange={this.handleCeChange}/>
        <TemperatureInput scale="f" temperature={fahrenheit} onTemratureChange={this.handleFaChange}/>
        <BoilingVerdict celsius={this.state.temperature}/>
      </div>
    );
  }
}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil</p>;
}
class TemperatureInput extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = (e) => {
    console.log(e.target.value)
    this.props.onTemratureChange(e.target.value)
  };
  render() {
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[this.props.scale]}</legend>
        <input
          type="text"
          value={this.props.temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
  
}
