import React from 'react';

import styles from './styles/layout.css';

export default class LayoutWithHeader extends React.Component {
	render () {
		return <div className={styles.layout}>
			<div className={styles.header}>
				<h1>Unmask</h1>
				<div className={styles.subhead}>Remove the background from an icon or logo.</div>
				<div className={styles.note}>Note: the image is not uploaded to any server. It never leaves your computer.</div>
			</div>
			<div className={styles.content}>
				{this.props.children}
			</div>
			<div className={styles.footer}>
				&copy; 2018 Stu Kabakoff
			</div>
		</div>;
	}
}
