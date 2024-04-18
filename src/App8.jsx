import React, { useState, createContext } from 'react'

// Context 跨级传信
// 创建上下文空间(Provider,Consumer)
const NumContext = createContext();
function Child() {
    return (
        <NumContext.Consumer>
            {
                ({num,setNum}) => (
                    <>
                        <h2>{num}</h2>
                        <button onClick={()=>setNum(456)}>修改num</button>
                    </>
                    )
               
           }
        </NumContext.Consumer>

    )

}
// 父组件
function Father(props) {
    return <Child />
}
// 顶级组件
export default function App8() {
    const [num, setNum] = useState(123)
    // const changeNumFn=(arg)=>setNum(arg)
    return (
        <NumContext.Provider value={{num,setNum}}>
            <Father />
        </NumContext.Provider>
    )
}
