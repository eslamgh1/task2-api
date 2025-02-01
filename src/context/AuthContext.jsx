import React, { createContext, useEffect, useState } from 'react'



export const authContext = createContext();


// token idea
export default function AuthContextProvider({ children }) {
  
  const [userToken, setUserToken]= useState(null);
  

  useEffect(function() {
    
    console.log('refreshed')
    const tkn = localStorage.getItem('tkn')
    if( tkn !== null){
      setUserToken(tkn)
      
    }

  }, []);
  
  return (

    <>
      <authContext.Provider value={ {setUserToken ,userToken}}>        
      
        {children}
        <div>Just Name Function AuthContextProvider</div>
      </authContext.Provider>


    </>

  )
}
