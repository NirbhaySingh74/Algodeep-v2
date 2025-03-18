import Link from "next/link";
import { LogIn } from "lucide-react";

interface AuthSectionProps {
  user: any;
}

const AuthSection = ({ user }: AuthSectionProps) => {
  console.log("Received user in AuthSection:", user); // Log inside the component

  return user ? (
    <Link href="/profile">
      <img
        src={
          user.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email?.split("@")[0] || "User")}&size=256&background=4f46e5&color=fff`
        }
        alt="User Avatar"
        className="h-8 w-8 rounded-full border-2 border-[#a29bfe] cursor-pointer"
      />
    </Link>
  ) : (
    <Link href="/login" className="bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white px-4 py-2 rounded-md flex items-center">
      <LogIn className="h-4 w-4 mr-1" />
      <span>Login</span>
    </Link>
  );
};

export default AuthSection;