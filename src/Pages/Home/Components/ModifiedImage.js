//@flow
import React from 'react';

import tinycolor from 'tinycolor2';

import { ImageState } from '../../../actions/image';

interface State {
	dataUrl: ?string
}

interface Props {
	image: ImageState
}

export default class ModifiedImage extends React.Component<Props, State> {

	constructor (props: Props) {
		super(props);

		this.state = {
			dataUrl: this.getDataUrl()
		};
	}

	shouldComponentUpdate (nextProps: Props) {
		return nextProps.image !== this.props.image;
	}

	componentDidUpdate () {
		this.setState({
			dataUrl: this.getDataUrl()
		});
	}

	getDataUrl () {
		let canvas = document.createElement('canvas');

		let { image } = this.props;
		let { upload } = image;

		canvas.width = upload.width;
		canvas.height = upload.height;

		let ctx = canvas.getContext('2d');
		ctx.fillStyle = image.color;
		ctx.fillRect(0, 0, upload.width, upload.height);

		const imageData = ctx.getImageData(0, 0, upload.width, upload.height);

		const lightest = tinycolor(upload.lightest).getBrightness();
		const darkest = tinycolor(upload.darkest).getBrightness();
		const colorRange = lightest - darkest;
		const multiplier = 255 / colorRange;
		const adjustColor = value => (value - darkest) * multiplier;

		const data = upload.data;
		for (let i = 0; i < data.length; i += 4) {
			let color = tinycolor({r: data[i], g: data[i+1], b: data[i+2]});
			let alpha = adjustColor(color.getBrightness());
			imageData.data[i+3] = 255 - alpha;
		}

		ctx.putImageData(imageData, 0, 0);

		return canvas.toDataURL('image/png');
	}

	render () {
		let { upload } = this.props.image;
		const width = upload.width / (72 / upload.ppi);
		const height = upload.height / (72 / upload.ppi);

		return <div>
			<a href={this.state.dataUrl} download={upload.name}>
				<img src={this.state.dataUrl} width={width} height={height} />
			</a>
		</div>
	}
}
