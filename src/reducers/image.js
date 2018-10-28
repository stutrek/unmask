//@flow
import { Action } from 'redux';

import { UPLOAD_IMAGE, ImageState } from '../actions/image';

const initialState: ImageState = {
	upload: null,
	brightness: 0,
	color: '#000000'
};

export default (state: ImageState=initialState, action: Action) => {
	switch (action.type) {
		case UPLOAD_IMAGE:
			state = {
				...state,
				upload: action.payload
			};
	}
	return state;
};
