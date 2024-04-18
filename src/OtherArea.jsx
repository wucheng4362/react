import React, { Component } from "react";
import "../src/otherArea.css";

function getNodeAndOffset(wrap_dom, start = 0, end = 0) {
  const txtList = [];
  const map = function (children) {
    [...children].forEach((el) => {
      if (el.nodeName === "#text") {
        txtList.push(el);
      } else {
        map(el.childNodes);
      }
    });
  };
  // 递归遍历，提取出所有 #text
  map(wrap_dom.childNodes);
  // 计算文本的位置区间 [0,3]、[3, 8]、[8,10]
  const clips = txtList.reduce((arr, item, index) => {
    const end =
      item.textContent.length + (arr[index - 1] ? arr[index - 1][2] : 0);
    arr.push([item, end - item.textContent.length, end]);
    return arr;
  }, []);
  // 查找满足条件的范围区间
  const startNode = clips.find((el) => start >= el[1] && start < el[2]);
  const endNode = clips.find((el) => end >= el[1] && end < el[2]);
  return [startNode[0], start - startNode[1], endNode[0], end - endNode[1]];
}

export default class OtherArea extends Component {
  constructor(props) {
    super(props);
  }

  lastRange = null;

  handleMouseUp = (e) => {
    var selection = document.getSelection();
    // 保存最后的range对象
    this.lastRange = selection.getRangeAt(0);
  };

  handleClick = () => {
    let data = {
      web: [
        {
          metaType: "recordPage",
          metaLocator: {
            recordPageApiName: "packageb2_1__c__record_page_aaddiu5atmsao",
            terminalType: "web",
            objectApiName: "packageb2_1__c__object_aaddglquxa6c6",
          },
          extraInfo: {
            recordPageID: "1746383641737264",
            objectID: "1745122869394495",
          },
          label: [
            {
              language_code: 1033,
              text: "Details page (pop-up)",
            },
            {
              language_code: 2052,
              text: "详情页（弹窗）",
            },
          ],
          changes: [
            {
              propertyLabel: [
                {
                  text: "Layout Design",
                  language_code: 1033,
                },
                {
                  language_code: 2052,
                  text: "页面设计",
                },
              ],
              desc: [
                {
                  language_code: 1033,
                  text: "Layout Design modified",
                },
                {
                  language_code: 2052,
                  text: "修改了页面设计",
                },
              ],
            },
          ],
          changeType: "update",
          operators: [
            {
              name: "段新源",
              avatar: {
                source: "image",
                image: {
                  imageId: "a8d9d320d5c1445eb935b30dc3c6c9df_c",
                  large: "/img/24137/a8d9d320d5c1445eb935b30dc3c6c9df_l.jpg",
                },
                color: "#4871e9",
                content: [
                  {
                    language_code: 2052,
                    text: "段新源",
                  },
                ],
                color_id: "V",
              },
              id: 1744770624677949,
            },
          ],
          latestChangeTime: 1668428051603,
        },
      ],
      www: [
        {
          metaType: "recordPage",
          metaLocator: {
            recordPageApiName: "packageb2_1__c__record_page_aaddiu5atmsao",
            terminalType: "web",
            objectApiName: "packageb2_1__c__object_aaddglquxa6c6",
          },
          extraInfo: {
            recordPageID: "1746383641737264",
            objectID: "1745122869394495",
          },
          label: [
            {
              language_code: 1033,
              text: "Details page (pop-up)",
            },
            {
              language_code: 2052,
              text: "详情页（弹窗）",
            },
          ],
          changes: [
            {
              propertyLabel: [
                {
                  text: "Layout Design",
                  language_code: 1033,
                },
                {
                  language_code: 2052,
                  text: "页面设计",
                },
              ],
              desc: [
                {
                  language_code: 1033,
                  text: "Layout Design modified",
                },
                {
                  language_code: 2052,
                  text: "修改了页面设计",
                },
              ],
            },
          ],
          changeType: "update",
          operators: [
            {
              name: "段新源",
              avatar: {
                source: "image",
                image: {
                  imageId: "a8d9d320d5c1445eb935b30dc3c6c9df_c",
                  large: "/img/24137/a8d9d320d5c1445eb935b30dc3c6c9df_l.jpg",
                },
                color: "#4871e9",
                content: [
                  {
                    language_code: 2052,
                    text: "段新源",
                  },
                ],
                color_id: "V",
              },
              id: 1744770624677949,
            },
          ],
          latestChangeTime: 1668428051603,
        },
      ],
    };
    data = Object.keys(data).reduce((newData, preKey) => {
      console.log("newData");
      console.log("preKey", preKey);
      const nn = preKey;
      if (preKey === "web") {
        const newKey = "app";
        newData[newKey] = data[preKey];
      } else {
        newData[preKey] = data[preKey];
      }
      return newData;
    }, {});
    console.log("data", data);
    const txt = document.querySelector("#txt");
    // 通过 selection 对象创建 range 对象
    const selection = document.getSelection();
    const range = document.createRange();
    // 设置选区起始位置
    range.setStart(txt.firstChild, 24);
    range.setEnd(txt.firstChild, 26);
    // 移除其他选区
    selection.removeAllRanges();
    // 添加选区
    selection.addRange(range);
  };
  handleClick1 = () => {
    const txt = document.querySelector("#richTxt");
    // 通过 selection 对象创建 range 对象
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNode(txt.childNodes[1]);
    // 移除其他选区
    selection.removeAllRanges();
    // 添加选区
    selection.addRange(range);
  };
  handleClick2 = () => {
    const txt = document.querySelector("#txt");
    const selection = document.getSelection();
    const range = document.createRange();
    range.setStart(txt.firstChild, 25);
    range.setEnd(txt.firstChild, 25);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  handleClick3 = () => {
    const node = document.createTextNode("我是新内容");
    // this.lastRange.deleteContents();
    this.lastRange.insertNode(node);
  };

  handleClick4 = () => {
    const node = document.createTextNode("我是新内容");
    this.lastRange.deleteContents();
    this.lastRange.insertNode(node);
  };

  render() {
    return (
      <div className="container">
        <div id="txt" contenteditable="true" onMouseUp={this.handleMouseUp}>
          在
          web开发中，有时不可避免会和“选区”与“光标”打交道，比如选中高亮、选中出现工具栏、手动控制光标位等。选区就是用鼠标选中的那一部分，就是下图中蓝色的部分；光标就是下图中闪烁的竖线。
        </div>
        <br />
        <button onClick={this.handleClick}>选中"光标"</button>
        <button onClick={this.handleClick2}>光标移动到“光标”后</button>
        <button onClick={this.handleClick3}>还原选区</button>
        <button onClick={this.handleClick3}>插入新内容</button>
        <button onClick={this.handleClick4}>替换新内容</button>

        <div id="richTxt" contenteditable="true">
          富文本怎么<span style={{ color: "red" }}>选区</span>
        </div>
        <button onClick={this.handleClick1}>选中"选区"</button>
      </div>
    );
  }
}
