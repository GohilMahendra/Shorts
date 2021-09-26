


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";


import thunk from "redux-thunk";
import CommentReducer from "../reducers/CommentReducer";

 const rootReducer=combineReducers
 (
     {
       
         Comment:CommentReducer,
      
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

