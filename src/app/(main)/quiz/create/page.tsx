"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Label from "@/components/Label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await axios.post(
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes", userId] });
      setLoading(false);
      form.reset();
      router.push("/dashboard");
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setLoading(false);
        Cookie.remove("quizoUser");
        Cookie.remove("quizoSession");
        router.refresh();
      } else {
        setLoading(false);
        form.setError("root", {
          type: "manual",
          message: "An error occurred. Please try again.",
        });
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!userId || !Cookie.get("quizoSession")) {
      form.setError("root", {
        type: "manual",
        message: "Session expired. Please log in again.",
      });
      setLoading(false);
      return;
    }
    await mutateAsync(values);
  }

  return (
    <section className="flex flex-col justify-center items-center mt-12">
      <div className="mx-auto w-full sm:max-w-md">
        <h2 className="text-center lg:text-3xl max-lg:text-2xl font-bold tracking-tight dark:text-white">
          Create Quiz
        </h2>
        <div className="mt-2">
          <div className="px-4 py-8 max-sm:px-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <Label
                        fieldState={fieldState}
                        label="Title"
                      />
                      <FormControl>
                        <FormInput
                          id="Title"
                          type="text"
                          field={field}
                          disabled={loading}
                          fieldState={fieldState}
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
                      <Label
                        fieldState={fieldState}
                        label="Description"
                      />
                      <FormControl>
                        <FormInput
                          id="description"
                          type="text"
                          field={field}
                          disabled={loading}
                          fieldState={fieldState}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormMessage className="text-lg">
                  {form.formState.errors.root?.message}
                </FormMessage>

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span>Create</span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateQuizPage;
