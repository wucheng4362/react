import React from "react";

// 多选
class FormSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      options: [
        { value: "grapefruit", label: "葡萄柚" },
        { value: "lime", label: "酸橙" },
        { value: "coconut", label: "椰子" },
        { value: "mango", label: "芒果" },
      ],
    };
  }
  handleChange = (e) => {
    //   每次被选中的元素
    let item = e.target.value;
    // 然后将选中的元素进行选中或者剔除
    // 获取一个新的数组
    let items = this.state.arr.slice(); //不改变原数组，生成一个新的数组
    let index = items.indexOf(item);
    // 如果点击的是已经被选中的就把它删除，否则就添加到数组中
    index == -1 ? items.push(item) : items.splice(index, 1);
    this.setState({ arr: items });
  };
  handleClick = (e) => {
    //   console.log(this.state.arr)
    alert("your select"+this.state.arr.toString());
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <form>
          <select
            multiple={true}
            value={this.state.arr}
            onChange={this.handleChange}
          >
            {this.state.options.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Submit" onClick={this.handleClick} />
        </form>
      </div>
    );
  }
}

export default FormSelect;
