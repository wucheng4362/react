import React from 'react'
const msg='你好世界'
let flag=true; //true时表示粉色，false时表示蓝色
const mystyle={backgroundColor:'skyblue'}
let arr=['刘备','关羽','张飞']
export default class App1 extends React.Component{
    render(){
        // js里面写() 代表里面 要写html （）可写可不写
        return(
            // 要有个根标签 react有一个空标签
            <>
                <h2>{msg}</h2>

                {/* 这里进行注释时，产生{}是表明这里把它当作js语言来编译了 */}
                <hr />
                <label htmlFor="username">用户名：</label>
                <input type="text" id="username"/>
                <div className="box"></div>
                <hr />
                <div style={{backgroundColor: flag? 'pink':'blue'}}>内容内容</div>
                <div style={mystyle}>内容内容</div>

                {/* for循环用法  子项要写key*/}
                <ul>
                    {/* html里面要写js用{} 
                    React中的列表循环有且只有map可以使用，只有map有返回值，forEach没有*/}
                {
                    arr.map((item,index)=><li key={index}>{item}</li>)
                }
                </ul>
               
            </>
        )
    }
}

