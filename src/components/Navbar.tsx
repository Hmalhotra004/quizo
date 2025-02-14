"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const session = Cookie.get("quizoSession");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      const response = await axios.delete("/api/logout", {
        data: {
          session,
        },
      });
      if (response.status === 200) {
        Cookie.remove("quizoUser");
        Cookie.remove("quizoSession");
        router.refresh();
        setLoading(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        Cookie.remove("quizoUser");
        Cookie.remove("quizoSession");
        router.refresh();
        setLoading(false);
      }
    }
  }

  return (
    <div className="sticky flex items-center p-4 border-b border-blue-700">
      <h2 className="font-semibold sm:text-xl max-sm:text-lg">Quizo</h2>
      <Button
        variant="ghost"
        className="ml-auto sm:text-xl max-sm:text-lg"
        onClick={logout}
        disabled={loading}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
