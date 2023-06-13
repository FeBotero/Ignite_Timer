import { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from './styles'

import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleFinished,
    amountSecondsPassed,
    setSecondPassed,
  } = useContext(CyclesContext)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference > totalSeconds) {
          markCurrentCycleFinished()
          setSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleFinished,
    setSecondPassed,
  ])
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
