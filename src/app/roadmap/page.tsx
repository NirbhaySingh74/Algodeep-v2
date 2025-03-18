"use client"
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Map, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Code, 
  ChevronDown, 
  ChevronUp,
  Brain,
  Workflow,
  Network,
  PenTool
} from "lucide-react";
import Link from "next/link";

export default function Roadmap() {
  // Use useState with a localStorage fallback for persistence
  const [activeSteps, setActiveSteps] = useState<number[]>(() => {
    // Try to load from localStorage when the component mounts
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeSteps');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    // Try to load from localStorage when the component mounts
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedSteps');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('activeSteps', JSON.stringify(activeSteps));
  }, [activeSteps]);

  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const toggleStep = (index: number) => {
    setActiveSteps(prevActiveSteps => {
      if (prevActiveSteps.includes(index)) {
        // Remove if already active
        return prevActiveSteps.filter(step => step !== index);
      } else {
        // Add to active steps
        return [...prevActiveSteps, index];
      }
    });
  };

  const toggleCompletion = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps(prevCompletedSteps => {
      if (prevCompletedSteps.includes(index)) {
        return prevCompletedSteps.filter(step => step !== index);
      } else {
        return [...prevCompletedSteps, index];
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      
      
      <main className="flex-grow text-white pt-24 pb-16 px-4 sm:px-6">
        {/* Hero Section */}
        <motion.div
          className="max-w-5xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-500 rounded-full mb-6">
            <Map className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400">
            Your DSA Learning Roadmap
          </h1>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Follow a structured path to master Data Structures and Algorithms.
            Track your progress and learn step-by-step, from basic concepts to advanced topics.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/practice" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Start Practicing
            </Link>
            <button className="bg-[#1e1e2e] hover:bg-[#2a2a3a] text-white px-6 py-3 rounded-lg font-medium flex items-center border border-indigo-500/30">
              <Code className="h-5 w-5 mr-2" />
              View Resources
            </button>
          </div>
        </motion.div>
        
        {/* Progress Tracker */}
        <motion.div 
          className="max-w-5xl mx-auto mb-12 bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">Your Progress</h2>
            <div className="flex items-center">
              <div className="w-full sm:w-64 bg-[#2a2a3a] h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-teal-500 h-full rounded-full"
                  style={{ width: `${(completedSteps.length / roadmapSteps.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-xl font-bold">
                {Math.round((completedSteps.length / roadmapSteps.length) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Roadmap Steps */}
        <div className="mt-12 max-w-5xl mx-auto space-y-8">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden ${
                index !== roadmapSteps.length - 1 ? "before:absolute before:top-[78px] before:left-[36px] before:h-full before:w-0.5 before:bg-indigo-500/30" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div 
                className={`p-6 sm:p-8 rounded-xl shadow-lg cursor-pointer transition-all duration-300
                  ${activeSteps.includes(index) ? 'bg-[#242436] border-l-4 border-l-indigo-500' : 'bg-[#1e1e2e] hover:bg-[#242436]'}
                  ${completedSteps.includes(index) ? 'border border-teal-500/30' : 'border border-indigo-500/20'}`}
                onClick={() => toggleStep(index)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Step Number & Icon */}
                  <div 
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      completedSteps.includes(index) 
                        ? 'bg-teal-500/20' 
                        : 'bg-indigo-500/20'
                    }`}
                  >
                    {step.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h2 className={`text-2xl font-bold flex items-center gap-3 ${
                      completedSteps.includes(index) ? 'text-teal-400' : 'text-indigo-400'
                    }`}>
                      {step.title}
                      {completedSteps.includes(index) && (
                        <CheckCircle2 className="h-5 w-5 text-teal-500" />
                      )}
                    </h2>
                    <p className="text-gray-300 mt-2">{step.description}</p>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <button 
                      onClick={(e) => toggleCompletion(index, e)}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                        completedSteps.includes(index)
                          ? 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
                      }`}
                    >
                      {completedSteps.includes(index) ? 'Completed' : 'Mark Complete'}
                    </button>
                    
                    <button className="text-gray-400 hover:text-white">
                      {activeSteps.includes(index) ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {activeSteps.includes(index) && (
                  <motion.div 
                    className="mt-6 pt-6 border-t border-indigo-500/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-indigo-300 mb-3">Key Concepts</h3>
                        <ul className="space-y-2">
                          {step.concepts.map((concept, idx) => (
                            <li key={idx} className="flex items-center text-gray-300">
                              <ArrowRight className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0" />
                              {concept}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-indigo-300 mb-3">Resources</h3>
                        <ul className="space-y-3">
                          {step.resources.map((resource, idx) => (
                            <li key={idx} className="flex items-center text-gray-300">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mr-2 flex-shrink-0"></div>
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-teal-400 hover:underline"
                              >
                                {resource.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                        
                        <button className="mt-4 flex items-center text-indigo-400 hover:text-indigo-300 font-medium">
                          <BookOpen className="h-4 w-4 mr-1" />
                          View all resources
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-indigo-500/20 flex justify-between">
                      <div className="text-sm text-gray-400">
                        Estimated time: <span className="text-white font-medium">{step.timeEstimate}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Difficulty: <span className={`font-medium ${
                          step.difficulty === 'Beginner' ? 'text-green-400' : 
                          step.difficulty === 'Intermediate' ? 'text-yellow-400' : 
                          'text-red-400'
                        }`}>{step.difficulty}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="max-w-5xl mx-auto mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-teal-500/20 rounded-xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to put your knowledge to the test?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who are practicing and improving their DSA skills on AlgoGrid.
            </p>
            <Link href="/practice" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center">
              Start Practicing Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

// Enhanced Roadmap Data
const roadmapSteps = [
  {
    title: "The Foundations",
    description: "Master the fundamental concepts that form the building blocks of all algorithms and data structures.",
    icon: <BookOpen className="h-8 w-8 text-indigo-400" />,
    concepts: [
      "Time & Space Complexity Analysis (Big O Notation)",
      "Arrays and Strings Manipulation",
      "Basic Mathematics for CS",
      "Recursion and Recursive Thinking",
      "Bit Manipulation Fundamentals"
    ],
    resources: [
      { name: "Introduction to Algorithms (MIT Course)", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY" },
      { name: "Data Structures Visualization", url: "https://visualgo.net/en/" },
      { name: "Complexity Analysis Interactive Guide", url: "https://www.freecodecamp.org/news/big-o-cheat-sheet-time-complexity-chart/" },
      { name: "Recursion Deep Dive", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9" }
    ],
    timeEstimate: "2-3 weeks",
    difficulty: "Beginner"
  },
  {
    title: "Sorting & Searching",
    description: "Learn how to efficiently organize and find data using industry-standard algorithms.",
    icon: <Workflow className="h-8 w-8 text-indigo-400" />,
    concepts: [
      "Selection, Insertion, and Bubble Sort",
      "Merge Sort and Quick Sort",
      "Linear and Binary Search",
      "Counting Sort and Radix Sort",
      "Search Space Reduction Techniques"
    ],
    resources: [
      { name: "Sorting Algorithms Visualized", url: "https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html" },
      { name: "Binary Search Interactive Tutorial", url: "https://www.khanacademy.org/computing/computer-science/algorithms/binary-search" },
      { name: "Advanced Sorting Techniques", url: "https://www.youtube.com/playlist?list=PL2_aWCzGMAwLZp6LMUKI3cc7pgGsasm2_" },
      { name: "Searching in Complex Data Structures", url: "https://www.topcoder.com/thrive/articles/Search%20Techniques%20for%20Complex%20Data%20Structures" }
    ],
    timeEstimate: "2-3 weeks",
    difficulty: "Beginner to Intermediate"
  },
  {
    title: "Core Data Structures",
    description: "Explore the essential data structures used in modern software development.",
    icon: <Code className="h-8 w-8 text-indigo-400" />,
    concepts: [
      "Linked Lists (Singly, Doubly, Circular)",
      "Stacks and Queues",
      "Hash Tables and Collision Resolution",
      "Trees (Binary, BST, AVL, Red-Black)",
      "Heaps and Priority Queues"
    ],
    resources: [
      { name: "Interactive Data Structures Playground", url: "https://visualgo.net/en" },
      { name: "Tree Traversal Visualizer", url: "https://www.cs.usfca.edu/~galles/visualization/BST.html" },
      { name: "Hash Functions Deep Dive", url: "https://www.youtube.com/watch?v=shs0KM3wKv8" },
      { name: "Advanced Linked List Techniques", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" }
    ],
    timeEstimate: "3-4 weeks",
    difficulty: "Intermediate"
  },
  {
    title: "Dynamic Programming",
    description: "Master the art of breaking down complex problems into simpler subproblems.",
    icon: <Brain className="h-8 w-8 text-indigo-400" />,
    concepts: [
      "Memoization and Tabulation",
      "Classic DP Problems (Knapsack, LCS, etc.)",
      "State Machines and Transitions",
      "Combinatorial Problems",
      "String-based DP Problems"
    ],
    resources: [
      { name: "Dynamic Programming Patterns", url: "https://leetcode.com/discuss/general-discussion/458695/Dynamic-Programming-Patterns" },
      { name: "Step-by-Step DP Problem Solving", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go" },
      { name: "From Recursion to DP: A Transformation Guide", url: "https://www.geeksforgeeks.org/memoization-vs-tabulation/" },
      { name: "Advanced DP Techniques", url: "https://cses.fi/book/book.pdf" }
    ],
    timeEstimate: "4-6 weeks",
    difficulty: "Advanced"
  },
  {
    title: "Graph Algorithms",
    description: "Dive into the powerful world of graph theory and network algorithms.",
    icon: <Network className="h-8 w-8 text-indigo-400" />,
    concepts: [
      "Graph Representation (Adjacency List/Matrix)",
      "BFS & DFS Traversals",
      "Shortest Path Algorithms (Dijkstra, Bellman-Ford)",
      "Minimum Spanning Trees (Prim's, Kruskal's)",
      "Network Flow and Bipartite Matching"
    ],
    resources: [
      { name: "Graph Algorithms Visualized", url: "https://www.cs.usfca.edu/~galles/visualization/Graph.html" },
      { name: "Real-world Graph Problems", url: "https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation" },
      { name: "Social Network Analysis with Graphs", url: "https://www.youtube.com/watch?v=EAuEINmTPJc" },
      { name: "Advanced Graph Techniques", url: "https://cp-algorithms.com/graph/" }
    ],
    timeEstimate: "3-4 weeks",
    difficulty: "Advanced"
  },
  {
    title: "System Design & Advanced Topics",
    description: "Apply your knowledge to large-scale systems and tackle the most challenging problems.",
    icon: <PenTool className="h-8 w-8 text-indigo-400" />,
    concepts: [
      "Distributed Systems Basics",
      "Database Design Principles",
      "Caching Strategies and Load Balancing",
      "Concurrency and Parallelism",
      "Advanced Data Structures (Segment Trees, Tries)"
    ],
    resources: [
      { name: "System Design Interview Preparation", url: "https://github.com/donnemartin/system-design-primer" },
      { name: "Scalability Case Studies", url: "https://highscalability.com/" },
      { name: "Advanced Algorithms in Production", url: "https://www.youtube.com/watch?v=rKQaZuoUR4M" },
      { name: "Competitive Programming Techniques", url: "https://codeforces.com/blog/entry/55274" }
    ],
    timeEstimate: "4-6 weeks",
    difficulty: "Expert"
  },
];
