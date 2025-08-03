import { useQuestionsStore } from "@/store/questions";
import { type Question as QuestionType } from "../types";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Footer from "./Footer";

//la dejo afuera para que la funcion solo se cree una vez
const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  //si el usuario no ha seleccionado nada
  if (userSelectedAnswer == null) return "bg-transparent";
  //si ya selecciono pero la respuesta es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "bg-transparent";
  //si el usuario selecciono la respuesta correcta
  if (index === correctAnswer) return "bg-green-700";
  //si el usuario selecciono la respuesta incorrecta
  if (index === userSelectedAnswer) return "bg-red-600";
  //si no es ninguna de la anteriores
  return "bg-transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <>
      <article
        className="w-[380px] lg:w-[460px] lg:max-h-[4300px] md:w-[460px] md:max-h-[430px]
    flex flex-col gap-y-2 justify-start items-center bg-gray-800  border-gray-300 border-[1px] text-gray-300 rounded-md" 
      >
        <div className="p-3">{info.question}</div>

        <div className="w-[370px] lg:w-[430px] md:w-[430px]">
          <SyntaxHighlighter language="javascript" style={gradientDark}>
            {info.code}
          </SyntaxHighlighter>
        </div>

        <div className="p-2">
          {info.answers.map((answers, index) => (
            <button
              key={index}
              disabled={info.userSelectedAnswer != null}
              className={`${getBackgroundColor(
                info,
                index
              )} cursor-pointer p-5 w-[370px] lg:w-[430px] md:w-[430px] 
          border-b-[1px] border-gray-600 bg-gray-700 hover:bg-gray-600 h-[48px]
          flex items-center`}
              onClick={createHandleClick(index)}
            >
              {answers}
            </button>
          ))}
        </div>
      </article>
    </>
  );
};

const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <div className="flex text-4xl text-gray-400 items-center">
        <button disabled={currentQuestion === 0} onClick={goPreviousQuestion}>
          <IoIosArrowDropleft className="hover:text-blue-300 cursor-pointer" />
        </button>

       <div className="text-center text-gray-400 text-xl px-2">
  {currentQuestion + 1} / {questions.length}
</div>

        <button disabled={currentQuestion >= questions.length -1} onClick={goNextQuestion}>
          <IoIosArrowDropright className="hover:text-blue-300 cursor-pointer" />
        </button>
      </div>
      <Question info={questionInfo} />
      <Footer/>
    </>
  );
};

export default Game;
