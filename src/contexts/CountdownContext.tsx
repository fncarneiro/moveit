import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  isAutomaticCount: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  setAutomaticCount: () => void;
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {

  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.10 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const [isAutomaticCount, setIsAutomaticCount] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setTime(0.10 * 60);
    setHasFinished(false);
    setIsActive(isAutomaticCount)
  }

  function setAutomaticCount() {
    const inputAuto = document.getElementById("inputAuto") as HTMLInputElement;

    if (inputAuto.checked) {
      setIsAutomaticCount(true)
    } else {
      setIsAutomaticCount(false)
    }
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else
      if (isActive && time === 0) {
        setHasFinished(true)
        startNewChallenge()
      }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      isAutomaticCount,
      startCountdown,
      resetCountdown,
      setAutomaticCount
    }}>
      { children}
    </CountdownContext.Provider>
  )
}