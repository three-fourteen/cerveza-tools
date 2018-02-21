import React, { Component } from "react"

import InputField from "./InputField"
import { numberWithCommas, numberWithoutCommas } from "../../helpers"

class NumericField extends Component {
	constructor(props) {
		super(props)
		let value = props.value

		if (value) {
			value = Number(value)
			if (!Number.isInteger(value)) {
				value = value.toFixed(2)
			}
			value = numberWithCommas(value)
		} else {
			value = ""
		}

		this.state = { value: value, actualFocus: null }
	}

	componentWillReceiveProps(nextProps) {
		// Don't update if we are editing the field
		if (this.state.actualFocus === nextProps.name) {
			return
		}
		if (this.props.value !== nextProps.value) {
			let value = nextProps.value
			// Check if we are cleaning the form
			if (value !== "") {
				if (typeof value === "number") {
					value = parseFloat(value.toFixed(2))
				}
				// transform number
				value = numberWithCommas(value)
			}

			this.setState({ value: value })
		}
	}

	// Cancel non-numeric characters
	handleKeyDown = e => {
		const charCode = e.which
		const val = e.target.value + ""

		// Check if the number already has a dot, we dont want 2 dots
		if (val.indexOf(".") >= 0 && charCode === 190) {
			e.preventDefault()
			return
		}

		// Allow some keys like arrows and dot
		if ([8, 9, 46, 37, 38, 39, 40, 190].indexOf(e.which) + 1) {
			return
		}

		// Block any other characters but numbers
		const maxLength = this.props.maxLength
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			e.preventDefault()
			return
		} else if (
			val.length > maxLength ||
			(val.length == maxLength && val.indexOf(".") >= 0 && !(charCode !== 190)) ||
			(val.length == maxLength && val.indexOf(".") == -1 && charCode !== 190)
		) {
			e.preventDefault()
			return
		}
	}

	handleChange = event => {
		const { handleInputChange } = this.props
		let newValue = event.target.value
		handleInputChange && handleInputChange(newValue, event.target.name)
		this.setState({ value: newValue })
	}

	handleBlur = event => {
		let newValue = event.target.value
		// if the value is 0 or 000 ∞ replace with an empty string
		newValue = newValue.replace(/^0+/, "")
		if (newValue !== "") {
			newValue = numberWithCommas(newValue)
		}
		this.setState({ value: newValue, actualFocus: null })
	}

	handleFocus = event => {
		let newValue = event.target.value
		newValue = numberWithoutCommas(newValue)
		this.setState({ value: newValue, actualFocus: event.target.name })
	}

	render() {
		const { name, placeholder, label, disabled } = this.props
		return (
			<InputField
				label={label}
				name={name}
				placeholder={placeholder}
				value={this.state.value}
				disabled={disabled}
				handleChange={this.handleChange}
				handleBlur={this.handleBlur}
				handleFocus={this.handleFocus}
				handleKeyDown={this.handleKeyDown}
			/>
		)
	}
}

export default NumericField
