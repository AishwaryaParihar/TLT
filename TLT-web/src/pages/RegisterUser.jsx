import React, { useEffect } from 'react'

export const RegisterUser = () => {
  const [allRegisterUser, setAllRegisterUser] = state([])

  const fetchAllUser = async() => {
    const fetchData =await fetch(SummaryApi.registerUser.url,{
      method : SummaryApi.registerUser.method,
      credentials : "include",
    })
    const dataResponse = await fetchData.json()
    console.log(dataResponse);
  }

  useEffect(()=>{

  })
  return (
    <div>RegisterUser</div>
  )
}
