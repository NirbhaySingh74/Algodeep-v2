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
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            className={`bg-gray-900 p-5 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
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
    );
  }
);

CompanyGrid.displayName = "CompanyGrid";
export default CompanyGrid;