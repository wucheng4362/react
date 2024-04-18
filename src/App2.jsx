import React, { Component } from 'react'

export default class App2 extends Component {
    state={
        num:1,
    }
  render() {
    return (
      <div>
          <h2>数字为{this.state.num}</h2>
          {/* 直接修改变量无法修改到试视图的 ，要通过setState*/}
          <button onClick={()=>this.setState({num:this.state.num+1})}>累加</button>
      </div>
    )
  }
}
// state -》setState