import { combineReducers } from 'redux'
import videos from "./videos";
import videosSearch from "./videosSearch";
import videosCounter from "./videosCounter";


export default combineReducers({
	videos,
	videosSearch,
	videosCounter
});
