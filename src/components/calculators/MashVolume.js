import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { mashVolCalc } from "../../calculators"

const initialState = { thick: "",  weight: "", mashVolCalcValue: null }

class MashVolume extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { thick, weight } = this.state
		const newState = mashVolCalc(weight, thick)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({...initialState})
	}

	render() {
		const { thick, weight, mashVolCalcValue } = this.state
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
				{mashVolCalcValue && (
					<p>
						El macerado ocupara un volumen de: <strong>{mashVolCalcValue}</strong> L
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default MashVolume
