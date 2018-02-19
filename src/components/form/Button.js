import React, { Component } from "react"
import PropTypes from "prop-types"
import "./button.css"

class Button extends Component {
	constructor(props) {
		super(props)
		let btnProps = {}
		if (props.disabled) {
			btnProps.disabled = "disabled"
		}

		this.state = { btnProps: btnProps }
	}

	render() {
		const { type, label, style, onClick } = this.props

		return (
			<button {...this.state.btnProps} onClick={onClick} type={type} className={`btn btn-${style}`}>
				{label}
			</button>
		)
	}
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	style: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
}

Button.defaultProps = {
	type: "button",
	style: "primary",
	disabled: false
}

export default Button
