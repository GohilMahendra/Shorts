


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";


import thunk from "redux-thunk";
import CommentReducer from "../Reducers/CommentReducer";
import CreaterReducer from "../Reducers/CreaterReducer";
import HomeFeedReducer from "../Reducers/HomeFeedReducer";
import ProfileReducer from "../Reducers/ProfileReducer";
import SearchReducer from "../Reducers/SearchReducer";
import SongReducer from "../Reducers/SongReducer";
import TagReducer from "../Reducers/TagReducer";

 const rootReducer=combineReducers
 (
     {
       
         Search:SearchReducer,
         Home:HomeFeedReducer,
         Creater:CreaterReducer,
         Comment:CommentReducer,
         Tags:TagReducer,
         Songs:SongReducer,
         Profile:ProfileReducer
      
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

