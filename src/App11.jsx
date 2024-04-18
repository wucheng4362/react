import React,{useState,memo} from 'react'
// memo 缓存组件不受父级组件的影响
// function Child(){
//     console.log(123)
//     return <div>子组件</div>
// }
// 用了memo以后该子组件就不会被反复地渲染了
const Child=memo(()=>{
    console.log(123)
    return <div>子组件</div>
})
export default function App11() {
    const [num,setNum]=useState(1);
    // 但是由于父组件的视图更新造成子组件更新，导致性能差，因此可以用memo
    return (
        <div>
            <h3>数字为：{num}</h3>
            <button onClick={()=>setNum(num+1)}>累加</button>
            <Child/>
        </div>
    )
}
