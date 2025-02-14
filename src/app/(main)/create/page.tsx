"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .transform(
      (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    ),
  description: z.string().min(1, "Description is required"),
});

const CreateQuizPage = () => {
  const userId = Cookie.get("quizoUser");
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post(
          `/api/quiz`,
          {
            title: values.title,
            desp: values.description,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookie.get("quizoSession")}`,
            },
          }
        );
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["quizzes"] });
          form.reset();
          router.push("/dashboard");
        }
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.log("err 404");
          // Cookie.remove("quizoUser");
          // Cookie.remove("quizoSession");
          // router.refresh();
        } else if (axios.isAxiosError(err) && err.response?.status === 401) {
          console.log("err 401");
          // Cookie.remove("quizoUser");
          // Cookie.remove("quizoSession");
          // router.refresh();
        } else {
          form.setError("root", {
            type: "manual",
            message: "An error occurred. Please try again.",
          });
        }
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId || !Cookie.get("quizoSession")) {
      form.setError("root", {
        type: "manual",
        message: "Session expired. Please log in again.",
      });
      return;
    }
    mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-8 gap-y-4"
      >
        <h1 className="font-semibold md:text-xl max-md:text-lg">Create Quiz</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem className="relative">
              {/* <Label
                fieldState={fieldState}
                label=" Subject Name*"
              /> */}
              <FormControl>
                <FormInput
                  type="text"
                  field={field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem className="relative">
              {/* <Label
                fieldState={fieldState}
                label=" Subject Name*"
              /> */}
              <FormControl>
                <FormInput
                  type="text"
                  field={field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormMessage>{form.formState.errors.root?.message}</FormMessage>

        <Button
          type="submit"
          variant="secondary"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateQuizPage;
