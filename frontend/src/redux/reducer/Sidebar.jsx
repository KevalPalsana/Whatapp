import {Get_task} from "../action/Sidebar";

const initialState= {
    data:[]
};

const sidebarReducer = (state= initialState, action)=>{
    switch(action.type){
        case Get_task:
            return{
                ...state,
                data: action.payload
            }
        case "SET_PROFILE":
            return {
              ...state,
              profile: action.payload
            };
        default:
            return state;
    }
}

export default sidebarReducer;