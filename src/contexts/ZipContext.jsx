import { createContext, useState, useEffect } from 'react'
import { getZip } from '../store/zipStore'

export const ZipContext = createContext()

export function ZipContextProvider({ children }) {
  const [ stateZip, setStateZip ] = useState(null)

  const getCurrentZip = () => {
    setStateZip(getZip())
  }

  useEffect(() => {
    getCurrentZip()
  }, [])

  const value = { stateZip, getCurrentZip }

  return <ZipContext.Provider value={value}>{children}</ZipContext.Provider>
}