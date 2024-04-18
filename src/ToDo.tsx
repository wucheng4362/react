import React from 'react'
import create from 'zustand';
import Header from './components/Header'
import {Footer} from './components/Footer'
import List from './components/List'
import './ToDo.css'

interface TodoItem{
  id:string;
  name:string;
  check:boolean;
}

interface TodoState{
  todoList:Array<TodoItem>;
  addTodo:(v:TodoItem)=>void;
  toggleTodo:(id:string)=>void;
  deleteItem:(id:string)=>void;
  clearAllDone:()=>void;
}

const useListstore=create<TodoState>(set=>({
  todoList:[],
  addTodo:(todoItem:TodoItem)=>set(state=>({
    todoList:state.todoList.push(todoItem)
  })),
  toggleTodo:(id:string)=>set(state=>({
    todoList:state.todoList.map(item=>{
      if(item?.id===id){
        return {
          ...item,
          check:!item.check
        }
      }
      return item;
    })
  })),
  deleteItem:(id:string)=>set(state=>({
    todoList:state.todoList.filter(item=>item.id===id)
  })),
  clearAllDone:()=>set(state=>({
    todoList:state.todoList.filter(item=>item.check)
  }))
}))

const ToDo =() => {
  const { todoList, addTodo, toggleTodo,clearAllDone,deleteItem } = useListstore((state) => ({
    todoList: state.todoList,
    addTodo: state.addTodo,
    toggleTodo: state.toggleTodo,
    clearAllDone: state.clearAllDone,
    deleteItem:state.deleteItem
  }));

    return (
      <div className="todo-container">
          <div className="todo-wrap">
                <Header addTodo={addTodo}/>
                <List todoList={todoList} toggleTodo={toggleTodo} deleteItem={deleteItem}/>
                <Footer todoList={todoList}  clearAllDone={clearAllDone}/>
          </div>
      </div>
    )
  }

  export default ToDo;
