import React from "react";
import {
  Text,
  Flex,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Input,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import SummaryApi from "../Common/SummaryApi";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currPageIdx, setCurrPageIdx] = useState(0);
  const Toast = useToast();
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);
  console.log("currPageIdx", currPageIdx);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await fetch(SummaryApi.QuizGet.url);
        const dataJson = await data.json();
        console.log("dataJson==>", dataJson.data);
        setData(dataJson.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        Toast({
          isClosable: true,
          status: "error",
          title: "Internal error",
          description: "please refresh & retry",
        });
      }
    }
    getData();
  }, []);

  async function updateQuiz() {
    console.log("inside updateQuiz")
    try {
      if (!question.length) {
        return Toast({
          title: "Question can't be empty",
          status: "error",
          duration: 3000,
        });
      }
      if (answers.filter((ans) => ans.length == 0).length) {
        return Toast({
          title: "No answer can be empty",
          status: "error",
          duration: 3000,
        });
      }
      if (answers.filter((ans) => ans == correctAns).length == 0) {
        return Toast({
          title: "Select one of the options as correct answer",
          status: "error",
          duration: 3000,
        });
      }
      let body = {
        _id: data[currPageIdx]._id,
        correctAns: [correctAns],
        answers: answers,
        question: question,
      };
      console.log("bodyy==>",body)
      let responseData = await fetch(SummaryApi.QuizPut.url, {
        method: SummaryApi.QuizPut.method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (responseData.status !== 200) {
        return Toast({
          title: "OOps something went wrong please retry",
          status: "error",
          duration: 3000,
        });
      } else {
        let jsonData = await responseData.json();
        setData(jsonData.data);
        return Toast({
            title: "Successfully Saved!!",
            status: "success",
            duration: 3000,
          });
        
      }
    } catch (e) {
      console.log(e);
      return Toast({
        title: "OOps something went wrong please retry",
        status: "error",
        duration: 3000,
      });
    }
  }
  if (!data?.length) return <></>;
  return (
    <Flex direction={"column"} >
      <Flex p={5} w="full">
        <Text fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>Update Quiz Questions</Text>
      </Flex>
      <Flex
        w="full"
        p={5}
        justifyContent={"center"}
      >
        <ShowCardToUpdate
          questionObj={data[currPageIdx]}
          currPageIdx={currPageIdx}
          question={question}
          setQuestion={setQuestion}
          answers={answers}
          setAnswers={setAnswers}
          correctAns={correctAns}
          setCorrectAns={setCorrectAns}
        />
      </Flex>
      <Flex w="full" alignItems={"center"} justifyContent={"center"}>
        <Button
        minW="100px"
        colorScheme="red"
          isDisabled={currPageIdx == 0 ? true : false}
          onClick={() => {
            let data = currPageIdx - 1;
            setCurrPageIdx(data);
          }}
        >
          Previous
        </Button>
        <Text mx={8} fontWeight={"semibold"}> {`${currPageIdx + 1}/5`} </Text>
        <Button
         minW="100px"
        colorScheme="red"
          isDisabled={currPageIdx == 4 ? true : false}
          onClick={() => {
            let data = currPageIdx + 1;
            setCurrPageIdx(data);
          }}
        >
          Next
        </Button>
        
      </Flex>
      <Button
          onClick={updateQuiz}
          colorScheme="blue"
          alignSelf={"center"}
          maxW="400px"
          mt={10}
          minW={"200px"}
        >
          Save
        </Button>
    </Flex>
  );
};

function ShowCardToUpdate({
  questionObj,
  currPageIdx,
  question,
  setQuestion,
  answers,
  setAnswers,
  correctAns,
  setCorrectAns,
}) {
  console.log("questionObj", questionObj, "currPageIdx", currPageIdx,"answers",answers);

  useEffect(() => {
    setQuestion(questionObj.question);
    setAnswers(questionObj.answers);
    setCorrectAns(questionObj.correctAns[0]);
  }, [questionObj]);

  return (
    <Flex direction={"column"} h="95%" borderColor={"lightgray"} border={"1px solid lightgray"} borderRadius={"5px"} p={3} justifyContent={"center"} w="70%" my={5}>
      <Text fontWeight={"semibold"} mx={5} mb={2}>{`Question ${
        currPageIdx + 1
      } )`}</Text>
      <Textarea
        maxW={"600px"}
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
        mx={5}
        mb={5}
      />
      <Flex direction={"column"} justifyContent={"center"} m={5} mt={3}>
        {answers.map((answer, index) => (
          <div key={index}>
            <Text fontWeight={"semibold"} mt={4} m={1}>{`Option ${
              index + 1
            }`}</Text>
            <Input
              mb={4}
              maxW={"400px"}
              value={answer}
              id={index}
              onChange={(e) => {
                let data = [...answers];
                data[index] = e.target.value;
                setAnswers(data);
              }}
            />
          </div>
        ))}
      </Flex>
      <Flex fontWeight={"semibold"} p={2} borderRadius={"2px"} direction={"column"}>
      <Text>Select Correct ans</Text>
      <RadioGroup colorScheme="red" value={correctAns} onChange={setCorrectAns}>
        <Stack direction="row">
          {answers.map((answer, index) => (
            <Radio m={5} value={answer}>
              {answer}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      </Flex>
    </Flex>
  );
}
export default Quiz;
