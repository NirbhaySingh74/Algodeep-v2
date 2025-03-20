"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Confirm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleConfirmation = async () => {
      const accessToken = searchParams.get("access_token");
      const type = searchParams.get("type");

      if (accessToken && type === "signup") {
        // Process the confirmation token
        const { data, error } = await supabase.auth.getSessionFromUrl(
          window.location.href
        );

        if (error) {
          console.error("Error confirming email:", error.message);
          // Redirect to login with an error message if needed
          router.replace("/login?error=confirmation_failed");
          return;
        }

        if (data.session) {
          // Clean the URL and redirect to homepage
          window.history.replaceState({}, document.title, "/confirm");
          router.replace("/"); // Redirect to homepage
        }
      } else {
        // If no token or invalid type, redirect to homepage
        router.replace("/");
      }
    };

    handleConfirmation();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e]">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold">Confirming your email...</h1>
        <p className="mt-2">Please wait while we verify your account.</p>
      </div>
    </div>
  );
}