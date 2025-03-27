"use client";

import ProgressStats from "@/components/ProgressStats";
import CategoriesView from "@/components/CategoriesView";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";

export default function CategoriesPage() {
  const { setSelectedCompany } = useAppStore();

  // Reset selectedCompany when navigating to the categories page
  useEffect(() => {
    setSelectedCompany(null);
  }, [setSelectedCompany]);

  return (
    <>
      <ProgressStats />
      <CategoriesView />
    </>
  );
}