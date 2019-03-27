import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { evaporationCalc } from "../../calculators"

const initialState = { 
    densityBefore: "", 
    volume: "", 
    timeValue: "", 
    densityAfter: "", 
    evaporationResult: null, 
    volumeEevaporationResult: null 
}

class Evaporation extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { densityBefore, volume, timeValue, densityAfter } = this.state
		const newState = evaporationCalc(densityBefore, volume, timeValue, densityAfter)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({ ...initialState })
	}

	render() {
		const { densityBefore, volume, timeValue, densityAfter, evaporationResult, volumeEevaporationResult } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Densidad antes de hervir"
					name="densityBefore"
					handleInputChange={this.handleChange}
					placeholder="ej: 1040"
					value={densityBefore}
					maxLength={4}
				/>
				<NumericField
					label="Volumen antes de hervir (litros)"
					name="volume"
					handleInputChange={this.handleChange}
					placeholder="ej: 30"
					value={volume}
				/>
				<NumericField
					label="Tiempo de hervido (minutos)"
					name="timeValue"
					handleInputChange={this.handleChange}
					placeholder="Ej: 60"
					value={timeValue}
				/>
				<NumericField
					label="Densidad después de hervir"
					name="densityAfter"
					handleInputChange={this.handleChange}
					placeholder="ej: 1050"
					value={densityAfter}
					maxLength={4}
				/>
				{evaporationResult && (
					<p>
						La perdida por evaporación es: <strong>{evaporationResult}</strong>L/h
					</p>
				)}
				{volumeEevaporationResult && (
					<p>
						El volumen después de hervir es: <strong>{volumeEevaporationResult}</strong>L
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default Evaporation
