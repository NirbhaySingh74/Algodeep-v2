"use client";

import CompaniesView from "@/components/CompaniesView";
import { useAppStore } from "@/store/store";
import React, { useEffect, useCallback } from "react";

type CompaniesPageProps = {
  params: Promise<{ companyId: string }>;
};

export default function CompanyPage({ params }: CompaniesPageProps) {
  const { companyId } = React.use(params); // Unwrap params
  const {
    selectedCompany,
    setCompanyProblems,
    sidebarCollapsed,
    setLoading,
    setSelectedCompany,
  } = useAppStore();

  const fetchCompanyData = useCallback(async (company: string) => {
    setLoading(true);
    try {
      // console.log(`Fetching problems for company: ${company}`); // Debug log
      const response = await fetch(`/api/companies/${company}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // console.log("Fetched problems:", data); // Debug log
      setCompanyProblems(data);
    } catch (error) {
      console.error("Failed to fetch company problems:", error);
    } finally {
      setLoading(false);
    }
  }, [setCompanyProblems, setLoading]);

  useEffect(() => {
    if (companyId && companyId !== selectedCompany) {
      console.log(`Setting selected company to: ${companyId}`); // Debug log
      // setSelectedCompany(companyId);
      fetchCompanyData(companyId);
    }
  }, [companyId, fetchCompanyData, selectedCompany, setSelectedCompany]);

  return <CompaniesView />;
}