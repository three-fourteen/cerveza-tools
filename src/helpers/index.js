// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function numberWithCommas(x) {
	return new Intl.NumberFormat("en-EN").format(x)
}

// Unformat price from $ 50,000 -> 50000
export function numberWithoutCommas(x) {
	return (x + "").replace(/(?:\$ )|,/g, "")
}

export function checkVal(val, text) {
	if (val.length === 0 || isNaN(val.toString().replace(",", "."))) {
		alert("El valor de [" + text + "] no es correcto.")
		return false
	}
	return true
}

export function parseFloatEx(value) {
	return parseFloat(value.toString().replace(",", "."))
}

export function round(number, off) {
	const i = Math.pow(10, off)
	return (Math.round(number * i) / i).toFixed(off).replace(".", ",")
}
