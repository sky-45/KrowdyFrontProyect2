
import './style.css';
import VideoCard from '../../components/VideoCard';



function Main({dataQuestions,setDataQuestions}) {

  const questions2 = dataQuestions.map((elem)=>{
    return elem.question
  })
  console.log(questions2)
  
  return (
    <div className="App">
      <h1>Video Cuestonario</h1>
      <div className='miniaturas'>
      {
        questions2.map((question) => {
          return <VideoCard 
                    data = {dataQuestions}
                    question ={question} 
                    id = {questions2.indexOf(question)+1}
                    key = {questions2.indexOf(question)+1}
                    />
        })
      }
      </div>
      
    </div>
  );
}

export default Main;
