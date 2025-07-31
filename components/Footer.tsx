import { useQuestionsStore } from "@/store/questions"
import { useQuestionsData } from "@/hooks/useQuestionsData"
import { FaCheck, FaTimes, FaQuestion } from "react-icons/fa";



const Footer = () => {

      const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
        <footer className="mt-9 text-gray-300">
     <article>
  <FaCheck className="inline text-green-500" /> {correct} correctas -{" "}
  <FaTimes className="inline text-red-500" /> {incorrect} incorrectas -{" "}
  <FaQuestion className="inline text-yellow-500" /> {unanswered} sin responder
</article>

      <div className="mt-[16px]">
        <button onClick={() => reset()} className="cursor-pointer hover:text-gray-400">
          Resetear juego
        </button>
      </div>
    </footer>
  )
}

export default Footer