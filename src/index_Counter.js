import { createStore } from "redux";

const addObj = document.getElementById("add");
const minusObj = document.getElementById("minus");
const countObj = document.querySelector("span");
countObj.innerText = 0;
const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (stateCount = 0, action) => {
    switch(action.type){
        case ADD : 
            return stateCount + 1;
        case MINUS : 
            return stateCount - 1;
        default : 
            return stateCount;
    }
};
const store = createStore(countModifier);


const onShow = () => {
    console.log("When state changed, here is ", store.getState());
    countObj.innerText = store.getState();
};
store.subscribe(onShow);


addObj.addEventListener("click", () => store.dispatch({type:ADD}));
minusObj.addEventListener("click", () => store.dispatch({type:MINUS}));



