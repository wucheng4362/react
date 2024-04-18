import React, { Component } from 'react'
import './index.css'

export const Footer =()=> {
    return (
      <div className="todo-footer">
          <label>
              <input type="checkbox" />
          </label>
          <span>
              <span>已完成0</span>/全部2
          </span>
          <button className="tn btn-danger">清除已完成任务</button>
      </div>
    )
}
