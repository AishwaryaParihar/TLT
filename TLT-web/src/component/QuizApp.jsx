import React, { useEffect, useState } from "react";
import SummaryApi from '../Common/SummaryAPI';

import {
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChakraProvider, Box, FormControl, FormLabel, FormErrorMessage,useToast } from "@chakra-ui/react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import QuizArr from "./data/quizData";
const questionArr = QuizArr



const QuizApp = () => {
  const [launchQuiz, setLaunchQuiz] = useState(false);
  const [quizData,setQuizData] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    async function getQuizData(){
      try{
        const data = await fetch(SummaryApi.quiz.url)
        const dataJson = await data.json()
        let array =[...dataJson.data]
        shuffleArray(array)
        function shuffleArray(array) {
          for (var i = array.length - 1; i >= 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
          }
      }
        setQuizData(array)
        setLoading(false)

      }
      catch(e){
        setLoading(false)
      }
    }


    getQuizData()
  },[])

  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      m={0}
      p={0}
      textAlign={"center"}
    >
      {/* <Text fontSize={"5xl"} fontWeight={"semibold"}>Quiz Of the Day</Text> */}
      <Flex my={3} w="100%" justifyContent={"center"} alignItems={"center"}>
        {!launchQuiz ? (
          <Button
          p={4}
          fontWeight={"700"}
          minW="200px"
          isLoading={loading}
          px={6}
            onClick={() => {
              setLaunchQuiz(true);
            }}
            colorScheme="red"
            // bgColor={"rgb(239 68 68)"}
            // color={"white"}
          >
           Start Quiz
          </Button>
        ) : 
         !loading ? <BodyModal launchQuiz={launchQuiz} setLaunchQuiz={setLaunchQuiz} quizData={quizData}/>:<></>
        }
      </Flex>
    </Flex>
  );
};

function Card({
  QuestionObj,
  index,
  currQuestionNum,
  userSelectedAns,
  setUserSelectedAns,
  quizData
}) {
  console.log("question==", QuestionObj.question, index);
  return (
    <Flex
      p={8}
      direction={"column"}
      w={["90%", "90%", "90%", "80%", "80%"]}
      h="280px"
      borderWidth={1} borderRadius="lg"
      borderColor={"#D3D3D3"}
      display={index == currQuestionNum ? "flex" : "none"}
    >
      <Text>{`Q${index + 1})  ` + QuestionObj.question}</Text>
      <RadioGroup
        onChange={(value) => {
          console.log("value==>", value);
          let ansArr = [...userSelectedAns];
          ansArr[index] = value;
          setUserSelectedAns(ansArr);
        }}
      >
        <Flex
          wrap={"wrap"}
          my={[1,1,1,3,3]}
          p={[2,2,2,5,5]}
          direction={["column", "column", "row", "row", "row"]}
        >
          {QuestionObj.answers.map((answer) => {
            return (
              <Radio mx={3} my={2} colorScheme="red" value={answer}>
                {answer}
              </Radio>
            );
          })}
        </Flex>
      </RadioGroup>
    </Flex>
  );
}

function QuizUI({setCorrectAnsCount,setShowUiOf,quizData}) {
  const [currQuestionNum, setCurrQuestionNum] = useState(0);
  const [userSelectedAns, setUserSelectedAns] = useState(
    new Array(quizData.length).fill(null)
  );
  useEffect(()=>{
    let count = 0
    userSelectedAns.map((selectedAns,index)=>{
      if(selectedAns){
        if(selectedAns==quizData[index].correctAns[0]) count++
      }
    })
    setCorrectAnsCount(count)
  },[userSelectedAns])
  console.log("userSelectedAns==>", userSelectedAns);

  return (
    <Flex w="100%" direction={"column"} color="black" alignItems={"center"}>
      {" "}
      <Flex my={8} w="100%" justifyContent={"center"} alignItems={"center"}>
        {quizData.map((question, index) => {
          return (
            <Card
              QuestionObj={question}
              index={index}
              currQuestionNum={currQuestionNum}
              userSelectedAns={userSelectedAns}
              setUserSelectedAns={setUserSelectedAns}
              quizData={quizData}
            />
          );
        })}
      </Flex>
      <Flex my={8} alignItems={"center"}>
        <Button
          colorScheme="gray"
          isDisabled={currQuestionNum + 1 == 1 ? true : false}
          onClick={() => {
            setCurrQuestionNum(currQuestionNum - 1);
          }}
        >
          Previous
        </Button>
        <Text mx={8}>{`${currQuestionNum + 1}/${quizData.length}`}</Text>
        <Button
          colorScheme="red"
          onClick={() => {
            if(currQuestionNum + 1 >= quizData.length){
              setShowUiOf("infoUI")
            }
         else   setCurrQuestionNum(currQuestionNum + 1);
          }}
        >
        { currQuestionNum + 1 >= quizData.length ?"Submit": "Next"}
        </Button>
      </Flex>
    </Flex>
  );
}


function BodyModal({launchQuiz,setLaunchQuiz,quizData}) {
 const [correctAnsCount,setCorrectAnsCount] = useState(0)
 const [showUiOf,setShowUiOf] = useState("quizUI") //can be quizUI , can be infoUI , can be resultUI 
 const [formData, setFormData] = useState({ name: "", phone: "" });

 function closeModal(){
  onClose()
  setLaunchQuiz(false)
 }


  useEffect(()=>{
    if(launchQuiz) onOpen()
  },[launchQuiz])
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal size={"3xl"} isCentered="true"  closeOnEsc={false} closeOnOverlayClick={false}  isOpen={isOpen} onClose={onClose}>

        <ModalOverlay />
        <ModalContent justifyContent={"center"} justifyItems={"center"} minH={["800px","800px","500px","500px","500px"]} maxH={["800px","800px","500px","500px","500px"]}>
          <ModalHeader textAlign={"center"}>Quiz for the day</ModalHeader>
          <ModalCloseButton onClick={()=>{
            onClose()
            setLaunchQuiz(false)
          }}/>
          <ModalBody bgColor="#f8f8f8" w="100%" h="full"  alignItems={"center"} display={"flex"} justifyContent={"center"}>
        { showUiOf == "quizUI"? 
         <QuizUI setCorrectAnsCount={setCorrectAnsCount} setShowUiOf={setShowUiOf} quizData={quizData}/>
        :showUiOf == "infoUI"? <InfoUI formData={formData} setFormData={setFormData} setShowUiOf={setShowUiOf} quizData={quizData} score={`${correctAnsCount}/${quizData.length}`}/>:
        <ResultUi closeModal={closeModal}  name={formData.name||"User"} score={`${correctAnsCount}/${quizData.length}`} quizData={quizData}/>

        }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}






function InfoUI({ formData, setFormData, setShowUiOf ,quizData,score}) {
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [isLoading,setIsLoading] = useState(false)
  const Toast = useToast()


  const handleChange = (value, country) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { name: false, phone: false };

    // Name validation
    if (!/^[A-Za-z\s]{6,15}$/.test(formData.name)) {
      newErrors.name = "Name must be between 6-15 characters and contain only letters and spaces.";
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7 ||phoneDigits.length>15) {
      newErrors.phone = "Phone number must be between 7 and 15.";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted", formData);
      postUserData()
      // Handle your API call here
       // Switch to result UI on successful form submission
    }
  };


  async function postUserData(){
    console.log("formData==>",formData)
    try{
      let result = await fetch(SummaryApi.CreatequizUser.url,{
        method:SummaryApi.CreatequizUser.method,
        headers:{
          "Content-Type" :"application/json"
        },
        body:JSON.stringify({
          userName:formData.name,
          phoneNumber:formData.phone,
          score:score
        })

      })

      if(result.status==201){
        setIsLoading(false)
        Toast({
          status:"success",
          title:"Thank You!",
          duration:3000,
          isClosable:true
        })
        setShowUiOf("resultUI");
      }
      else{
        Toast({
          status:"error",
          title:"Error occured please retry.",
          duration:3000,
          isClosable:true
        })
      setIsLoading(false)

      }
    }
    catch(e){
      Toast({
        status:"error",
        title:"Error occured please retry.",
        duration:3000,
        isClosable:true
      })
    setIsLoading(false)
    }
  }

  return (
    <Box minW={"400px"}  borderColor={"#D3D3D3"} p={5} borderWidth={1} borderRadius="lg">
      <form autoComplete="off" onSubmit={handleSubmit}>
        {/* Name Field */}
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            maxW={"350px"}
            minW={"350px"}
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            required
          />
          {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
        </FormControl>

        {/* Phone Field */}
        <FormControl isInvalid={errors.phone} mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <PhoneInput
            inputStyle={{ minWidth: '350px',maxWidth:"350px" }}
            country={'in'}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" mt={5}colorScheme="red" width="full">
          Submit
        </Button>
      </form>
    </Box>
  );
}



function ResultUi({name,score,closeModal,quizData}){
  return<Flex
  direction={"column"}
  alignItems={"center"}
  justifyContent={"center"}
  minH="400px"
 
  p={10}
  color="black"
>
  <Text fontSize={"3xl"} fontWeight="bold">
    {`Hey, ${name}!`}
  </Text>
  <Box
   
  >
    <Text fontSize={"6xl"} fontWeight="extrabold">
      {score}
    </Text>
  </Box>
  <Text fontSize={"2xl"} mt={8} fontWeight="semibold">
    That's your score!
  </Text>

  <Button mt={14} w="full" colorScheme="red" onClick={()=>closeModal()}>Close</Button>
</Flex>
}

export default QuizApp