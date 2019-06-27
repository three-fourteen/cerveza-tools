import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { initialCalc } from "../../calculators"

const initialState = { 
    volume: "", 
    timeValue: "", 
    densityAfter: "", 
    evaporation: "", 
    densityResult: null, 
    volumeResult: null 
}

class InitialDensity extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { evaporation, volume, timeValue, densityAfter } = this.state
		const newState = initialCalc(evaporation, volume, timeValue, densityAfter)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({ ...initialState })
	}

	render() {
		const { volume, timeValue, densityAfter, evaporation, densityResult, volumeResult } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Densidad después de hervir"
					name="densityAfter"
					handleInputChange={this.handleChange}
					placeholder="ej: 1060"
					value={densityAfter}
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
					label="Perdida de volumen en l/h"
					name="evaporation"
					handleInputChange={this.handleChange}
					placeholder="Ej: 6"
					value={evaporation}
				/>
				{densityResult && (
					<p>
						La densidad antes de hervir deberá de ser de: <strong>{densityResult}</strong>
					</p>
				)}
				{volumeResult && (
					<p>
						El volumen antes de hervir deberá de ser de: <strong>{volumeResult}</strong>L
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default InitialDensity
