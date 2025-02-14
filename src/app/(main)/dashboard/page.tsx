"use client";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { quiz } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";

const DashboardPage = () => {
  const userId = Cookies.get("quizoUser");

  const { data: quizzes } = useQuery<quiz[]>({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const response = await axios.get("/api/quiz", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${Cookies.get("quizoSession")}`,
        },
      });
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <section className="flex flex-col items-center mt-8">
      {quizzes && quizzes.length > 0 ? (
        <div>
          {quizzes.map((quiz) => {
            return <QuizCard key={quiz.id} />;
          })}
        </div>
      ) : (
        <h1 className="font-semibold text-xl">
          No Quiz Found. Try Adding one.
        </h1>
      )}
      <Button
        variant="float"
        size="icon"
      >
        <Plus />
      </Button>
    </section>
  );
};

export default DashboardPage;
