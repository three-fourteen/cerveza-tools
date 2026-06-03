import { useState } from 'react'

interface CalculatorState<T> {
  result: T | null
  error: string | null
}

export function useCalculator<T>(calcFn: () => T) {
  const [state, setState] = useState<CalculatorState<T>>({ result: null, error: null })

  function calculate() {
    try {
      setState({ result: calcFn(), error: null })
    } catch (e) {
      setState({ result: null, error: (e as Error).message })
    }
  }

  function clear() {
    setState({ result: null, error: null })
  }

  return { ...state, calculate, clear }
}
