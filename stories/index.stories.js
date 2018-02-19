import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Button, Welcome } from "@storybook/react/demo"

import { Hydrometer } from "../src"

//storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />)

/*storiesOf("Button", module)
	.add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
	.add("with some emoji", () => <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>)*/

storiesOf("Calculadora/Densimetro", module)
	.add("Basico", () => <Hydrometer />)
	.add("Con título y descripción", () => (
		<Hydrometer
			title="Correción Densimetro"
			intro="El valor obtenido es una aproximación, pero bastante exacto para nuestros propositos."
		/>
	))
