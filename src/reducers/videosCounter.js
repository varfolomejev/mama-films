export default function (state = 0, action) {
	switch (action.type) {
		case "SET_VIDEOS_COUNT":
			return action.count;
		default:
			return state;
	}
}
