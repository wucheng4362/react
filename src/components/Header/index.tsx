import React, { Component } from 'react'
import './index.css'

const Header =(props:{
  addTodo:any;
})=>{
  const {addTodo}=props;
     // 处理input enter事件
     const handleKeyUp = (e) => {
      if (e.keyCode !== 13) return
      const todoObj = {
          id: Math.floor(10000000 * Math.random()),
          name: e.target.value,
          check: false
      }
      addTodo(todoObj)
      e.target.value = ""
  }

    return (
      <div className="todo-header">
          <input type="text" placeholder='请输入你的任务名称' onKeyUp={(e) => handleKeyUp(e)} />
      </div>
    )
}

export default Header;
