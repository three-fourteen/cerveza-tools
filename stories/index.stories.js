import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs/react"

//import { Button, Welcome } from "@storybook/react/demo"

import { NumericField, Button, Hydrometer } from "../src"

//storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />)

/*storiesOf("Button", module)
	.add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
	.add("with some emoji", () => <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>)*/

const storiesCalc = storiesOf("Calculadora/Densimetro", module)
storiesCalc.addDecorator(withKnobs)
storiesCalc.add("Basico", () => <Hydrometer />).add("Con título y descripción", () => {
	const title = text("Title", "Correción Densimetro")
	const intro = text("Intro", "El valor obtenido es una aproximación, pero bastante exacto para nuestros propositos.")
	return <Hydrometer title={title} intro={intro} />
})

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
