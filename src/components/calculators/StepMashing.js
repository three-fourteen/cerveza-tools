import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { restCalc } from "../../calculators"

const initialState = { curtemp: "", tartemp: "", thick: "", weight: "", restCalcValue: null, error: null }

class StepMashing extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { curtemp, tartemp, thick, weight } = this.state
		try {
			const newState = restCalc(weight, thick, curtemp, tartemp)
			this.setState({ ...newState, error: null })
		} catch (e) {
			this.setState({ error: e.message })
		}
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({ ...initialState })
	}

	render() {
		const { curtemp, tartemp, thick, weight, restCalcValue, error } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Peso del grano en Kg"
					name="weight"
					handleInputChange={this.handleChange}
					placeholder="ej: 5"
					value={weight}
					maxLength={4}
				/>
				<NumericField
					label="Litros de agua por Kg de grano"
					name="thick"
					handleInputChange={this.handleChange}
					placeholder="ej: 3"
					value={thick}
					maxLength={4}
				/>
				<NumericField
					label="Temperatura actual (ºC)"
					name="curtemp"
					handleInputChange={this.handleChange}
					placeholder="ej: 50"
					value={curtemp}
					maxLength={4}
				/>
				<NumericField
					label="Temperatura objetivo (ºC)"
					name="tartemp"
					handleInputChange={this.handleChange}
					placeholder="ej: 60"
					value={tartemp}
					maxLength={4}
				/>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{restCalcValue && (
					<p>
						Litros de agua hirviendo (100ºC) que se deben añadir: <strong>{restCalcValue}</strong>
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default StepMashing
