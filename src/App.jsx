import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"
import { React, useState, useEffect} from "react"
function App() {

const [todos, setTodos] = useState([
])

const [todoValue, setTodoValue] = useState("")

function persistData(newList) {
  localStorage.setItem('todos', JSON.stringify({todos:
    newList
  }))
}
function handleAddTodos(newTodo) {
  const newTodoList = [...todos, newTodo]
  persistData(newTodoList)
  setTodos(newTodoList)
}

function handleDeleteTodo(index) {
  const newToDoList = todos.filter((todo, todoIndex) => {
    return todoIndex != index
  })
  persistData(newToDoList)
  setTodos(newToDoList)
}

function handleEditTodo(index) {
  const valueToBeEdited = todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)

}

useEffect(() => {
  if (!localStorage) {
    return 
  }

  let localTodos = localStorage.getItem('todos')
  if (!localTodos) {
    return
  }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
},[])

  return (
    <>    
          <ToDoInput todoValue = {todoValue} setTodoValue = {setTodoValue} handleAddTodos = {handleAddTodos}/>
          <ToDoList handleDeleteTodo = {handleDeleteTodo} handleEditTodo = {handleEditTodo} todos = {todos}/>        
    </>
  )
}

export default App
