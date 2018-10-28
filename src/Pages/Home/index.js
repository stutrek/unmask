import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as imageActions from '../../actions/image';

import UploadButton from '../../Components/UploadButton';
import ModifiedImage from './Components/ModifiedImage';

class HomePage extends React.Component {
	render () {
		if (this.props.image.upload) {
			return <ModifiedImage image={this.props.image} />;
		} else {
			return <div>
				Upload an image to remove the background.<br />
				<UploadButton receiveImage={this.props.imageActions.uploadImage} />
			</div>;
		}
	}
}

const mapStoreToProps = store => store;
const mapDispatchToProps = dispatch => ({
	imageActions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);
