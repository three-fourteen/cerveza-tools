import React, { Component } from "react"

import { NumericField, Button } from "../form"

import { checkVal, parseFloatEx, round } from "../../helpers"

class Hydrometer extends Component {
	constructor(props) {
		super(props)

		this.state = { hydrometer: "", temp: "", cTemp: "", cHydrometer: null }
	}

	CalculateTempCorrection = temp => {
		return 1 - (temp + 288.9414) / (508929.2 * (temp + 68.12963)) * Math.pow(temp - 3.9863, 2)
	}

	hydrometerCorrection = () => {
		const { hydrometer, temp, cTemp } = this.state
		if (!checkVal(hydrometer, "Lectura densidad")) return
		if (!checkVal(temp, "Temperatura")) return
		if (!checkVal(cTemp, "Temperatura ajuste densimetro")) return

		let hydrometerParsed = parseFloatEx(hydrometer)
		if (hydrometerParsed.toString().indexOf(".") === -1) hydrometerParsed = hydrometerParsed / 1000
		let tempParsed = parseFloatEx(temp)
		let cTempParsed = parseFloatEx(cTemp)

		var value = round(
			hydrometerParsed +
				(this.CalculateTempCorrection(cTempParsed) / this.CalculateTempCorrection(tempParsed) - 1),
			3
		)
		this.setState({ cHydrometer: value })
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({ hydrometer: "", temp: "", cTemp: "", cHydrometer: "" })
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
					placeholder="ej: 1.040 o 1040"
					value={hydrometer}
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
				<Button onClick={this.hydrometerCorrection} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default Hydrometer
