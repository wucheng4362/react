import React from "react";
import "./App13.css";

const songs = [
  { id: 1, name: "痴心绝对" },
  { id: 2, name: "像我这样的人" },
  { id: 3, name: "南山南" },
];
const flag = false;

//    逻辑多的 模板尽量保持精简
// 如果遇到复杂的多分支的，收敛为一个函数
const getHtag = (type) => {
  if (type === 1) {
    return <h1> this is a h1 </h1>;
  }
  if (type === 2) {
    return <h2>this is a h2</h2>;
  }
  if (type === 3) {
    return <h3>this is a h3</h3>;
  }
};
const style = {
  color: "red",
  fontSize: "30px",
};
export default function App13() {
  return (
    // <div>
    //     {/* 1、jsx生成循环列表 */}
    //   <ul>
    //     {songs.map(item =>
    //     // 为了diff算法更加高效，需要添加key 只会在虚拟dom里面生效
    //       <li key={item.id}>{item.name}</li>
    //     )}
    //   </ul>

    // </div>

    // 2、条件渲染
    // <div>
    //   {/* 三元表达式 */}
    //   {flag ? <span>this is a span1</span> : null}
    //   {/* && */}
    //   {
    //     //    用&&时，只有前面的为true后面的才会执行,为false时后面的就不执行了
    //     true && <span>this is a span2</span>
    //   }
    // </div>

    // 3、逻辑复杂时，收敛为一个函数
    //    <div>
    //        {getHtag(1)}
    //        {
    //            getHtag(2)
    //        }
    //        {getHtag(3)}
    //    </div>

    // 4、样式处理
    <div>
      <span style={{ color: "red", fontSize: "30px" }}>this is a span</span>
      <hr />
      <span style={style}>this is a span too</span>
      <span className="active">测试类名样式</span>
      <hr />
      <span className={flag?'active':''}>动态类名控制</span>
    </div>
  );
}
