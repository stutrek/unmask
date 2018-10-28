// @flow
import React from 'react';

interface Props {
	receiveImage: Function,
	className: ?string,
	children: any
}

export default class ImageUploader extends React.Component<Props> {

	static defaultProps = {
		className: ''
	}

	receiveImage = (event: SyntheticEvent<HTMLInputElement>) => {
		const { files } = event.currentTarget;
		if (files[0]) {
			let fileReader = new FileReader();
			fileReader.onload = (e) => {
				this.props.receiveImage(files[0], e.target.result);
			};
			fileReader.readAsDataURL(files[0]);
		}
	}

	render () {
		return <label className={this.props.className}>
			<input type="file" onChange={this.receiveImage} />
			{this.props.children}
		</label>;
	}
}
