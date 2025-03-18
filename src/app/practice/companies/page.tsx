// app/practice/companies/page.tsx
"use client";
import Sidebar from "@/components/Sidebar";
import SearchAndFilters from "@/components/SearchAndFilters";
import CompaniesView from "@/components/CompaniesView";
import { useAppStore } from "@/store/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Head from "next/head";

const contentVariants = {
  expanded: { marginLeft: "280px" },
  collapsed: { marginLeft: "80px" },
};

export default function CompaniesPage() {
  const {
    selectedCompany,
    companyProblems,
    setCompanyProblems,
    sidebarCollapsed,
    setLoading,
  } = useAppStore();

  useEffect(() => {
    if (selectedCompany) {
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
    }
  }, [selectedCompany, setCompanyProblems, setLoading]);

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Head>
        <title>AlgoGrid - Practice </title>
        <meta
          name="description"
          content="Your professional profile on AlgoGrid"
        />
      </Head>
      {/* <Navbar /> */}
      <Sidebar />
      <motion.div
        className="flex-1 flex flex-col overflow-hidden mt-16"
        initial="expanded"
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <main className="flex-1 overflow-y-auto p-6 bg-gray-950">
          {/* <ProgressStats /> */}
          {/* <SearchAndFilters /> */}
          <CompaniesView />
          {/* <Footer/> */}
        </main>
      </motion.div>
    </div>
  );
}
