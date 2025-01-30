'use strict'

import React, { CSSProperties } from 'react'
import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'

class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
        color: this.props.color || {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },
    }

    colors = [
        '#FF0000',
        '#FF4500',
        '#FF8C00',
        '#FFD700',
        '#FFFF00',
        '#D7FF00',
        '#8CFF00',
        '#45FF00',
        '#00FF00',
        '#00FF45',
        '#00FF8C',
        '#00FFD7',
        '#00FFFF',
        '#00D7FF',
        '#008CFF',
        '#0045FF',
        '#0000FF',
        '#4500FF',
        '#8C00FF',
        '#D700FF',
        '#FF00FF',
        '#FFFFFF',
        '#000000',
    ]

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }

    handleChange = (color) => {
        this.setState({ color: color.rgb })
        this.props.onChange(color)
    }

    styles = reactCSS({
        default: {
            container: {
                position: 'relative',
            },
            color: {
                width: '20px',
                height: '20px',
                borderRadius: '99px',
                background: `rgb(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b})`,
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                right: '-8px',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    })

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.color} onClick={this.handleClick} />
                {this.state.displayColorPicker ? (
                    <div style={this.styles.popover}>
                        <div
                            style={this.styles.cover}
                            onClick={this.handleClose}
                        />
                        <CompactPicker
                            colors={this.colors}
                            triangle={'top-right'}
                            color={this.state.color}
                            onChange={this.handleChange}
                        />
                    </div>
                ) : null}
            </div>
        )
    }
}

export default ColorPicker
