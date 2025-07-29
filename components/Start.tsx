'use client'
import { useQuestionsStore } from "@/store/questions";

const LIMIT_QUESTIONS = 10;

const Start = () => {
    const fetchQuestions = useQuestionsStore(state=> state.fetchQuestions)

    const handleClick = ()=>{
      fetchQuestions(LIMIT_QUESTIONS)
    }
  return (
    <button className="cursor-pointer text-white text-3xl border-[1px] border-white
    w-[137px] h-[47px] hover:text-blue-300 hover:border-blue-300"
    onClick={handleClick} >
        START
    </button>
  )
}

export default Start