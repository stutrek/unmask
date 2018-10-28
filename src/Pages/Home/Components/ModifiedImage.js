//@flow
import React from 'react';

import tinycolor from 'tinycolor2';

import { ImageState } from '../../../actions/image';

interface State {
	image: ImageState,
	dataUrl: string
}

interface Props {
	image: ImageState,
	imageActions: any
}

function getDataUrl (props) {

	let { image } = props;
	let { upload } = image;

	let canvas = document.createElement('canvas');
	canvas.width = upload.width;
	canvas.height = upload.height;


	// the grey context is used to determine the luminosity of the
	// lightest and darkest, then is used to determine the opacity.
	let greyCanvas = document.createElement('canvas');
	greyCanvas.width = upload.width;
	greyCanvas.height = upload.height;

	let greyContext = greyCanvas.getContext('2d');
	greyContext.filter = 'grayscale(100%)';

	greyContext.fillStyle = upload.lightest;
	greyContext.fillRect(0, 0, 1, 1);
	const lightest: number = greyContext.getImageData(0, 0, 1, 1).data[0];

	greyContext.fillStyle = upload.darkest;
	greyContext.fillRect(0, 0, 1, 1);
	const darkest: number = greyContext.getImageData(0, 0, 1, 1).data[0];

	greyContext.putImageData(upload.imageData, 0, 0);
	greyContext.drawImage(greyCanvas, 0, 0);

	let ctx = canvas.getContext('2d');
	ctx.fillStyle = image.color;
	ctx.fillRect(0, 0, upload.width, upload.height);

	const imageData = ctx.getImageData(0, 0, upload.width, upload.height);

	const colorRange = lightest - darkest;
	const multiplier = 255 / colorRange;
	const adjustColor = value => (value - darkest) * multiplier;

	const { data } = greyContext.getImageData(0, 0, upload.width, upload.height);
	for (let i = 0; i < data.length; i += 4) {
		let alpha = adjustColor(data[i]);
		imageData.data[i+3] = 255 - alpha;
	}

	ctx.putImageData(imageData, 0, 0);

	return canvas.toDataURL('image/png');
}

export default class ModifiedImage extends React.Component<Props, State> {
	state = {
		image: this.props.image,
		dataUrl: getDataUrl(this.props)
	};

	static getDerivedStateFromProps(props: Props, state: State): ?State  {
		if (!state || props.image !== state.image) {
			return {
				image: props.image,
				dataUrl: getDataUrl(props)
			};
		}
		return null;
	}
	shouldComponentUpdate (nextProps: Props) {
		return nextProps.image !== this.props.image;
	}

	handleColorChange = (event: SyntheticEvent<HTMLInputElement>) => {
		let value = event.currentTarget.value;
		this.props.imageActions.changeColor(this.props.image.id, value);
	}

	render () {
		let { image } = this.props;
		let { upload } = image;
		const width = upload.width / (72 / upload.ppi);
		const height = upload.height / (72 / upload.ppi);

		return <div>
			<h3>
				{upload.name} - <input
					type="color"
					value={image.color}
					onChange={this.handleColorChange}
				/>
			</h3>
			<a href={this.state.dataUrl} download={upload.name}>
				<img src={this.state.dataUrl} width={width} height={height} />
			</a>
		</div>
	}
}
