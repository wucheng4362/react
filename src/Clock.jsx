import React, { Component } from "react";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      counter:Number(1),
      isToggleOn:true
    };
    // 如果handleClick不是箭头函数，那么这里要绑定this
    this.handleClick=this.handleClick.bind(this);
  }
  componentWillMount(){
    console.log("将要挂载")
  }
  componentDidMount() {
    // 挂载
    // 这里可以设置计时器
    console.log("渲染了");
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    // 销毁阶段 清除定时器
    console.log("销毁了");
    clearInterval(this.timerID);
  }
  // 更新date设置为最新时间的回调函数
  tick() {
    // 不要直接修改state 使用setState来修改状态值
    this.setState({
      date: new Date(),
    });
    // 因为this.props和this.state可能会异步更新，所以不要依赖它们的值来更新，这里可以使用函数的方式
    this.setState((state,props)=>({
      counter:state.counter+Number(props.increment)
    }))
  }
  // 这里要么使用箭头函数
  // handleClick=()=>{
  //   this.setState(state=>({isToggleOn:!state.isToggleOn}))
  // }
  // 使用普通函数，要在constructor里面绑定this
  handleClick(){
    this.setState(state=>({isToggleOn:!state.isToggleOn}))
  }
  render() {
    return (
      <div>
        <h1>Hello,world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h3>count:{this.state.counter}</h3>
        <button onClick={
          this.handleClick
        }>
          {this.state.isToggleOn?'ON':'OFF'}
        </button>
      </div>
    );
  }
}
