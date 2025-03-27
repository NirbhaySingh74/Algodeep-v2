"use client";

import CompaniesView from "@/components/CompaniesView";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import Head from "next/head";

export default function CompaniesPage() {
  const { selectedCompany, setCompanyProblems, setLoading } = useAppStore();

  useEffect(() => {
    // Only fetch if a specific company is selected (this will be handled by [companyId]/page.tsx)
    if (!selectedCompany) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/companies/${selectedCompany}`);
        const data = await response.json();
        setCompanyProblems(data);
      } catch (error) {
        console.error("Failed to fetch company problems:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCompany, setCompanyProblems, setLoading]);

  return (
    <>
      <Head>
        <title>AlgoGrid - Practice</title>
        <meta name="description" content="Your professional profile on AlgoGrid" />
      </Head>
      <CompaniesView />
    </>
  );
}