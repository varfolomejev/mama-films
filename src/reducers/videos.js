export default function (state = [], action) {
	switch (action.type) {
		case "ADD_VIDEO":
			return [
				...state,
				action.video
			];
		case "SET_VIDEOS":
			return action.videos;
		case "DELETE_VIDEO":
			return state.filter(video => video.id !== action.video.id);
		default:
			return state;
	}
}
