import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as imageActions from '../../actions/image';

import UploadButton from '../../Components/UploadButton';
import ModifiedImage from './Components/ModifiedImage';

import styles from './home.css';

class HomePage extends React.Component {
	render () {
		return <div className={styles.container}>
			<div>
				Upload an image to remove the background.<br />
				<UploadButton receiveImage={this.props.imageActions.uploadImage} />
			</div>
			<div className={styles.images}>
				{this.props.images.map(image => <ModifiedImage key={image.id} image={image} />)}
			</div>
		</div>;
	}
}

const mapStoreToProps = store => store;
const mapDispatchToProps = dispatch => ({
	imageActions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);
