import Start from "@/components/Start";
import { IoLogoJavascript } from "react-icons/io5";

//https://www.youtube.com/watch?v=p2wF2wRjcN0 qued en min 29.48
//https://chatgpt.com/c/687aa580-fca8-800e-92a2-d284da179435

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900">
      <h1 className="text-[50px] font-bold text-gray-300 flex gap-x-4 items-center"><span className="text-yellow-500">
        <IoLogoJavascript/></span>
        React Quizz
        </h1>
        <Start/>
    </main>
  )
}
