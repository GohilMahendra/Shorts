


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";


import thunk from "redux-thunk";
import CommentReducer from "../Reducers/CommentReducer";
import ProfileReducer from "../Reducers/ProfileReducer";
import TagReducer from "../Reducers/TagReducer";

 const rootReducer=combineReducers
 (
     {
       
         Comment:CommentReducer,
         Tags:TagReducer,
         Profile:ProfileReducer
      
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

