"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInput from "@/components/FormInput";
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
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        username: values.username,
        password: values.password,
      });
      if (response.status === 200) {
        form.reset();
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        const errorData = error.response.data;
        form.setError("username", {
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
    <section className="flex flex-col justify-center items-center h-dvh">
      <div className="mx-auto w-full sm:max-w-md">
        <h2 className="text-center lg:text-3xl max-lg:text-2xl font-bold tracking-tight dark:text-white">
          Log in to your account
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
                  name="username"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <Label
                        fieldState={fieldState}
                        label="Username"
                      />
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
                    <FormItem className="relative">
                      <Label
                        fieldState={fieldState}
                        label="Password"
                      />
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
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span>Log in</span>
                  )}
                </Button>
              </form>
            </Form>
            <div className="flex gap-2 justify-center xs:text-sm lg:text-base mt-6 px-2 text-gray-500">
              <div>Don&apos;t have an account</div>
              <a
                href="/sign-up"
                className="underline cursor-pointer"
              >
                Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
