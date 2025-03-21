"use client";
import { useState, useRef } from "react";
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
  LucideArrowRight,
  BookOpen,
  ListChecks,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function DSARoadmap() {
  const [expandedSection, setExpandedSection] = useState(null);
  const containerRef = useRef(null);
  
  // Roadmap data structure
  const roadmapSteps = [
    {
      id: "basics",
      title: "Foundations",
      description: "Essential concepts needed for all DSA topics",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-600",
      difficulty: "Beginner",
      timeToMaster: "2-3 weeks",
      sections: [
        {
          question: "What time and space complexity analysis should I understand?",
          answer: "Focus on understanding Big O notation (O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)). Learn to analyze algorithms for worst, average, and best case scenarios. Practice calculating space complexity for recursive and iterative solutions.",
          resources: [
            { name: "Big O Notation Explained", type: "Article" },
            { name: "Complexity Analysis for Beginners", type: "Video" }
          ]
        },
        {
          question: "What basic data structures should I master first?",
          answer: "Start with arrays and strings, then move to hashmaps and sets. Understand the operations, time complexities, and use cases for each. Practice problems that use these structures to solve pattern matching, frequency counting, and two-pointer techniques.",
          resources: [
            { name: "Data Structures Fundamentals", type: "Course" },
            { name: "Array & String Manipulation", type: "Practice Set" }
          ]
        },
        {
          question: "How do I approach problem-solving systematically?",
          answer: "Follow this framework: 1) Understand the problem by identifying inputs, outputs, and constraints. 2) Explore examples and edge cases. 3) Break down into subproblems. 4) Choose appropriate data structures. 5) Implement solution. 6) Test and optimize.",
          resources: [
            { name: "Problem Solving Techniques", type: "Book" },
            { name: "How to Tackle Any Coding Problem", type: "Workshop" }
          ]
        },
        {
          question: "What mathematical concepts are important for DSA?",
          answer: "Master these foundational concepts: basic combinatorics, probability, modular arithmetic, logarithms, and geometric principles. Understanding summations, progressions, recurrence relations, and proof techniques will help with algorithm analysis and development.",
          resources: [
            { name: "Math for Programmers", type: "Book" },
            { name: "Essential Math for Algorithms", type: "Course" }
          ]
        }
      ]
    },
    {
      id: "arrays",
      title: "Arrays & Strings",
      description: "Core techniques for manipulating sequential data",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      difficulty: "Beginner-Intermediate",
      timeToMaster: "3-4 weeks",
      sections: [
        {
          question: "What are the key array manipulation techniques?",
          answer: "Master these patterns: Two Pointers (for sorted arrays), Sliding Window (for subarrays/substring problems), Prefix Sums (for range queries), Binary Search (for sorted arrays), and Kadane's Algorithm (for maximum subarray problems). Each pattern has specific applications and implementation approaches.",
          resources: [
            { name: "Array Pattern Techniques", type: "Tutorial" },
            { name: "Two Pointers Approach", type: "Problem Set" }
          ]
        },
        {
          question: "How do I approach string manipulation problems?",
          answer: "Focus on techniques like character frequency counting with hashmaps, string building/manipulation, and pattern matching algorithms (KMP, Rabin-Karp). Practice problems involving anagrams, palindromes, substring searches, and string transformations.",
          resources: [
            { name: "String Algorithms", type: "Video Series" },
            { name: "Pattern Matching Deep Dive", type: "Article" }
          ]
        },
        {
          question: "What are the most efficient ways to search and sort arrays?",
          answer: "Understand standard sorting algorithms (QuickSort, MergeSort, HeapSort) and their time/space complexities. For searching, master binary search and its variations for different problem types. Practice implementing these from scratch to build muscle memory.",
          resources: [
            { name: "Sorting Algorithms Visualized", type: "Interactive Tool" },
            { name: "Binary Search Variations", type: "Tutorial" }
          ]
        },
        {
          question: "How do I handle multidimensional arrays efficiently?",
          answer: "Learn traversal techniques for 2D arrays (row-major, column-major, diagonal, spiral). Master matrix operations and manipulations for problems like rotations, transpositions, and dynamic programming on grids. Practice problems involving image processing and game boards.",
          resources: [
            { name: "Matrix Operations Guide", type: "Cheatsheet" },
            { name: "Grid-based Problem Solving", type: "Workshop" }
          ]
        }
      ]
    },
    {
      id: "linkedlists",
      title: "Linked Lists",
      description: "Handling sequential nodes and pointers",
      icon: <LucideArrowRight className="h-6 w-6" />,
      color: "from-green-500 to-teal-500",
      difficulty: "Intermediate",
      timeToMaster: "2-3 weeks",
      sections: [
        {
          question: "What are the core linked list operations I need to master?",
          answer: "Focus on insertion (at beginning, end, and middle), deletion, traversal, and reversal operations. Practice implementing these operations for both singly and doubly linked lists, understanding the edge cases for each.",
          resources: [
            { name: "Linked List Operations", type: "Interactive Demo" },
            { name: "Implementing a Custom Linked List", type: "Tutorial" }
          ]
        },
        {
          question: "How do I solve the slow/fast pointer problems?",
          answer: "Master the two-pointer technique specifically for linked lists. Use cases include: finding cycles, finding the middle node, finding the nth node from the end, and determining if a linked list is a palindrome. The key insight is how to use different pointer speeds.",
          resources: [
            { name: "Fast & Slow Pointers Explained", type: "Video" },
            { name: "Cycle Detection Algorithms", type: "Article" }
          ]
        },
        {
          question: "What are the common mistakes in linked list problems?",
          answer: "Watch for: not handling null pointers, losing the head reference, not updating next pointers correctly during manipulations, and edge cases with single nodes. Always trace through examples with 0, 1, and multiple nodes when testing your solution.",
          resources: [
            { name: "Common Linked List Pitfalls", type: "Cheatsheet" },
            { name: "Debugging Linked List Code", type: "Workshop" }
          ]
        },
        {
          question: "When should I use linked lists vs. arrays?",
          answer: "Choose linked lists when you need efficient insertions/deletions in the middle of the sequence, when the size is dynamic and unpredictable, or when memory allocation needs to be flexible. Arrays are better for random access, cache locality, and when the size is known ahead of time.",
          resources: [
            { name: "Data Structure Selection Guide", type: "Decision Tree" },
            { name: "Performance Trade-offs", type: "Benchmark Analysis" }
          ]
        }
      ]
    },
    {
      id: "trees",
      title: "Trees & BSTs",
      description: "Hierarchical data and binary search properties",
      icon: <Star className="h-6 w-6" />,
      color: "from-yellow-500 to-amber-500",
      difficulty: "Intermediate",
      timeToMaster: "3-4 weeks",
      sections: [
        {
          question: "What traversal methods should I know for trees?",
          answer: "Master all traversal types: pre-order, in-order, post-order, and level-order (BFS). Implement them both recursively and iteratively using stacks and queues. Understand the time and space complexity of each approach and when to use which traversal strategy based on the problem.",
          resources: [
            { name: "Tree Traversal Techniques", type: "Visualization" },
            { name: "Implementing Tree Traversals", type: "Code Examples" }
          ]
        },
        {
          question: "How do I use Binary Search Tree properties effectively?",
          answer: "Leverage the BST property that all left subtree values are less than the node value, and all right subtree values are greater. This enables efficient searching, insertion, and deletion in O(log n) time. Practice problems involving validation, searching, and constructing BSTs.",
          resources: [
            { name: "BST Operations Deep Dive", type: "Tutorial" },
            { name: "Self-balancing BSTs", type: "Article" }
          ]
        },
        {
          question: "What advanced tree problems should I practice?",
          answer: "Focus on: lowest common ancestor, path sum problems, constructing trees from traversals, serialization/deserialization, balanced tree validation, and tree diameter calculation. These problems test your understanding of recursion and tree properties.",
          resources: [
            { name: "Advanced Tree Problems", type: "Problem Set" },
            { name: "Tree Interview Questions", type: "Video Series" }
          ]
        },
        {
          question: "When should I use specialized tree structures?",
          answer: "Learn about AVL trees and Red-Black trees for self-balancing requirements, B-trees for disk-based operations, Tries for prefix searching, and Segment trees for range queries. Each specialized structure has optimal use cases based on operation frequencies and constraints.",
          resources: [
            { name: "Specialized Tree Structures", type: "Comparative Guide" },
            { name: "Implementing a Trie", type: "Tutorial" }
          ]
        }
      ]
    },
    {
      id: "graphs",
      title: "Graphs & Search",
      description: "Network relationships and traversal algorithms",
      icon: <MapPin className="h-6 w-6" />,
      color: "from-red-500 to-orange-500",
      difficulty: "Intermediate-Advanced",
      timeToMaster: "4-6 weeks",
      sections: [
        {
          question: "How should I represent graphs in code?",
          answer: "Master both adjacency list (space-efficient for sparse graphs) and adjacency matrix (efficient for dense graphs) representations. Understand how to convert between problem descriptions and these representations, and how to handle directed vs undirected and weighted vs unweighted graphs.",
          resources: [
            { name: "Graph Representations", type: "Interactive Demo" },
            { name: "Implementing Graph Data Structures", type: "Tutorial" }
          ]
        },
        {
          question: "What are the key graph traversal algorithms?",
          answer: "Implement Breadth-First Search (BFS) for shortest path in unweighted graphs and exploring level by level. Master Depth-First Search (DFS) for exploring paths, cycles, and connected components. For weighted graphs, understand Dijkstra's and Bellman-Ford algorithms.",
          resources: [
            { name: "Graph Traversal Algorithms", type: "Animation" },
            { name: "Shortest Path Algorithms", type: "Comparative Analysis" }
          ]
        },
        {
          question: "What specialized graph algorithms should I know?",
          answer: "Learn these fundamental algorithms: Topological Sort (for dependency ordering), Union-Find (for disjoint sets), Minimum Spanning Tree algorithms (Kruskal's and Prim's), and Floyd-Warshall (for all-pairs shortest paths). Practice identifying which algorithm fits which problem type.",
          resources: [
            { name: "Advanced Graph Algorithms", type: "Course" },
            { name: "Network Flow Problems", type: "Case Studies" }
          ]
        },
        {
          question: "How do I recognize and solve graph problems?",
          answer: "Look for keywords like 'network', 'connection', 'path', or problems involving relationships between entities. Common graph problem patterns include connectivity checks, cycle detection, path finding, and network flow. Convert the problem description to a graph structure before applying algorithms.",
          resources: [
            { name: "Graph Problem Recognition", type: "Pattern Guide" },
            { name: "Real-world Graph Applications", type: "Examples" }
          ]
        }
      ]
    },
    {
      id: "dp",
      title: "Dynamic Programming",
      description: "Optimize recursive problems with memoization",
      icon: <Bookmark className="h-6 w-6" />,
      color: "from-pink-500 to-rose-500",
      difficulty: "Advanced",
      timeToMaster: "6-8 weeks",
      sections: [
        {
          question: "How do I recognize when to use dynamic programming?",
          answer: "Look for these indicators: overlapping subproblems, optimal substructure (solution can be built from optimal solutions to subproblems), and problems asking for optimization (maximum/minimum) or counting possibilities. Common examples include sequence alignment, knapsack problems, and counting arrangements.",
          resources: [
            { name: "Dynamic Programming Patterns", type: "Identification Guide" },
            { name: "DP Problem Recognition", type: "Quiz" }
          ]
        },
        {
          question: "What approach should I take to solve DP problems?",
          answer: "Follow this framework: 1) Define subproblems and state clearly. 2) Find the recurrence relation between states. 3) Identify base cases. 4) Decide between top-down (memoization) or bottom-up (tabulation) approaches. 5) Analyze time and space complexity. Practice translating recursive solutions to DP.",
          resources: [
            { name: "DP Problem Solving Framework", type: "Methodology" },
            { name: "Memoization vs Tabulation", type: "Comparative Analysis" }
          ]
        },
        {
          question: "Which DP patterns should I master?",
          answer: "Focus on these patterns: 1D array problems (like house robber), 2D matrix problems (like grid traversal), subsequence problems (like longest common subsequence), knapsack variations, string problems (like edit distance), and decision making problems (like coin change).",
          resources: [
            { name: "Common DP Patterns", type: "Catalog" },
            { name: "Pattern-based DP Solutions", type: "Video Series" }
          ]
        },
        {
          question: "How do I optimize dynamic programming solutions?",
          answer: "Apply these optimization techniques: state reduction (minimizing what you need to track), space optimization (rolling arrays to reduce dimensions), precalculation of values, and using mathematical insights to simplify recurrence relations. Always look for redundant calculations that can be eliminated.",
          resources: [
            { name: "DP Optimization Techniques", type: "Advanced Guide" },
            { name: "Space-optimized DP Solutions", type: "Examples" }
          ]
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      description: "Specialized techniques for complex problems",
      icon: <Trophy className="h-6 w-6" />,
      color: "from-violet-500 to-purple-500",
      difficulty: "Expert",
      timeToMaster: "8+ weeks",
      sections: [
        {
          question: "What advanced data structures should I learn?",
          answer: "Master these specialized structures: Trie (for prefix problems and autocomplete), Segment Tree (for range queries), Fenwick Tree/BIT (for prefix sums with updates), Disjoint Set Union (for merging operations), and various heap implementations for priority queue operations.",
          resources: [
            { name: "Advanced Data Structures", type: "Comprehensive Guide" },
            { name: "Specialized Tree Implementations", type: "Code Library" }
          ]
        },
        {
          question: "How do I approach hard algorithm problems?",
          answer: "For challenging problems: 1) Break down into simpler subproblems you recognize. 2) Consider multiple approaches and evaluate trade-offs. 3) Look for mathematical insights or invariants. 4) Think about precomputation or preprocessing. 5) Consider amortized analysis for complex operations.",
          resources: [
            { name: "Complex Algorithm Design", type: "Case Studies" },
            { name: "Competitive Programming Techniques", type: "Advanced Course" }
          ]
        },
        {
          question: "What are some specialized algorithms I should know?",
          answer: "Study these advanced techniques: String algorithms (KMP, Z-algorithm, suffix arrays), computational geometry algorithms (convex hull, line sweep), number theory algorithms (primality testing, modular arithmetic), and randomized algorithms (Monte Carlo, Las Vegas methods).",
          resources: [
            { name: "Specialized Algorithm Collection", type: "Reference" },
            { name: "Algorithm Design Manual", type: "Book" }
          ]
        },
        {
          question: "How do I prepare for system design alongside DSA?",
          answer: "While mastering DSA, also focus on: distributed systems concepts, database design, API design, caching strategies, load balancing techniques, and microservices architecture. Practice explaining both the algorithm efficiency and system-level design decisions in your solutions.",
          resources: [
            { name: "System Design Fundamentals", type: "Course" },
            { name: "Architecture Patterns", type: "Reference Guide" }
          ]
        }
      ]
    }
  ];
  
  // Toggle section expansion
  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Gradient text utility
  const gradientText = (text, gradient) => (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{text}</span>
  );
  
  // Resource badge component
  const ResourceBadge = ({ type }) => {
    const getIcon = () => {
      switch(type) {
        case 'Article': return <BookOpen className="h-3 w-3" />;
        case 'Video': case 'Video Series': return <MessageSquare className="h-3 w-3" />;
        case 'Course': case 'Workshop': return <ListChecks className="h-3 w-3" />;
        default: return <ExternalLink className="h-3 w-3" />;
      }
    };
    
    return (
      <Badge variant="outline" className="flex items-center gap-1 text-xs py-1 border-gray-700">
        {getIcon()}
        <span>{type}</span>
      </Badge>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-[#1a1a28] to-[#1e1e2e] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMDAgMCBMIDAgMCAwIDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwOCwgOTIsIDIzMSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30 -z-10"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-[120px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
      
      {/* Main content container */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-block mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-4 py-1.5 bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 backdrop-blur-sm rounded-full border border-indigo-500/20">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 font-medium">
                <MapPin className="inline-block w-4 h-4 mr-2 mb-1" />
                Complete Learning Roadmap
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-white">The </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Data Structures & Algorithms</span>
            <span className="text-white"> Guide</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive roadmap from beginner to expert, with essential knowledge, common questions,
            expert answers, and recommended resources for each topic.
          </p>
        </motion.div>
        
        {/* Timeline with steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 via-cyan-500 to-purple-500 rounded opacity-30"></div>
          
          {/* Roadmap steps */}
          <div className="space-y-12">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 * index }}
                className="relative"
              >
                {/* Step marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div 
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                
                {/* Step content */}
                <motion.div 
                  className={`bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-xl ${
                    index % 2 === 0 ? 'ml-auto mr-0 sm:mr-auto sm:ml-0 sm:pr-24' : 'mr-auto ml-0 sm:ml-auto sm:mr-0 sm:pl-24'
                  }`}
                  style={{ width: '94%', maxWidth: 'calc(100% - 40px)', margin: '0 auto' }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Card className="bg-transparent border-0 shadow-none">
                    <div 
                      className={`p-1 ${expandedSection === step.id ? 'bg-gradient-to-r ' + step.color + ' rounded-t-xl' : ''}`}
                    >
                      <div 
                        className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer rounded-t-xl 
                        ${expandedSection === step.id ? 'bg-gray-900/90' : 'bg-transparent hover:bg-gray-800/50'}`} 
                        onClick={() => toggleSection(step.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                            <Badge
                              className={`bg-gradient-to-r ${step.color} border-0 text-white`}
                            >
                              {step.difficulty}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mt-1">{step.description}</p>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                          <div className="text-gray-400 text-sm hidden sm:block">
                            Est. Time: <span className="text-indigo-400 font-medium">{step.timeToMaster}</span>
                          </div>
                          
                          <div className="p-1.5 rounded-full bg-gray-700/50">
                            {expandedSection === step.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-300" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-300" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expandable content */}
                    {expandedSection === step.id && (
                      <CardContent className="pt-6 pb-6 bg-gray-900/90">
                        <Accordion type="single" collapsible className="divide-y divide-gray-800">
                          {step.sections.map((section, sectionIndex) => (
                            <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`} className="border-none">
                              <AccordionTrigger className="py-4 text-left hover:no-underline">
                                <div className="flex items-start">
                                  <span className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-1.5 rounded-md mr-3">
                                    <MessageSquare className="h-4 w-4" />
                                  </span>
                                  <div className="text-gray-100 font-medium">{section.question}</div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-300 pb-6 pt-2 pl-12">
                                <p className="leading-relaxed">{section.answer}</p>
                                
                                {section.resources && section.resources.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-gray-800">
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">Recommended Resources:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {section.resources.map((resource, i) => (
                                        <div key={i} className="flex items-center bg-gray-800/50 px-3 py-2 rounded-md">
                                          <span className="text-white text-sm mr-2">{resource.name}</span>
                                          <ResourceBadge type={resource.type} />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                        
                        <div className="mt-6 pt-6 border-t border-gray-800">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                              <span className="text-white font-medium">Pro Tip:</span> Complete all sections before moving to the next topic for best results
                            </div>
                            <Button className="bg-gray-800 hover:bg-gray-700 text-white text-sm">
                              View Practice Problems
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 backdrop-blur-md p-8 rounded-xl border border-indigo-500/20">
            <h3 className="text-3xl font-bold mb-4">
              {gradientText("Ready to Test Your Knowledge?", "from-indigo-400 to-cyan-400")}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Access hundreds of carefully curated practice problems organized by topic and difficulty level. 
              Reinforce your learning with step-by-step solutions and expert explanations.
            </p>
            <Button className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white px-8 py-3 rounded-full text-lg font-medium">
              Start Practicing Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}