//@flow
import { Action } from 'redux';
import uuid from 'uuid';

import { UPLOAD_IMAGE, ImageState, CHANGE_COLOR } from '../actions/image';

const initialState: ImageState[] = [];

export default (state: ImageState[]=initialState, action: Action) => {
	switch (action.type) {
		case UPLOAD_IMAGE:
			state = [{
				id: uuid(),
				color: action.payload.darkest,
				brightness: 0,
				upload: action.payload,
				uploadDate: new Date()
			}, ...state];
			break;

		case CHANGE_COLOR:
			state = state.map(image => {
				if (image.id === action.payload.id) {
					return {
						...image,
						color: action.payload.color
					}
				}
				return image;
			});
	}
	return state;
};
