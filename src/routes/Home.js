import { useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { addToDo } from "../store";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";

function Home({toDos, addtoDo}){
    

    const [text, setText] = useState("");
    function onChange(e){
        setText(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        console.log(text);
        addtoDo(text);
        setText("");
    }
    
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>ADD</button>
            </form>
            <ul>
                {toDos.map(toDo => 
                    <ToDo {...toDo} key={toDo.id} />
                )}
            </ul>
        </>
    );
}

function mapStateToProps(state, ownProps){
    return {toDos : state};
}

function mapDispatchToProps(dispatch){
    return {
        addtoDo : text => dispatch(actionCreators.addToDo(text))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);