// app/practice/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Define metadata for the page title


export default function PracticePage() {
  const router = useRouter();

  useEffect(() => {
    
    router.replace("/practice/categories");
  }, [router]);

  return null;
}