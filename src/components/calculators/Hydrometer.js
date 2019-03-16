import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { hydrometerCorrection } from "../../calculators"

const initialState = { hydrometer: "", temp: "", cTemp: "", cHydrometer: null }

class Hydrometer extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { hydrometer, temp, cTemp } = this.state
		const newState = hydrometerCorrection(hydrometer, temp, cTemp)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({ ...initialState })
	}

	render() {
		const { hydrometer, temp, cTemp, cHydrometer } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Densidad"
					name="hydrometer"
					handleInputChange={this.handleChange}
					placeholder="ej: 1040"
					value={hydrometer}
					maxLength={4}
				/>
				<NumericField
					label="Temperatura (ºC)"
					name="temp"
					handleInputChange={this.handleChange}
					placeholder="ej: 67"
					value={temp}
				/>
				<NumericField
					label="Temperatura ajuste densimetro (ºC)"
					name="cTemp"
					handleInputChange={this.handleChange}
					placeholder="Ej: 20"
					value={cTemp}
				/>
				{cHydrometer && (
					<p>
						La densidad corregida es: <strong>{cHydrometer}</strong>
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default Hydrometer
