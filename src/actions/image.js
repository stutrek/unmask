//@flow
import exif from 'exif-js';
import tinycolor from 'tinycolor2';

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export interface Upload {
	data: Uint8ClampedArray,
	ppi: number,
	width: number,
	height: number,
	name: string,
	lightest: tinycolor,
	darkest: tinycolor
}

export interface ImageState {
	upload: Upload | null,
	brightness: number,
	color: string
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

		const { data } = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
		const extremes = {
			lightest: null,
			darkest: null
		};
		for (let i=0; i < data.length; i += 4) {
			const color = tinycolor({r: data[i], g: data[i+1], b: data[i+2]});
			if (extremes.lightest === null || color.getBrightness() > extremes.lightest.getBrightness()) {
				extremes.lightest = color;
			}
			if (extremes.darkest === null || color.getBrightness() < extremes.darkest.getBrightness()) {
				extremes.darkest = color;
			}
		}

		exif.getData(img, function () {
			let exifData = exif.getAllTags(this);
			dispatch({
				type: UPLOAD_IMAGE,
				payload: {
					data: data,
					ppi: exifData.XResolution || 72,
					name: file.name.replace(/\.\w+$/, ''),
					width: img.naturalWidth,
					height: img.naturalHeight,
					...extremes
				}
			});
		});
	};
	img.src = dataUrl;
};
