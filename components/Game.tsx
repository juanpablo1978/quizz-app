import { useQuestionsStore } from "@/store/questions"
import {type Question as QuestionType } from '../types'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'

const Question = ({info}: {info:  QuestionType}) =>{

  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number)=> ()=> {
        selectAnswer(info.id, answerIndex)
  };

  return (
    <>
    <article className="w-[460px] max-h-[1250px] border-gray-300 border-[1px] text-gray-300 rounded-md
    flex flex-col gap-y-2 justify-start items-center bg-gray-800">
      <div className="p-3">
          {info.question}
      </div>
    
      <div className="w-[430px]">
              <SyntaxHighlighter language="javascript" style={gradientDark}>
      {info.code}
    </SyntaxHighlighter>
      </div>

      <div className="p-2">
        {info.answers.map((answers, index)=> (
          <ul key={index}>
          <li className='cursor-pointer py-5 w-[430px] bg-gray-700 hover:bg-gray-600 h-[48px] p-2
          border-b-[1px] border-gray-600
          flex items-center'>
            <button className="cursor-pointer"
            onClick={createHandleClick(index)} >
              {answers}
              </button>
              </li>  
          </ul>
        )

        )}
      </div>
   
    </article>
 
    </>
  )

}


const Game = () => {

    const questions = useQuestionsStore(state => state.questions);
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion];

  return (
    <>
    <Question info = {questionInfo} />
    </>
  )
}

export default Game