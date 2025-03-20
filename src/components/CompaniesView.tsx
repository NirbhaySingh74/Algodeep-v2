"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Star, Filter } from "lucide-react";
import { useAppStore } from "@/store/store";
import { companies } from "@/data/companies";
import { Badge } from "@/components/ui/badge";
import CompanyGrid from "./CompanyGrid";
import CompanyProblems from "./CompanyProblems";

const CompaniesView: React.FC = () => {
  const { selectedCompany, setSelectedCompany, companyProblems, loading } = useAppStore();

  const handleCompanyClick = useCallback(
    (companyId: string) => {
      setSelectedCompany(companyId === selectedCompany ? null : companyId);
    },
    [selectedCompany, setSelectedCompany]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="pb-10"
    >
      <CompanyGrid
        companies={companies}
        selectedCompany={selectedCompany}
        onCompanyClick={handleCompanyClick}
      />
      {selectedCompany ? (
        <CompanyProblems
          company={companies.find((c) => c.id === selectedCompany)!}
          problems={companyProblems}
          loading={loading}
        />
      ) : (
        <motion.div
          className="bg-gray-900 p-8 md:p-10 rounded-xl text-center border border-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-full bg-indigo-500/30 blur-xl"></div>
            <Briefcase className="h-20 w-20 mx-auto mb-6 text-indigo-400 relative z-10" />
          </motion.div>
          <h3 className="text-2xl font-medium mb-3 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Prepare for Your Dream Company
          </h3>
          <p className="text-gray-300 max-w-md mx-auto font-medium">
            Choose a company above to see frequently asked interview questions
            tailored to your target company. Track your progress and ace your
            next technical interview.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Badge
              variant="outline"
              className="py-1 px-3 border-indigo-400 bg-indigo-900/30"
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              <span className="text-white font-medium">Track your progress</span>
            </Badge>
            <Badge
              variant="outline"
              className="py-1 px-3 border-amber-400 bg-amber-900/30"
            >
              <Star className="h-4 w-4 mr-2 text-amber-400" />
              <span className="text-white font-medium">Save favorites</span>
            </Badge>
            <Badge
              variant="outline"
              className="py-1 px-3 border-blue-400 bg-blue-900/30"
            >
              <Filter className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-white font-medium">Filter by difficulty</span>
            </Badge>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompaniesView;