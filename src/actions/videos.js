export const getVideos = () => dispatch => {
	fetch('/search')
		.then(response => {
			return response.json();
		})
		.then(videos => {
			dispatch({type: "SET_VIDEOS", videos})
		})
}

export const getVideosCount = () => dispatch => {
	fetch('/count')
		.then(response => {
			return response.json();
		})
		.then(result => {
			dispatch({type: "SET_VIDEOS_COUNT", count: result.count});
		})
}

export const findVideos = (videoName) => dispatch => {
	fetch('/search?name=' + videoName)
		.then(response => {
			return response.json();
		})
		.then(videos => {
			dispatch({type: "SET_VIDEOS", videos});
		})
}

export const addVideo = (videoName) => dispatch => {
	fetch('/create', {
			method: "post",
			body: JSON.stringify({name: videoName}),
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			return response.json();
		})
		.then(video => {
			dispatch({type: "ADD_VIDEO", video});
		})
}

export const deleteVideo = (videoId) => dispatch => {
	fetch('/', {
		method: "delete",
		body: JSON.stringify({id: videoId}),
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			return response.json();
		})
		.then(video => {
			dispatch({type: "DELETE_VIDEO", video});
		})
}
