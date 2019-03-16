import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { alcoholCalc } from "../../calculators"

const initialState = { DO: "", DF: "", alcoholCalcValue: null }

class Alcohol extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
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
		this.setState({ ...initialState })
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
