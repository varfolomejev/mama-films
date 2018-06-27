export default function (state = [], action) {
	if(action.type === "ADD_FILM") {
		return [
			...state,
			action.name
		];
	} else if(action.type === "DELETE_FILM") {
		return state;
	}
	return state;
}
