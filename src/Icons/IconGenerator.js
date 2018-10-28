// @flow

import React from 'react';
import SVGInline from 'react-svg-inline';

import styles from './icons.css';

export default function generateIcon (src: string, type: string) {

    var defaultWidth: string;
    var defaultHeight: string;
    var iconType = type || '';
    var viewBoxResult = /viewBox="(\d+|\d+\.\d+),? (\d+|\d+\.\d+),? (\d+|\d+\.\d+),? (\d+|\d+\.\d+)"/i.exec(src);
    if (viewBoxResult) {
        let numbers = viewBoxResult.slice(1).map(parseFloat);
        defaultWidth = numbers[2];
        defaultHeight = numbers[3];
    }

    type Props = {
        height: ?string | ?number,
        width: ?string | ?number,
        className: string
    }

    return class Icon extends React.Component<Props, void> {
        static defaultProps = {
            width: defaultWidth,
            height: defaultHeight,
            className: ''
        }

        shouldComponentUpdate () {
            return false;
        }

        render () {
            let {width, height} = this.props;
            if (typeof width === 'number') {
                width = width + 'px';
            }

            if (typeof height === 'number') {
                height = height + 'px';
            }
            if (iconType === 'no_fill') {
                return (
                    <SVGInline
                        svg={src}
                        {...this.props}
                        width={width}
                        height={height}
                        className={`${styles.iconNoFill} ${this.props.className}`.trim()}
                    />
                );
            } else {
                return (
                    <SVGInline
                        svg={src}
                        {...this.props}
                        width={width}
                        height={height}
                        className={`${styles.icon} ${this.props.className}`.trim()}
                    />
                );
            }
        }
    };
 }
