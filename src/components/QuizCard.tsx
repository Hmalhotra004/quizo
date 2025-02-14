import { quiz } from "@/types";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import QuizDeleteAlert from "./QuizDeleteAlert";

interface QuizCardProps {
  quiz: quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div className="flex flex-col p-2 gap-y-2 dark:bg-murex rounded-lg min-w-[250px] max-w-[350px] min-h-[150px]">
      <div className="flex justify-start items-center">
        <h2 className="font-semibold dark:text-liberty-blue mr-2 text-lg">
          {quiz.title}
        </h2>
        <div className="flex ml-auto gap-x-2 justify-end">
          <a href={`/quiz/${quiz.id}`}>
            <Edit
              className="dark:text-liberty-blue cursor-pointer"
              size={20}
            />
          </a>
          <QuizDeleteAlert id={quiz.id}>
            <Trash
              className="dark:text-liberty-blue cursor-pointer"
              size={20}
            />
          </QuizDeleteAlert>
        </div>
      </div>
      <p className="lg:text-base max-lg:text-sm font-medium dark:text-liberty-blue">
        {format(quiz.createdAt, "PP")}
      </p>

      <p className="lg:text-base max-lg:text-sm font-medium dark:text-liberty-blue ">
        {quiz.description}
      </p>
    </div>
  );
};

export default QuizCard;
