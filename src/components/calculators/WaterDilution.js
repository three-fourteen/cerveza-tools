import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { dilutionCalc } from "../../calculators"

const initialState = { DO: "", DF: "", volume: "", dilutionCalcValue: null }

class WaterDilution extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { DO, DF, volume } = this.state
		const newState = dilutionCalc(DO, DF, volume)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({...initialState})
	}

	render() {
		const { DO, DF, volume, dilutionCalcValue } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Densidad actual"
					name="DO"
					handleInputChange={this.handleChange}
					placeholder="ej: 1052"
					value={DO}
					maxLength={4}
				/>
				<NumericField
					label="Volumen en litros"
					name="volume"
					handleInputChange={this.handleChange}
					placeholder="ej: 20"
					value={volume}
					maxLength={4}
				/>
				<NumericField
					label="Densidad objetivo"
					name="DF"
					handleInputChange={this.handleChange}
					placeholder="ej: 1042"
					value={DF}
					maxLength={4}
				/>
				{dilutionCalcValue && (
					<p>
						Añadir agua: <strong>{dilutionCalcValue}</strong>
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default WaterDilution
