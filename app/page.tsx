'use client'
import Start from "@/components/Start";
import { IoLogoJavascript } from "react-icons/io5";
import { useQuestionsStore } from "@/store/questions";
import Game from "@/components/Game";


//esta page.tsx que trae Next es como App.tsx de Vite
//https://www.youtube.com/watch?v=p2wF2wRjcN0 qued en 1 hora 2 min
//https://chatgpt.com/c/687aa580-fca8-800e-92a2-d284da179435


const Page = () => {
  const questions = useQuestionsStore(state=> state.questions)
  console.log(questions);
  

  return (

      <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900 gap-y-4">
      <h1 className="text-[40px] md:text-[50px] lg:text-[50px] font-normal text-gray-300 flex gap-x-4 items-center"><span className="text-yellow-500">
        <IoLogoJavascript/></span>
        JavaScript Quizz
        </h1>
      {questions.length === 0 && <Start/>} 
      {questions.length > 0 && <Game/> }
    </main>
  )
}

export default Page
