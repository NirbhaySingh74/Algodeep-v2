// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          throw new Error(error?.message || "Invalid credentials");
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("username, full_name, avatar_url")
          .eq("id", data.user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Profile fetch error:", profileError);
        }

        const fullName = profile?.full_name || data.user.email?.split("@")[0] || "User";
        const avatarUrl = profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=256&background=4f46e5&color=fff`;

        return {
          id: data.user.id,
          email: data.user.email,
          name: fullName,
          avatar_url: avatarUrl,
          username: profile?.username || "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.full_name = user.name;
        token.avatar_url = user.avatar_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.full_name = token.full_name as string;
        session.user.avatar_url = token.avatar_url as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export named HTTP methods
export { handler as GET, handler as POST };