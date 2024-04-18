import MenuItem from "@universe-design/react/es/menu/MenuItem";
import React, { Component } from "react";

// 受控组件：<input> <textarea> <select> 通常自己维护state，
// 可以将表单写为受控组件
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state={value:'coconut'}; //单选
  }
  handleChange = (e) => {
    // e.targte是指触发事件的元素
    this.setState({
      value: e.target.value,
    });
  };
  handleClick = (e) => {
    alert("It was submitted:" + this.state.value);
    e.preventDefault(); //阻止冒泡
  };
  render() {
    return (
      <form>
        {/* 1、input */}
        {/* <label htmlFor="">
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label> */}

        {/* 2、textarea */}
        {/* <label>
            文章：
            <textarea value={this.state.value} onChange={this.handleChange}></textarea>
        </label> */}

        {/* 3、select标签 */}
        <label>
          选择你喜欢的风味：
          {/* 在根标签中使用value属性 */}
          <select
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>

        <input type="submit" value="Submit" onClick={this.handleClick} />
      </form>
    );
  }
}
