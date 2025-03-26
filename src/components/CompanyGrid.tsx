import React from "react";
import { motion } from "framer-motion";
import { Company } from "@/data/companies";

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

const CompanyGrid: React.FC<CompanyGridProps> = React.memo(
  ({ companies, selectedCompany, onCompanyClick }) => {
    return (
      <div className="space-y-6 mb-12"> {/* Added mb-12 for bottom margin */}
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
              onClick={() => onCompanyClick(company.id)}
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
          className="hidden xl:grid grid-cols-6 gap-4 md:gap-6" // Changed to grid-cols-6 to match first row width
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
              onClick={() => onCompanyClick(company.id)}
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
          {/* Add empty divs to maintain 6-column layout if fewer than 4 companies */}
          {companies.length < 10 && 
            Array(6 - companies.slice(6).length).fill(null).map((_, index) => (
              <div key={`empty-${index}`} className="invisible" />
            ))
          }
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
              onClick={() => onCompanyClick(company.id)}
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
              onClick={() => onCompanyClick(company.id)}
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
          {/* Add empty divs to maintain 5-column layout if fewer than 5 companies */}
          {companies.length < 10 && 
            Array(5 - companies.slice(5).length).fill(null).map((_, index) => (
              <div key={`empty-${index}`} className="invisible" />
            ))
          }
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
              onClick={() => onCompanyClick(company.id)}
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
      </div>
    );
  }
);

CompanyGrid.displayName = "CompanyGrid";
export default CompanyGrid;