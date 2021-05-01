import { createContext, useState, useEffect } from 'react'
import { getSuppInfo } from '../services/SuppService'
import { getAccessToken } from '../store/AccessTokenStore.js'

export const SuppContext = createContext()

export function SuppContextProvider({children}) {
  const [ supp, setSupp ] = useState()

  const getSupp = () => { // hace la petición a users/me
    return getSuppInfo().then((res) => setSupp(res))
  }

  useEffect(() => {
    if (getAccessToken()) {
      getSupp()
    }
  }, [])

  const value = { getSupp, supp }

  return <SuppContext.Provider value={value}>{children}</SuppContext.Provider>
}