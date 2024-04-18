import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

const List =(props)=> {
  const {todoList,deleteItem}=props||{}
    return (
      <ul className="todo-main">
        {
          todoList.map(item=><Item listItem={item} deleteItem={deleteItem}/>)
        }
      </ul>
    )
}

export default List
