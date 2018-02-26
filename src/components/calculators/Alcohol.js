import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { alcoholCalc } from "../../calculators"

class Alcohol extends Component {
	constructor(props) {
		super(props)

		this.state = { DO: "", DF: "", cHydrometer: null }
	}

	CalculateTempCorrection = temp => {
		return 1 - (temp + 288.9414) / (508929.2 * (temp + 68.12963)) * Math.pow(temp - 3.9863, 2)
	}

	calculate = () => {
		const { DO, DF } = this.state
		const newState = alcoholCalc(DO, DF)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({ DO: "", DF: "", cHydrometer: "" })
	}

	render() {
		const { DO, DF, alcoholCalcValue, attenuationCalcValue } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Densidad inicial"
					name="DO"
					handleInputChange={this.handleChange}
					placeholder="ej: 1045"
					value={DO}
					maxLength={4}
				/>
				<NumericField
					label="Densidad final"
					name="DF"
					handleInputChange={this.handleChange}
					placeholder="ej: 1012"
					value={DF}
					maxLength={4}
				/>
				{alcoholCalcValue && (
					<p>
						Volumen de alcohol: <strong>{alcoholCalcValue}</strong>
						<br />
						Atenuación: <strong>{attenuationCalcValue}</strong>
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default Alcohol
