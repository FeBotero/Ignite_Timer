import { ReactNode, createContext, useState, useReducer } from 'react'
import { Cycle, cyclesReducers } from '../reducers/reducer'
import {
  addNewCycleAction,
  interruptedCycleAction,
  markFinishCycleAction,
} from '../reducers/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleFinished: () => void
  setSecondPassed: (seconds: number) => void
  CreateNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducers, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleFinished() {
    dispatch(markFinishCycleAction())
  }

  function setSecondPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function CreateNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      // pega a data atual em milisegundos
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    // zera o tempo que foi passado
    setAmountSecondsPassed(0)
  }

  function InterruptCurrentCycle() {
    dispatch(interruptedCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleFinished,
        amountSecondsPassed,
        setSecondPassed,
        CreateNewCycle,
        InterruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
