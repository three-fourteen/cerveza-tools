import React, { Component } from "react"
import t from "prop-types"
import "./InputField.css"

class InputField extends Component {
	static propTypes = {
		type: t.string
	}
	static defaultProps = {
		type: "text"
	}

	render() {
		const {
			label,
			name,
			placeholder,
			type,
			value,
			handleChange,
			handleBlur,
			handleFocus,
			handleKeyDown,
			hideLabel
		} = this.props
		const labelClass = hideLabel ? "sr-only " : ""
		return (
			<div className="form-group">
				<label className={labelClass + "form-label"} htmlFor={name}>
					{label}
				</label>
				<input
					className="input-field"
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onInput={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					onKeyDown={handleKeyDown}
				/>
			</div>
		)
	}
}

export default InputField
