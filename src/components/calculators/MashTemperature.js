import React, { Component } from "react"
import { NumericField, Button } from "../form"
import { strikeCalc } from "../../calculators"

const initialState = { thick: "",  strtemp: "",  grntemp: "", strikeCalcValue: null }

class MashTemperature extends Component {
	constructor(props) {
		super(props)

		this.state = { ...initialState }
	}

	calculate = () => {
		const { thick, strtemp, grntemp } = this.state
		const newState = strikeCalc(thick, strtemp, grntemp)
		this.setState(newState)
	}

	handleChange = (val, name) => {
		this.setState({ [name]: val })
	}

	clearForm = () => {
		this.setState({...initialState})
	}

	render() {
		const { thick, strtemp, grntemp, strikeCalcValue } = this.state
		const { title, intro } = this.props
		return (
			<div>
				{title && <h3>{title}</h3>}
				{intro && <p>{intro}</p>}
				<NumericField
					label="Litros de agua por Kg de grano"
					name="thick"
					handleInputChange={this.handleChange}
					placeholder="ej: 3"
					value={thick}
					maxLength={4}
				/>
				<NumericField
					label="Temperatura objetivo del macerado"
					name="strtemp"
					handleInputChange={this.handleChange}
					placeholder="ej: 67"
					value={strtemp}
					maxLength={4}
				/>
				<NumericField
					label="Temperatura del grano"
					name="grntemp"
					handleInputChange={this.handleChange}
					placeholder="ej: 18"
					value={grntemp}
					maxLength={4}
				/> 
				{strikeCalcValue && (
					<p>
						La temperatura del agua tiene que ser de: <strong>{strikeCalcValue}</strong>ºC
					</p>
				)}
				<Button onClick={this.calculate} label="Calcular" />
				<Button onClick={this.clearForm} label="Limpiar" />
			</div>
		)
	}
}

export default MashTemperature
