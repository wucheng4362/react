import React, { Component } from 'react'
import './index.css'

const Item=(props)=>{
  const {listItem,deleteItem,toggleTodo}=props

    return (
      <li>
          <label>
              <input type="checkbox" checked={listItem?.checked} onChange={()=>{
                toggleTodo(listItem?.id)
              }}/>
              <span>{listItem?.name}</span>
              <button className="btn btn-danger" style={{display:'none'}} onClick={()=>deleteItem(listItem?.id)}>delete</button>
          </label>
      </li>
    )

}

export default Item;
