import Link from "next/link";
import { BookOpen, Map, Github } from "lucide-react";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-white border-b-2 border-[#a29bfe]" : "text-[#a0a0b0] hover:text-white";

  return (
    <>
      <Link href="/practice/categories" className={`flex items-center ${isActive("/practice")}`}>
        <BookOpen className="h-5 w-5 mr-1" />
        <span>Practice</span>
      </Link>
      <Link href="/roadmap" className={`flex items-center ${isActive("/roadmap")}`}>
        <Map className="h-5 w-5 mr-1" />
        <span>Roadmap</span>
      </Link>
      <a href="https://github.com/NirbhaySingh74" target="_blank" className="text-[#a0a0b0] hover:text-white flex items-center">
        <Github className="h-5 w-5 mr-1" />
        <span>GitHub</span>
      </a>
    </>
  );
};

export default NavLinks;