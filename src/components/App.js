import React, { Component } from "react";
import { connect } from "react-redux";
import { getVideos, getVideosCount, findVideos, addVideo, deleteVideo } from "./../actions/videos";
import RemoveButton from "./RemoveButton";

class App extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.onGetVideos();
		this.props.onGetVideosCount();
	}

	onChangeSearchInput(event) {
		this.props.onSearchVideos(event.target.value);
	}

	onClickAddVideo() {
		if(this.searchInput && this.searchInput.value.length && !this.props.videos.length) {
			this.props.onAddVideo(this.searchInput.value);
		}
	}

	onHandleRemoveVideo(id) {
		if(confirm('Do you want to delete this video?')) {
			this.props.onDeleteVideo(id);
		}
	}

	get addButtonStyles() {
		const addVideoStyles = ["input-group-addon", "add-new-video"];
		if(this.searchInput && this.searchInput.value.length && !this.props.videos.length) {
			addVideoStyles.push("available");
		}
		return addVideoStyles.join(" ");
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<p className="bg-success"></p>
						<div className="input-group">
							<input className="form-control" aria-describedby="basic-addon2" placeholder="Search for names.." onChange={this.onChangeSearchInput.bind(this)} ref={(input) => {this.searchInput = input}} />
							<span className={this.addButtonStyles} onClick={this.onClickAddVideo.bind(this)}>&nbsp;<i className="glyphicon glyphicon-plus"></i>&nbsp;</span>
						</div>
						<p id="search-errors" className="text-danger"></p>
						<br/>
						<p><i>{this.props.videosCounter} films found</i></p>
						<br/>
						<table id="films" className="table">
							<thead>
							<tr className="header">
								<th>Name</th>
								<th></th>
							</tr>
							</thead>
							<tbody>
							{this.props.videos.map((video, key) => {
								return (<RemoveButton
									key={key}
									onHandleRemoveVideo={this.onHandleRemoveVideo.bind(this)}
									video={video} />
								);
							})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => state,
	dispatch => ({
		onAddVideo: (videoName) => {
			dispatch(addVideo(videoName));
		},
		onDeleteVideo: (videoId) => {
			dispatch(deleteVideo(videoId));
		},
		onSearchVideos: (videoName) => {
			dispatch(findVideos(videoName));
		},
		onGetVideos: () => {
			dispatch(getVideos());
		},
		onGetVideosCount: () => {
			dispatch(getVideosCount());
		}
	})
)(App);
