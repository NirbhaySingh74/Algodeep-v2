"use client";

import { useState, useRef, JSX } from "react";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  Code, 
  Trophy, 
  Bookmark, 
  MapPin, 
  Star, 
  ArrowRight, 
  MessageSquare,
  LucideArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Define interfaces for the roadmap data structure
interface RoadmapSection {
  question: string;
  answer: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  difficulty: string;
  timeToMaster: string;
  sections: RoadmapSection[];
}

export default function DSARoadmap() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const roadmapSteps: RoadmapStep[] = [
    {
      id: "basics",
      title: "Foundations",
      description: "Core concepts for DSA mastery",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-600",
      difficulty: "Beginner",
      timeToMaster: "2-3 weeks",
      sections: [
        { question: "What’s essential for time and space complexity?", answer: "Learn Big O notation (O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)). Analyze worst, average, and best cases for algorithms; calculate space for recursive vs. iterative solutions." },
        { question: "Which basic data structures first?", answer: "Start with arrays and strings, then hashmaps and sets. Focus on operations, time complexities, and use cases like pattern matching or frequency counting." },
        { question: "How to solve problems systematically?", answer: "Steps: 1) Identify inputs/outputs/constraints. 2) Test examples and edge cases. 3) Break into subproblems. 4) Pick data structures. 5) Implement. 6) Optimize." },
        { question: "What math matters for DSA?", answer: "Grasp combinatorics, probability, modular arithmetic, logarithms, and geometric principles. Understand summations and recurrence relations for algorithm analysis." }
      ]
    },
    {
      id: "arrays",
      title: "Arrays & Strings",
      description: "Techniques for sequential data",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      difficulty: "Beginner-Intermediate",
      timeToMaster: "3-4 weeks",
      sections: [
        { question: "Key array techniques?", answer: "Master Two Pointers (sorted arrays), Sliding Window (subarrays), Prefix Sums (range queries), Binary Search (sorted data), and Kadane’s Algorithm (max subarray)." },
        { question: "How to handle string problems?", answer: "Use hashmaps for frequency counting, master pattern matching (e.g., KMP), and solve anagrams, palindromes, and substring searches." },
        { question: "Best ways to search/sort arrays?", answer: "Know QuickSort, MergeSort, and Binary Search. Implement from scratch and understand their complexities." },
        { question: "How to manage 2D arrays?", answer: "Learn row-major, column-major, spiral traversals, and matrix operations for rotations or grid-based dynamic programming." }
      ]
    },
    {
      id: "linkedlists",
      title: "Linked Lists",
      description: "Node and pointer manipulation",
      icon: <LucideArrowRight className="h-6 w-6" />, // Changed to LucideIcon type
      color: "from-green-500 to-teal-500",
      difficulty: "Intermediate",
      timeToMaster: "2-3 weeks",
      sections: [
        { question: "Core linked list operations?", answer: "Master insertion, deletion, traversal, and reversal for singly and doubly linked lists, handling all edge cases." },
        { question: "How to use slow/fast pointers?", answer: "Apply for cycle detection, finding middle nodes, nth node from end, and palindrome checks using different pointer speeds." },
        { question: "Common linked list pitfalls?", answer: "Avoid null pointer issues, losing head references, and incorrect pointer updates. Test with 0, 1, and multiple nodes." },
        { question: "Linked lists vs. arrays?", answer: "Use linked lists for dynamic size and mid-sequence edits; arrays for random access and fixed size." }
      ]
    },
    {
      id: "trees",
      title: "Trees & BSTs",
      description: "Hierarchical data and searches",
      icon: <Star className="h-6 w-6" />,
      color: "from-yellow-500 to-amber-500",
      difficulty: "Intermediate",
      timeToMaster: "3-4 weeks",
      sections: [
        { question: "Essential tree traversals?", answer: "Master pre-order, in-order, post-order (recursive and iterative), and level-order (BFS). Know when to apply each." },
        { question: "How to leverage BST properties?", answer: "Use left < node < right for O(log n) search, insert, delete. Validate and construct BSTs efficiently." },
        { question: "Key advanced tree problems?", answer: "Solve lowest common ancestor, path sums, tree construction from traversals, and diameter calculations using recursion." },
        { question: "When to use specialized trees?", answer: "Apply AVL/Red-Black for balance, Tries for prefixes, Segment Trees for range queries based on problem needs." }
      ]
    },
    {
      id: "graphs",
      title: "Graphs & Search",
      description: "Networks and traversals",
      icon: <MapPin className="h-6 w-6" />,
      color: "from-red-500 to-orange-500",
      difficulty: "Intermediate-Advanced",
      timeToMaster: "4-6 weeks",
      sections: [
        { question: "How to represent graphs?", answer: "Use adjacency lists for sparse graphs, matrices for dense ones. Handle directed/undirected and weighted cases." },
        { question: "Key traversal algorithms?", answer: "Implement BFS (shortest paths), DFS (cycles, components), Dijkstra’s (weighted paths), and Bellman-Ford (negative weights)." },
        { question: "Must-know graph algorithms?", answer: "Learn Topological Sort, Union-Find, MST (Kruskal’s, Prim’s), and Floyd-Warshall for specific problem types." },
        { question: "How to spot graph problems?", answer: "Look for ‘network’, ‘path’, or ‘connection’ clues. Convert to graph form, then apply the right algorithm." }
      ]
    },
    {
      id: "dp",
      title: "Dynamic Programming",
      description: "Optimizing recursion",
      icon: <Bookmark className="h-6 w-6" />,
      color: "from-pink-500 to-rose-500",
      difficulty: "Advanced",
      timeToMaster: "6-8 weeks",
      sections: [
        { question: "When to use DP?", answer: "Spot overlapping subproblems and optimal substructure in optimization or counting problems (e.g., knapsack, sequences)." },
        { question: "How to solve DP problems?", answer: "Define state, find recurrence, set base cases, choose top-down (memoization) or bottom-up (tabulation), and analyze complexity." },
        { question: "Key DP patterns?", answer: "Master 1D arrays, 2D grids, subsequences, knapsack, string edits, and decision-making problems." },
        { question: "How to optimize DP?", answer: "Reduce state variables, use rolling arrays, precompute values, and simplify recurrences to cut time/space." }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      description: "Complex problem techniques",
      icon: <Trophy className="h-6 w-6" />,
      color: "from-violet-500 to-purple-500",
      difficulty: "Expert",
      timeToMaster: "8+ weeks",
      sections: [
        { question: "Essential advanced structures?", answer: "Learn Tries (prefixes), Segment/Fenwick Trees (ranges), Disjoint Sets (merging), and heaps (priority queues)." },
        { question: "How to tackle hard problems?", answer: "Break into subproblems, evaluate multiple approaches, use math insights, and consider preprocessing." },
        { question: "Key specialized algorithms?", answer: "Master KMP (strings), convex hull (geometry), primality testing (number theory), and randomized methods." },
        { question: "How to blend DSA with system design?", answer: "Study distributed systems, databases, caching, and APIs while explaining algorithm and system trade-offs." }
      ]
    }
  ];

  const toggleSection = (id: string) => setExpandedSection(expandedSection === id ? null : id);
  
  const gradientText = (text: string, gradient: string): JSX.Element => (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{text}</span>
  );

  return (
    <section ref={containerRef} className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#1a1a28] to-[#1e1e2e] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30 -z-10"></div>
      <div className="container max-w-5xl mx-auto px-4 z-10">
        <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 rounded-full border border-indigo-500/20">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 font-medium">
              <MapPin className="inline-block w-4 h-4 mr-2 mb-1" /> DSA Roadmap
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            <span className="text-white">Master </span>
            {gradientText("Data Structures & Algorithms", "from-indigo-400 to-cyan-400")}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">A streamlined guide from beginner to expert with key concepts and practical answers.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-30"></div>
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div 
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md`} 
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <motion.div 
                  className={`bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg ${index % 2 === 0 ? 'ml-auto sm:pr-20' : 'mr-auto sm:pl-20'}`} 
                  style={{ width: '90%', maxWidth: 'calc(100% - 32px)' }} 
                  whileHover={{ y: -4 }}
                >
                  <Card className="bg-transparent border-0">
                    <div className={`p-1 ${expandedSection === step.id ? 'bg-gradient-to-r ' + step.color + ' rounded-t-xl' : ''}`}>
                      <div 
                        className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer ${expandedSection === step.id ? 'bg-gray-900/90' : 'hover:bg-gray-800/50'}`} 
                        onClick={() => toggleSection(step.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <Badge className={`bg-gradient-to-r ${step.color} border-0 text-white`}>{step.difficulty}</Badge>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{step.description}</p>
                        </div>
                        <div className="mt-3 sm:mt-0 flex items-center space-x-3">
                          <span className="text-gray-400 text-sm hidden sm:block">Time: <span className="text-indigo-400">{step.timeToMaster}</span></span>
                          <div className="p-1 rounded-full bg-gray-700/50">
                            {expandedSection === step.id ? <ChevronUp className="h-4 w-4 text-gray-300" /> : <ChevronDown className="h-4 w-4 text-gray-300" />}
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedSection === step.id && (
                      <CardContent className="p-4 bg-gray-900/90">
                        <Accordion type="single" collapsible className="divide-y divide-gray-800">
                          {step.sections.map((section, i) => (
                            <AccordionItem key={i} value={`section-${i}`} className="border-none">
                              <AccordionTrigger className="py-3 text-left hover:no-underline">
                                <div className="flex items-start">
                                  <span className="bg-gray-700 text-white p-1 rounded-md mr-2"><MessageSquare className="h-3 w-3" /></span>
                                  <div className="text-gray-100 font-medium text-sm">{section.question}</div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-300 text-sm pb-4 pt-1 pl-10">{section.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 p-6 rounded-xl border border-indigo-500/20">
            <h3 className="text-2xl font-bold mb-3">{gradientText("Test Your Skills", "from-indigo-400 to-cyan-400")}</h3>
            <p className="text-gray-300 max-w-xl mx-auto mb-4">Practice with topic-specific problems and detailed solutions.</p>
            <Button className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white px-6 py-2 rounded-full">
              Start Practicing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}