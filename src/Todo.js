import React, {useState} from 'react';
import './Todo.css' //import Todo.css
import { List, ListItem, ListItemAvatar, ListItemText, Button, Modal} from '@material-ui/core';//import material components
import db from './firebase'; //import firebase
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';//import icon delete
import { makeStyles } from '@material-ui/core/styles';//import style <modal>


// style <modal>
const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "32%" ,
      left: "32%" ,  
    },
  }));
function Todo(props) {
    const classes = useStyles(); 
    const [open, setOpen] = useState(false);    //<modal> default close
    const [input, setInput] = useState();

    
    const handleOpen=() => {
    //function to open <modal>
        setOpen(true);
    };

    const UpdateTodo = () => {
    //update the todo with new input
    db.collection('todos').doc(props.todo.id).set({
        todo: input
    }, { merge: true });
    setOpen(false);
    }
    
    return (
    //<modal>is a popup 
    <>
      <Modal
      open={open}
      onClose={e => setOpen(false)}
      >
          <div  className={classes.paper}>
              <h1>Update your To Do</h1>
              <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
              <Button onClick={UpdateTodo}>Update ToDo</Button>
          </div>
      </Modal>  
        <List>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy Deadline" />
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon onClick={event =>db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        </>//db.collection('todos').doc(props.todo.id).delete() delete todo from firebase 
    )
}

export default Todo
