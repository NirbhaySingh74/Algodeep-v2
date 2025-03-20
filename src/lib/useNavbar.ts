// src/lib/useNavbar.ts
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export const useNavbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserAndProfile = async (sessionOverride?: any) => {
    try {
      const { data: { session }, error: sessionError } = sessionOverride
        ? { data: { session: sessionOverride }, error: null }
        : await supabase.auth.getSession();

      if (sessionError) throw new Error("Session fetch error: " + sessionError.message);

      let currentUser = null;

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Profile fetch error:", profileError);
        }

        currentUser = {
          ...session.user,
          full_name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
          avatar_url: profile?.avatar_url || null,
        };

        localStorage.setItem("cachedUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("cachedUser");
      }

      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      localStorage.removeItem("cachedUser");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Load cached user immediately
    const cachedUser = localStorage.getItem("cachedUser");
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
        setIsLoading(false); // Skip loading if cached
      } catch (error) {
        console.error("Error parsing cached user:", error);
        fetchUserAndProfile(); // Fallback to fetch
      }
    } else {
      fetchUserAndProfile();
    }

    // Auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) {
        fetchUserAndProfile(session);
      }
    });

    // Sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cachedUser" && isMounted) {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { user, isLoading };
};