import { createContext, useState, useEffect } from 'react'
import { getUserInfo, editUsers } from '../services/UsersService'
import { getAccessToken } from '../store/AccessTokenStore.js'

export const UserContext = createContext()

export function UserContextProvider({children}) {
  const [ user, setUser ] = useState()

  const getUser = () => { // hace la petición a users/me
    return getUserInfo().then((res) => setUser(res))
  }
  
  const editUser = async (addressAndPromo) => {
    try {
      await editUsers(addressAndPromo)
    } catch(e) { console.log(e.response.data)}
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUser()
    }
  }, [])

  const value = { getUser, user, editUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}