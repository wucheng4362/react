
// 函数式组件 rfc
// useState的使用
/*
1、没有生命周期
2、没有this
3、没有state

Hooks(钩子 生命周期函数)
      -react自定义hook 
      -开发人员自定义hook
*/
import { useState } from 'react'

export default function App5() {
    // Hook只能用在组件函数中的最顶层
    const [msg, setMsg] = useState('你好世界')
    return (
        <>
            <h2>{msg}</h2>
            <button onClick={() => setMsg('hello world')}>msg</button>
        </>
    )
}
