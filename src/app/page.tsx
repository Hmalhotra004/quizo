"use client";
import Loader from "@/components/Loader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("quizoSession");
    const userId = Cookies.get("quizoUser");

    if (token && userId) {
      router.push("/dashboard");
    } else {
      router.push("/log-in");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-custom-blue-500">
      <Loader />
    </div>
  );
};

export default HomePage;
