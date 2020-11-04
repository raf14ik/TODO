import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'; //import material-ui
import './App.css';
import Todo from './Todo';//import Todo.js
import db from './firebase';//import db
import firebase from 'firebase'; //import firebase
import ImageToDo from './todo.png';// import img

function App() {
 const [todos, setTodos] = useState([]);// put state in the list Todo
 const [input, setInput] = useState(''); //show input value

 //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
 useEffect(() => {
 // this code here ... fires when the app.js loads
 db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(Snapshot =>{
   setTodos(Snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))//import data from firebase 'todo is Field in firebase/todos is collection'
 })
 }, []);
 
 const addTodo=(event) => {
   //this will fire off when we click the button!
   event.preventDefault(); // this will stop refresh
   db.collection('todos').add({
     todo: input,
     timestamp: firebase.firestore.FieldValue.serverTimestamp()
   })
   setInput(''); //clear up the input after clicking add Todo button
  }


 return (
    <div className="App">
     <img src={ImageToDo} alt="ToDoList" className="Image"/>
      <form>
        <FormControl>
          <InputLabel>Write a ToDo</InputLabel>
          <Input value={input} onChange={event =>setInput (event.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add To do</Button>
      </form>
     <ul>
       {todos.map(todo => (
         <Todo todo={todo} />
        ))}
     </ul>

    </div>
  );
}

export default App;
