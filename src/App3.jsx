import React, { Component } from 'react'

export default class App3 extends Component {
    constructor(props){
        super(props)
        this.state={
            num:1
        }
    }
  render() {
    return (
      <div>
          <h2>数字为{this.state.num}</h2>
          {/* 直接修改变量无法修改到试视图的 ，要通过setState*/}
          <button onClick={()=>this.setState({num:this.state.num+1})}>按钮1- 累加</button>
          {/* 注意这里不能有(),因为这里把它当成js代码会立马执行 
          用bind方法修改this,指向App3*/}

          <button onClick={this.addNum.bind(this)}>按钮2- 累加</button>
          {/* 或者这里可以使用箭头函数规避掉this的指向问题 */}
          <button onClick={()=>this.addNum()}>按钮3- 累加</button>
      </div>
    )
  }
  addNum(){
    //   console.log(this)
      this.setState({num:this.state.num+1})
  }
}
// state -》setState