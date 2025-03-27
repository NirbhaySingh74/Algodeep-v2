"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Company } from "@/data/companies";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for the toggle button

interface CompanyGridProps {
  companies: Company[];
  selectedCompany: string | null;
  onCompanyClick: (companyId: string) => void;
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3 },
  }),
};

const gridVariants = {
  expanded: { height: "auto", opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

const CompanyGrid: React.FC<CompanyGridProps> = React.memo(
  ({ companies, selectedCompany, onCompanyClick }) => {
    const router = useRouter();
    const pathname = usePathname();

    // Determine if we're on a company-specific page
    const companyId = pathname.split("/").pop();
    const isCompanyPage = pathname.startsWith("/practice/companies/") && companyId !== "companies";

    // State to manage grid visibility
    const [isGridExpanded, setIsGridExpanded] = useState(!isCompanyPage);

    // Update grid visibility based on route changes
    useEffect(() => {
      setIsGridExpanded(!isCompanyPage);
    }, [isCompanyPage]);

    const handleClick = (companyId: string) => {
      onCompanyClick(companyId);
      router.push(`/practice/companies/${companyId}`);
    };

    const toggleGrid = () => {
      setIsGridExpanded(!isGridExpanded);
    };

    return (
      <div className="mb-12">
        {/* Toggle Button */}
        {isCompanyPage && (
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={toggleGrid}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
            >
              {isGridExpanded ? (
                <>
                  <ChevronUp className="h-5 w-5 mr-2" />
                  Hide Companies
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-2" />
                  Show Companies
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Company Grid with Collapse Animation */}
        <AnimatePresence initial={false}>
          {isGridExpanded && (
            <motion.div
              className="space-y-6"
              variants={gridVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.3 }}
            >
              {/* Large Screens (Monitor) - 6 companies in first row, 4 in second */}
              <motion.div
                className="hidden xl:grid grid-cols-6 gap-4 md:gap-6 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {companies.slice(0, 6).map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`flex-1 bg-gray-900 p-5 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
                      selectedCompany === company.id
                        ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40"
                        : "hover:border-gray-700"
                    }`}
                    onClick={() => handleClick(company.id)}
                    whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-24 h-24 rounded-full bg-white p-3 mb-4 flex items-center justify-center shadow-md">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-base text-gray-200 text-center font-medium mt-1">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="hidden xl:grid grid-cols-6 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {companies.slice(6).map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`flex-1 bg-gray-900 p-5 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
                      selectedCompany === company.id
                        ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40"
                        : "hover:border-gray-700"
                    }`}
                    onClick={() => handleClick(company.id)}
                    whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-24 h-24 rounded-full bg-white p-3 mb-4 flex items-center justify-center shadow-md">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-base text-gray-200 text-center font-medium mt-1">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
                {companies.length < 10 &&
                  Array(6 - companies.slice(6).length)
                    .fill(null)
                    .map((_, index) => <div key={`empty-${index}`} className="invisible" />)}
              </motion.div>

              {/* Laptop Screens - 5 companies in first row, 5 in second */}
              <motion.div
                className="hidden lg:grid xl:hidden grid-cols-5 gap-4 md:gap-6 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {companies.slice(0, 5).map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`flex-1 bg-gray-900 p-5 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
                      selectedCompany === company.id
                        ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40"
                        : "hover:border-gray-700"
                    }`}
                    onClick={() => handleClick(company.id)}
                    whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-24 h-24 rounded-full bg-white p-3 mb-4 flex items-center justify-center shadow-md">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-base text-gray-200 text-center font-medium mt-1">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="hidden lg:grid xl:hidden grid-cols-5 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {companies.slice(5).map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`flex-1 bg-gray-900 p-5 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
                      selectedCompany === company.id
                        ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40"
                        : "hover:border-gray-700"
                    }`}
                    onClick={() => handleClick(company.id)}
                    whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-24 h-24 rounded-full bg-white p-3 mb-4 flex items-center justify-center shadow-md">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-base text-gray-200 text-center font-medium mt-1">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
                {companies.length < 10 &&
                  Array(5 - companies.slice(5).length)
                    .fill(null)
                    .map((_, index) => <div key={`empty-${index}`} className="invisible" />)}
              </motion.div>

              {/* Mobile and Smaller Screens - Fallback Grid */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:hidden gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {companies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`bg-gray-900 p-4 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
                      selectedCompany === company.id
                        ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40"
                        : "hover:border-gray-700"
                    }`}
                    onClick={() => handleClick(company.id)}
                    whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white p-3 mb-4 flex items-center justify-center shadow-md">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm md:text-base text-gray-200 text-center font-medium mt-1">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

CompanyGrid.displayName = "CompanyGrid";
export default CompanyGrid;