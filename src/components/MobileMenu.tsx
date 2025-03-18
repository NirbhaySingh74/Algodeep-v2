import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Map, Github, LogIn } from "lucide-react";
import { useNavbarStore } from "@/store/useNavbarStore";

interface MobileMenuProps {
  user: any;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const { isOpen, setIsOpen } = useNavbarStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 w-full bg-[#1e1e2e] border-b border-[#3d3d5c] shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href="/practice" onClick={() => setIsOpen(false)} className="flex items-center text-white">
              <BookOpen className="h-5 w-5 mr-1" />
              <span>Practice</span>
            </Link>
            <Link href="/roadmap" onClick={() => setIsOpen(false)} className="flex items-center text-white">
              <Map className="h-5 w-5 mr-1" />
              <span>Roadmap</span>
            </Link>
            <a href="https://github.com/NirbhaySingh74" target="_blank" className="text-[#a0a0b0] hover:text-white flex items-center">
              <Github className="h-5 w-5 mr-1" />
              <span>GitHub</span>
            </a>
            {user ? (
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <img
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=User&size=256&background=4f46e5&color=fff`}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-[#a29bfe] cursor-pointer"
                />
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white px-4 py-2 rounded-md flex items-center">
                <LogIn className="h-4 w-4 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
