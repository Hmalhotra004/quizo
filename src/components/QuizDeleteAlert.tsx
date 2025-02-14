"use client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface QuizDeleteAlertProps {
  children: React.ReactNode;
  id: string;
}

const QuizDeleteAlert = ({ id, children }: QuizDeleteAlertProps) => {
  const queryClient = useQueryClient();
  const userId = Cookie.get("quizoUser");
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync: onDelete } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete(`/api/quiz/${id}`, {
          data: {
            userId,
          },
          headers: {
            Authorization: `Bearer ${Cookie.get("quizoSession")}`,
          },
        });
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["quizzes"] });
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          toast({
            title: "Quiz Delete",
            description: "Quiz Doesn't exist",
          });
        } else if (axios.isAxiosError(err) && err.response?.status === 401) {
          Cookie.remove("quizoUser");
          Cookie.remove("quizoSession");
          router.refresh();
        } else {
          toast({
            title: "Quiz Delete",
            description: "Somthing went wrong",
          });
        }
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-liberty-blue"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            quiz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className="border-0 dark:bg-transparent"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete()}
            className="dark:text-rose-600 dark:bg-spanish-roast dark:hover:bg-slate-800"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuizDeleteAlert;
