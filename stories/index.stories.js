import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs/react"

//import { Button, Welcome } from "@storybook/react/demo"

import { 
	NumericField, 
	Button, 
	Hydrometer, 
	Alcohol, 
	StepMashing, 
	MashTemperature, 
	MashVolume, 
	WaterDilution,
	Evaporation,
	InitialDensity
	} from "../src"

//storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />)

/*storiesOf("Button", module)
	.add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
	.add("with some emoji", () => <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>)*/

/**
 * Calculators
 */
const storiesHydrometer = storiesOf("Densimetro", module)
storiesHydrometer.addDecorator(withKnobs)
storiesHydrometer.add("Basico", () => <Hydrometer />).add("Densimetro/Con título y descripción", () => {
	const title = text("Title", "Correción Densimetro")
	const intro = text("Intro", "El valor obtenido es una aproximación, pero bastante exacto para nuestros propositos.")
	return <Hydrometer title={title} intro={intro} />
})

const storiesAlcohol = storiesOf("Alcohol", module)
storiesAlcohol.addDecorator(withKnobs)
storiesAlcohol.add("Basico", () => <Alcohol />).add("Con título y descripción", () => {
	const title = text("Title", "Contenido en Alcohol / Atenuación")
	const intro = text("Intro", "Descripción sobre la calculadora.")
	return <Alcohol title={title} intro={intro} />
})

const storiesStepMashing = storiesOf("Temperatura Escalonada", module)
storiesStepMashing.addDecorator(withKnobs)
storiesStepMashing.add("Basico", () => <StepMashing />).add("Con título y descripción", () => {
	const title = text("Title", "Temperatura del agua para realizar escalón en el macerado")
	const intro = text("Intro", "Descripción sobre la calculadora.")
	return <StepMashing title={title} intro={intro} />
})


const storiesMashTemperature = storiesOf("Temperatura Macerado", module)
storiesMashTemperature.addDecorator(withKnobs)
storiesMashTemperature.add("Basico", () => <MashTemperature />).add("Con título y descripción", () => {
	const title = text("Title", "Temperatura del agua para el macerado")
	const intro = text("Intro", "Descripción sobre la calculadora.")
	return <MashTemperature title={title} intro={intro} />
})

const storiesMashVolume = storiesOf("Volumen Macerado", module)
storiesMashVolume.addDecorator(withKnobs)
storiesMashVolume.add("Basico", () => <MashVolume />).add("Con título y descripción", () => {
	const title = text("Title", "Volumen Macerado")
	const intro = text("Intro", "Descripción sobre la calculadora.")
	return <MashVolume title={title} intro={intro} />
})

const storiesWaterDilution = storiesOf("Dilución de mosto con agua", module)
storiesWaterDilution.addDecorator(withKnobs)
storiesWaterDilution.add("Basico", () => <WaterDilution />).add("Con título y descripción", () => {
	const title = text("Title", "Cantidad de agua para diluir un mosto")
	const intro = text("Intro", "Comprueba si tu macerador tiene tamaño suficiente para realizar el macerado. No se tiene en cuenta el espacio que pueda haber bajo tu falso fondo, si lo tienes.")
	return <WaterDilution title={title} intro={intro} />
})

const storiesEvaporation = storiesOf("Evaporacion", module)
storiesEvaporation.addDecorator(withKnobs)
storiesEvaporation.add("Basico", () => <Evaporation />).add("Con título y descripción", () => {
	const title = text("Title", "Calcular evaporación")
	const intro = text("Intro", "El dato del volumén después de hervir no tiene en cuenta perdidas que se puedan producir en tubos, sistemas de enfriado o del mosto que se pueda quedar en la olla. Si se obtiene un volumén inferior al mostrado en el cálculo deberemos tener en cuenta esto.")
	return <Evaporation title={title} intro={intro} />
})

const storiesInitialDensity = storiesOf("Densidad Inicial", module)
storiesInitialDensity.addDecorator(withKnobs)
storiesInitialDensity.add("Basico", () => <InitialDensity />).add("Con título y descripción", () => {
	const title = text("Title", "Calcular volumen y densidad antes de hervir")
	const intro = text("Intro", "Descripción sobre la calculadora.")
	return <InitialDensity title={title} intro={intro} />
})


/**
 * Form elements
 */
const storiesForm = storiesOf("Form/Input numerico", module)
storiesForm.addDecorator(withKnobs)
storiesForm
	.add("Basico", () => {
		const label = text("Label", "Test")
		const name = text("Name", "Test")
		const placeholder = text("Placeholder", "ej: 1040")
		return (
			<NumericField label={label} name={name} handleInputChange={action("changed")} placeholder={placeholder} />
		)
	})
	.add("Con limite de digitos", () => {
		const label = text("Label", "Test")
		const name = text("Name", "Test")
		const placeholder = text("Placeholder", "ej: 1040")
		const maxLength = number("Max length", 4)
		return (
			<NumericField
				label={label}
				name={name}
				handleInputChange={action("changed")}
				placeholder={placeholder}
				maxLength={maxLength}
			/>
		)
	})
	.add("Disabled", () => {
		const label = text("Label", "Test")
		const name = text("Name", "Test")
		const placeholder = text("Placeholder", "ej: 1040")
		return (
			<NumericField
				label={label}
				name={name}
				handleInputChange={action("changed")}
				placeholder={placeholder}
				disabled={boolean("Disabled", true)}
			/>
		)
	})

const storiesBtn = storiesOf("Buttons", module)
storiesBtn.addDecorator(withKnobs)
storiesBtn
	.add("Basico", () => {
		const label = text("Label", "Test label")
		return <Button onClick={action("clicked")} label={label} />
	})
	.add("Disabled", () => {
		const label = text("Label", "Test label")
		return <Button onClick={action("clicked")} label={label} disabled={boolean("Disabled", true)} />
	})
