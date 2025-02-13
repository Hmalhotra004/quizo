"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInput from "@/components/FormInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        username: values.name,
        password: values.password,
      });
      if (response.status === 200) {
        form.reset();
        router.replace("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        const errorData = error.response.data;
        form.setError("name", {
          type: "manual",
          message: errorData,
        });
      } else if (axios.isAxiosError(error) && error.response?.status === 401) {
        const errorData = error.response.data;
        form.setError("password", {
          type: "manual",
          message: errorData,
        });
      } else {
        form.setError("root", {
          type: "manual",
          message: "Somthing went wrong, Please try again later",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className="mx-auto w-full sm:max-w-md border-stone-200 border-2">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-stone-900">
          Log In
        </h2>
        <div className="mt-2">
          <div className="px-4 py-8 sm:px-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel id="name">Name</FormLabel>
                      <FormControl>
                        <FormInput
                          id="name"
                          type="text"
                          field={field}
                          disabled={isLoading}
                          fieldState={fieldState}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel id="password">Password</FormLabel>
                      <FormControl>
                        <FormInput
                          id="password"
                          type="password"
                          field={field}
                          disabled={isLoading}
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
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Login
                </Button>
              </form>
            </Form>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>Dont&apos; have an account</div>
              <a
                href="/sign-up"
                className="underline cursor-pointer"
              >
                SignUp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
