import './style.css';
import VideoCard from '../../components/VideoCard';


function Main({dataQuestions}) {
  
  return (
    <div className="App">
      <h1>Video Cuestionario</h1>
      <div className='miniaturas'>
      {
        dataQuestions.map((elem) => {
          return <VideoCard 
                    elem={elem}
                    key = {elem.id}
                    />
        })
      }
      </div>
    </div>
  );
}
export default Main;
