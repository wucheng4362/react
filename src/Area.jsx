import React, { Component } from "react";
import "../src/area.css";

export default class Area extends Component {
  constructor(props) {
    super(props);
  }

  pos = {};

  handleMouseUp = (e) => {
    this.pos.start = e.target.selectionStart;
    this.pos.end = e.target.selectionEnd;
    console.log("pos", this.pos);
  };

  handleClick = () => {
    const txtEle = document.querySelector("#txtEle");
    txtEle.setSelectionRange(1, 4);
    txtEle.focus();
  };
  handleClick1 = () => {
    const txtEle = document.querySelector("#txtEle");
    txtEle.setSelectionRange(4, 4);
    txtEle.focus();
  };
  handleClick2 = () => {
    const txtEle = document.querySelector("#txtEle");
    txtEle.setSelectionRange(this.pos?.start, this.pos?.end);
    txtEle.focus();
  };
  handleClick3 = () => {
    const txtEle = document.querySelector("#txtEle");
    txtEle.setRangeText("@@@@");
    txtEle.focus();
  };

  handleClick4 = () => {
    const txtEle = document.querySelector("#txtEle");
    txtEle.setRangeText("@@@@", 5, 10, "preserve");
    txtEle.focus();
  };
  render() {
    return (
      <div className="container">
        <textarea id="txtEle" onMouseUp={this.handleMouseUp}>
          在web开发中，有时不可避免会和选区与光标打交道，比如选中高亮、选中出现工具栏、手动控制光标位等。选区就是用鼠标选中的那一部分，就是下图中蓝色的部分；光标就是下图中闪烁的竖线。
        </textarea>
        <br />
        <button onClick={this.handleClick}>选中"web"</button>
        <button onClick={this.handleClick1}>聚焦到"web"后</button>
        <button onClick={this.handleClick2}>还原选区</button>
        <br />
        <button onClick={this.handleClick3}>在选区插入新内容</button>
        <button onClick={this.handleClick4}>在5-10 的地方插入新内容</button>
      </div>
    );
  }
}
