import React from 'react';

import styles from './styles/layout.css';

export default class LayoutWithHeader extends React.Component {
	render () {
		return <div className={styles.layout}>
			<div className={styles.header}>
				Unmask
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
