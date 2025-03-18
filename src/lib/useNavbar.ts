import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export const useNavbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    
    // Store session in localStorage to prevent loading state on route changes
    const cachedUser = localStorage.getItem('cachedUser');
    if (cachedUser && isMounted) {
      try {
        setUser(JSON.parse(cachedUser));
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing cached user:", error);
      }
    }
  
    const fetchUserAndProfile = async () => {
      try {
        // Start with getSession to check if there's an active session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        
        // Only log errors, not sensitive session data
        if (sessionError) {
          console.error("Session fetch error:", sessionError);
        }
  
        let currentUser = null;
  
        if (session?.user) {
          // If we have a session user, fetch their profile
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("id", session.user.id)
            .single();
  
          if (profileError) {
            console.error("Profile fetch error:", profileError);
          }
  
          currentUser = {
            ...session.user,
            full_name: profile?.full_name || session.user.user_metadata?.full_name,
            avatar_url: profile?.avatar_url || null,
          };
          
          // Cache the user data in localStorage
          localStorage.setItem('cachedUser', JSON.stringify(currentUser));
        } else {
          // Clear cached user if no session
          localStorage.removeItem('cachedUser');
        }
  
        // Important: Set state only if component is still mounted
        if (isMounted) {
          setUser(currentUser);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user and profile:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
  
    // Initial fetch
    fetchUserAndProfile();
  
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Only set loading to true for sign in and sign out events
        if (['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED'].includes(event) && isMounted) {
          setIsLoading(true);
        }
        
        // Log event type but not sensitive session data
        console.log("Auth state change event:", event);
  
        let updatedUser = null;
  
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("id", session.user.id)
            .single();
  
          if (profileError) {
            console.error("Profile fetch error:", profileError);
          }
  
          updatedUser = {
            ...session.user,
            full_name: profile?.full_name || session.user.user_metadata?.full_name,
            avatar_url: profile?.avatar_url || null,
          };
          
          // Update cached user
          localStorage.setItem('cachedUser', JSON.stringify(updatedUser));
        } else {
          // Clear cached user
          localStorage.removeItem('cachedUser');
        }
  
        if (isMounted) {
          setUser(updatedUser);
          setIsLoading(false);
        }
      }
    );
  
    return () => {
      isMounted = false; // Cleanup
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
};