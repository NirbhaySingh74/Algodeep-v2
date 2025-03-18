import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  solved: boolean;
  // Add more fields as needed
}

interface ProblemTableProps {
  problems: Problem[];
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-800">
      <thead className="bg-gray-800">
        <tr>
          <th>Status</th>
          <th>Title</th>
          <th>Difficulty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <motion.tr key={problem.id}>
            <td>{problem.solved ? '✅' : '⬜'}</td>
            <td>{problem.title}</td>
            <td>{problem.difficulty}</td>
            <td>
              <motion.button><ExternalLink /></motion.button>
              <motion.button><Star /></motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProblemTable;