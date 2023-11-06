import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = text => {
    return {
        type : ADD_TODO,
        text
    }
}
const deleteTodo = id => {
    return {
        type : DELETE_TODO,
        id
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case ADD_TODO : 
            return [{text : action.text, id: Date.now() }, ...state];
        case DELETE_TODO : 
            //console.log(state);
            //console.log(action);
            console.log(state.filter(todo => todo.id !== action.id));
            return state.filter(todo => todo.id !== action.id);
        default : 
            return state;
    }
}
const store = createStore(reducer);

const dispatchAddTodo = text => {
    store.dispatch(addTodo(text));
}
const dispatchDeleteTodo = e => {
    const id = parseInt(e.target.parentNode.id);
    //console.log(e.target.parentNode);
    store.dispatch(deleteTodo(id));
}

const paintTodo = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(element => {
       const li = document.createElement("li");
       const btn = document.createElement("button");
       btn.innerText = "DEL";
       btn.addEventListener("click", dispatchDeleteTodo);
       
       li.id = element.id;
       li.innerText = element.text;
       li.appendChild(btn); 
       ul.appendChild(li); 
       
    });
}


//store.subscribe(() => console.log(store.getState()));
store.subscribe(paintTodo);

const createTodo = toDo => {
    const li = document.createElement("li");

    li.innerText = toDo;
    ul.appendChild(li);
}


const onSubmit = element => {
    element.preventDefault();
    const toDo = input.value;
    input.value = "";
    //createTodo(toDo);  Vanilla js
    dispatchAddTodo(toDo);
}

form.addEventListener("submit", onSubmit);