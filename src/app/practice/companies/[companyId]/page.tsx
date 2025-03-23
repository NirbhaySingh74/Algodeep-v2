"use client";
import Sidebar from "@/components/Sidebar";
import CompaniesView from "@/components/CompaniesView";
import { useAppStore } from "@/store/store";
import { motion } from "framer-motion";
import React, { useEffect, useCallback } from "react";

const contentVariants = {
  expanded: { marginLeft: "280px" },
  collapsed: { marginLeft: "80px" },
};

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
      const response = await fetch(`/api/companies/${company}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCompanyProblems(data);
    } catch (error) {
      console.error("Failed to fetch company problems:", error);
    } finally {
      setLoading(false);
    }
  }, [setCompanyProblems, setLoading]);

  useEffect(() => {
    if (companyId && companyId !== selectedCompany) {
      setSelectedCompany(companyId);
      fetchCompanyData(companyId);
    }
  }, [companyId, fetchCompanyData, selectedCompany, setSelectedCompany]);

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <motion.div
        className="flex-1 flex flex-col overflow-hidden mt-16"
        variants={contentVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <main className="flex-1 overflow-y-auto p-6 bg-gray-950">
          <CompaniesView />
        </main>
      </motion.div>
    </div>
  );
}