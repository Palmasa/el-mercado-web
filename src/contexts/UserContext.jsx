import { createContext, useState, useEffect } from 'react'
import { getUserInfo } from '../services/UsersService'
import { getAccessToken } from '../store/accessTokenStore'

export const UserContext = createContext()

export function UserContextProvider({children}) {
  const [ user, setUser ] = useState()

  const getUser = () => { // hace la petición a users/me
    return getUserInfo().then((res) => setUser(res))
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUser()
    }
  }, [])

  const value = { getUser, user }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}