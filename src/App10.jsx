import React ,{useState,useRef}from 'react'

export default function App10() {
    const [value,setValue]=useState("asd");
    const element=useRef(null)
    // const inputChange=(e)=>{
    //     // 获取触发事件的元素 拿到input
    //     console.log(e.target.value)
    //     setValue(e.target.value)
    // }
  return (
    <div>
       <h3>受控组件</h3>
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
        <button onClick={()=>console.log(value)}>获取input的值</button>
        <hr />
        <h3>不受控组件</h3>
        <input type="text" ref={element}/>
        <button onClick={()=>console.log(element.current.value)}>获取input的值</button>
    </div>
  )
}
/* 
受控组件和不受控组件
    --只存在于表单元素
    所谓的受控组件就是表单元素的value需要通过state(或useState)来定义
    不受控组件意味着表单元素无法通过state获取,只能使用ref(或useRef)来获取
*/
