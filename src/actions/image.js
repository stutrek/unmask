//@flow
import exif from 'exif-js';
import tinycolor from 'tinycolor2';

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const CHANGE_COLOR = 'CHANGE_COLOR';

export interface Upload {
	imageData: ImageData,
	ppi: number,
	width: number,
	height: number,
	name: string,
	lightest: string,
	darkest: string,
}

export interface ImageState {
	id: string,
	upload: Upload,
	brightness: number,
	color: string,
	uploadDate: Date
}

export const uploadImage = (file: File, dataUrl: string) => (dispatch: Function) => {
	let img = new Image();
	img.onload = () => {
		const canvas = document.createElement('canvas');
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;

		let ctx = canvas.getContext('2d');
		//ctx.filter = 'grayscale(100%)';
		ctx.drawImage(img, 0, 0);

		const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
		const { data } = imageData;
		const extremes = {
			lightest: tinycolor({r: data[0], g: data[1], b: data[2]}),
			darkest: tinycolor({r: data[0], g: data[1], b: data[2]})
		};
		for (let i=4; i < data.length; i += 4) {
			const color = tinycolor({r: data[i], g: data[i+1], b: data[i+2]});
			if (color.getBrightness() > extremes.lightest.getBrightness()) {
				extremes.lightest = color;
			}
			if (color.getBrightness() < extremes.darkest.getBrightness()) {
				extremes.darkest = color;
			}
		}

		exif.getData(img, function () {
			let exifData = exif.getAllTags(this);
			dispatch({
				type: UPLOAD_IMAGE,
				payload: {
					imageData,
					ppi: exifData.XResolution || 72,
					name: file.name.replace(/\.\w+$/, ''),
					width: img.naturalWidth,
					height: img.naturalHeight,
					lightest: '#' + extremes.lightest.toHex(),
					darkest: '#' + extremes.darkest.toHex()
				}
			});
		});
	};
	img.src = dataUrl;
};

export const changeColor = (id, color) => ({
	type: CHANGE_COLOR,
	payload: {
		id,
		color
	}
});
