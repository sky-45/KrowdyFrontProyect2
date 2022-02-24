import { Routes, Route } from "react-router-dom";
import Main from '../pages/_Root/Root'
import Video from "../pages/_Video/Video";
import { useState } from "react";

const Root = () => {
  const [dataQuestions,setDataQuestions] = useState([
    {
      question: "Cual es tu nombre 1",
      answered: false,
      id:1,
      blobBuffer:""
    },
    {
      question: "Cual es tu nombre 2",
      answered: false,
      id:2,
      blobBuffer:""
    },
    {
      question: "Cual es tu nombre 3",
      answered: false,
      id:3,
      blobBuffer:""
    },
    {
      question: "Cual es tu nombre 4",
      answered: false,
      id:4,
      blobBuffer:""
    }
  ])

  return (
    <Routes>
      <Route path="/" element={<Main 
                                dataQuestions = {dataQuestions}
                              />} />
      <Route path="/video/:id" element={<Video 
                                          dataQuestions = {dataQuestions} 
                                          setDataQuestions={setDataQuestions}
                                        />} />
    </Routes>
  );
};

export default Root;
