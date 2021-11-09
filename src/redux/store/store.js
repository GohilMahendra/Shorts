


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";


import thunk from "redux-thunk";
import CommentReducer from "../Reducers/CommentReducer";
import HomeFeedReducer from "../Reducers/HomeFeedReducer";
import ProfileReducer from "../Reducers/ProfileReducer";
import SearchReducer from "../Reducers/SearchReducer";
import TagReducer from "../Reducers/TagReducer";

 const rootReducer=combineReducers
 (
     {
       
         Search:SearchReducer,
         Home:HomeFeedReducer,
         Comment:CommentReducer,
         Tags:TagReducer,
         Profile:ProfileReducer
      
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

