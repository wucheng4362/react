import React,{useState} from 'react'

// 父子通信 父传子
// 子组件 
function Child(props){
    return(
    <>
     <h2>子组件--{props.num}</h2>
     <button onClick={()=>props.setNum(789)}>修改num</button>
    </>

    )
    
}
// 父组件
function Father(props){
    return <Child num={props.num} setNum={props.setNum}/>
}
// 顶级组件
export default function App7() {
    const [num,setNum]=useState(123)
    // const changeNumFn=(arg)=>setNum(arg)
  return <Father num={num} setNum={setNum}/>
}
