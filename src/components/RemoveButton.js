import React, { Component } from "react";

class RemoveButton extends Component {
	onHandleRemoveVideo() {
		this.props.onHandleRemoveVideo(this.props.video.id);
	}

	render() {
		return (
			<tr key={this.props.key}>
				<td>{this.props.video.name}</td>
				<td><a href="javascript:;" onClick={this.onHandleRemoveVideo.bind(this)}><i className="glyphicon glyphicon-trash"></i></a></td>
			</tr>
		);
	}
}

export default RemoveButton;
