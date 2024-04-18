// 函数式组件的第二个钩子函数 useEffect 相当于mounted 在这里通常进行数据请求
import {useState,useEffect} from 'react'

export default function App6() {
    const [num1,setNum1]=useState(1);
    const [num2,setNum2]=useState(1)
    // 模拟mounted,一般在这个位置写ajax
    useEffect(()=>{
      console.log("挂载完成")
    })
    //模拟updated
    useEffect(()=>{
        console.log('num1更新了')
    },[num1])
    // useEffect(callback,[]) 数组里面填的变量就是它要监听的,
    // 当要检测的是页面中的所有变量时，一是将变量都填写到数组中，二是直接删掉数组
    // 当不想检测页面中任何数据的更新，可以直接给个空数组

    // 模拟beforeDestroy，一般在这里处理脏数据或者垃圾回收
    useEffect(()=>{
        return ()=>{
          console.log('销毁阶段')
        }
    })
  return (
    <>
        <h2>数字1为：{num1}</h2>
        <button onClick={()=>setNum1(num1+1)}>累加</button>
        <hr />
        <h2>数字2为：{num2}</h2>
        <button onClick={()=>setNum2(num2+1)}>累加</button>
    </>
  )
}
