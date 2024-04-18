import React,{useState,createContext,useContext}from 'react'
// Context另外一种更简洁的用法
const Context=createContext()
function Child(){
    const ctx=useContext(Context);
    return (
        <>
        <h2>{ctx.num}</h2>
        <button onClick={()=>ctx.setNum(456)}>修改num</button>
        </>
    )
}
const Father=()=>(<Child/>)
export default function App9() {
    const [num,setNum]=useState(123)
  return (
    <Context.Provider value={{num,setNum}}>
    <Father />
    </Context.Provider>
  )
}
