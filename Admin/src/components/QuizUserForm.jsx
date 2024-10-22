import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import SummaryApi from '../Common/SummaryApi'

const QuizUserForm = () => {
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const Toast = useToast()
    useEffect(()=>{
        async function getData(){
            try{
                let data = await fetch(SummaryApi.QuizDetailsGet.url)
                let dataJson = await data.json()
                const sortedData = dataJson.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  );
            
                  setData(sortedData);
                  console.log("dataJson==>", sortedData);
                
            }
            catch(e){
                Toast({
                    title:"Error occured while fetching data",
                    status:"error",
                    duration:3000,
                    isClosable:true
                })
            }
        }
        getData()
    },[])
  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="shadow-md rounded-lg border-b border-gray-200">
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 text-left">S.no</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Phone Number</th>
                <th className="py-2 px-4 text-left">Score</th>
                <th className="py-2 px-4 text-left">Created Date</th>
              </tr>
            </thead>
              <tbody>
                {
                    data.map((obj,index)=>{
                      return  <tr className='p-2 m-2'>
                            <td className='border-2 m-2 p-2'>
                                {index+1}
                            </td>
                            <td className='border-2 m-2 p-2'>
                                {obj.userName}
                            </td>
                            <td className='border-2 m-2 p-2'>
                                {obj.phoneNumber}
                            </td>
                            <td className='border-2 m-2 p-2'>
                                {obj.score||"2/5"}
                            </td>
                            <td className='border-2 m-2 p-2'>
                                {obj.createdAt.split("T")[0]}
                            </td>
                        </tr>
                    })
                }
              </tbody>
            </table>
  )
}

export default QuizUserForm