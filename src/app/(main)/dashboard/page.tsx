"use client";
import Loader from "@/components/Loader";
import QuizCard from "@/components/QuizCard";
import ServerError from "@/components/ServerError";
import { useToast } from "@/hooks/use-toast";
import { quiz } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const userId = Cookie.get("quizoUser");
  const { toast } = useToast();
  const router = useRouter();

  const {
    data: quizzes = [],
    isLoading,
    isError,
  } = useQuery<quiz[]>({
    queryKey: ["quizzes", userId],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/quiz", {
          params: { userId },
          headers: {
            Authorization: `Bearer ${Cookie.get("quizoSession")}`,
          },
        });
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          Cookie.remove("quizoUser");
          Cookie.remove("quizoSession");
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        }
        return [];
      }
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ServerError />;

  return (
    <section className="flex flex-col items-center mt-8">
      {quizzes.length > 0 ? (
        <div className="flex justify-center items-center flex-wrap gap-4">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
            />
          ))}
        </div>
      ) : (
        <h1 className="font-semibold text-xl">
          No Quiz Found. Try Adding one.
        </h1>
      )}
      <a
        href="/quiz/create"
        className="cursor-pointer fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700"
      >
        <Plus />
      </a>
    </section>
  );
};

export default DashboardPage;
