import { create } from "zustand";
import { Question } from "@/types";

//tipado del estado
interface State {
  questions: Question[]; //el json
  currentQuestion: number; //en que pregunta esta el usuario ej. 2/10 o 4/10
  fetchQuestions: (limit: number) => Promise<void>; //metodo para cambiar el estado
  selectAnswer: (questionId: number, answerIndex: number) => void;
}

// A CONTINUACION SE CREA EL ESTADO:
//EL CREATE RECIBE UN CALLBACK, Y EL CALLBACK DEVUELVE EL OBEJTO QUE CONTIENE EL ESTADO GLOBAL

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [], //VALOR INICIAL--> ARRAY VACIO
    currentQuestion: 0, // VALOR INICIAL--> CERO SE REFIERE A LA POSICION EN EL ARRAY

    fetchQuestions: async (limit: number) => {
      const res = await fetch("/data.json");
      const json = await res.json();
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const {questions} = get()

      //structurClone para clonar el objeto
          const newQuestions = structuredClone(questions);
          //encontramos el indice de la pregunta
          const questionIndex = newQuestions.findIndex(q => q.id === questionId)
          //obtenemos la informacion de la pregunta
          const questionInfo = newQuestions[questionIndex]
          //averiguamos si el usuario selecciono la resp. correcta
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
          //cambiamos la info en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
          }
          //actualizamos el estado
          set({questions: newQuestions})
    }


  };
});
