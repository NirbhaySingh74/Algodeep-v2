"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Linkedin, Github, Mail, ExternalLink, Code, BookOpen, Briefcase, User } from "lucide-react";
import profilePic from "../../public/profilePic.webp";

export default function CreatorSection() {
  const [activeTab, setActiveTab] = useState("about");
  
  const tabs = [
    { id: "about", label: "About Me", icon: <User className="h-4 w-4 mr-2" /> },
    { id: "skills", label: "Skills", icon: <Code className="h-4 w-4 mr-2" /> },
    { id: "projects", label: "Projects", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { id: "contact", label: "Contact", icon: <Mail className="h-4 w-4 mr-2" /> },
  ];
  
  const skills = [
    { name: "Frontend Development", level: 90 },
    { name: "Backend Development", level: 85 },
    { name: "Database Management", level: 80 },
    { name: "Data Structures & Algorithms", level: 75 },
    { name: "UI/UX Design", level: 70 },
  ];
  
  const technologies = [
    { name: "React.js", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "HTML/CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "MongoDB", category: "database" },
    { name: "PostgreSQL", category: "database" },
    { name: "Supabase", category: "database" },
    { name: "Git", category: "tools" },
  ];
  
  const projects = [
    {
      title: "LeetCode Problem Organizer",
      description: "Current platform categorizing LeetCode problems by topic and company for efficient preparation.",
      tech: "Next.js, Tailwind CSS, Supabase",
      url: "#"
    },
    {
      title: "E-Commerce Dashboard",
      description: "Full-stack application with user authentication, product management, and analytics.",
      tech: "MERN Stack, Chart.js",
      url: "#"
    },
    {
      title: "Personal Portfolio",
      description: "Responsive portfolio website showcasing projects and skills.",
      tech: "React, Framer Motion, Tailwind CSS",
      url: "#"
    }
  ];

  return (
    <section className="py-16 bg-[#1e1e2e] overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#6c5ce7]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#6c5ce7]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#8e74fd]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About the Developer
        </motion.h2>
        
        <motion.p 
          className="text-[#a0a0b0] text-center max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          The creator behind this platform, helping you excel in technical interviews
        </motion.p>

        <motion.div
          className="max-w-5xl mx-auto bg-[#292942]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#3d3d5c] shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex flex-col items-center">
              <motion.div 
                className="w-40 h-40 relative rounded-xl overflow-hidden border-2 border-[#6c5ce7]/50 shadow-lg mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={profilePic}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e2e]/80 to-transparent"></div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-2 text-white text-center">
                Nirbhay Singh
              </h3>
              <p className="text-[#6c5ce7] font-medium mb-6 text-center">
                Full Stack Developer
              </p>

              <div className="flex space-x-3 mb-8">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="mailto:your.email@example.com"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Email me"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
              
              <motion.div
                className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] w-full hidden lg:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-white text-lg font-medium mb-3">Education</h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-[#6c5ce7] pl-3">
                    <p className="text-white font-medium">B.Tech in Computer Science</p>
                    <p className="text-[#a0a0b0] text-sm">LNCT University</p>
                    <p className="text-[#a0a0b0] text-sm">2020 - 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-2/3">
              <div className="mb-6 border-b border-[#3d3d5c]">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#6c5ce7] text-white"
                          : "bg-[#1e1e2e] text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === "about" && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#a0a0b0] mb-4 leading-relaxed">
                        Hello! I'm a recent Computer Science graduate from LNCT University (2024 batch) with a passion for web development and problem-solving.
                      </p>
                      <p className="text-[#a0a0b0] mb-4 leading-relaxed">
                        I specialize in full-stack development using the MERN stack (MongoDB, Express.js, React.js, Node.js), as well as modern frameworks like Next.js and database solutions like PostgreSQL and Supabase.
                      </p>
                      <p className="text-[#a0a0b0] mb-4 leading-relaxed">
                        Currently, I'm actively seeking opportunities as a Full Stack Developer, Frontend Developer, or Backend Developer where I can apply my technical skills and continue growing as a professional.
                      </p>
                      
                      <div className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] mt-6">
                        <div className="flex items-start">
                          <div className="bg-[#6c5ce7]/20 p-2 rounded mr-4">
                            <Briefcase className="h-5 w-5 text-[#6c5ce7]" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">What I'm Looking For</h4>
                            <p className="text-[#a0a0b0] text-sm">
                              I'm passionate about creating user-friendly applications and solving complex problems. I'm looking for a team where I can contribute my skills while continuing to learn and grow.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "skills" && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <p className="text-[#a0a0b0] mb-4">
                        My technical expertise covers both frontend and backend development, with a focus on modern JavaScript frameworks and databases.
                      </p>
                      
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <motion.div 
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white">{skill.name}</span>
                              <span className="text-[#6c5ce7] font-medium">{skill.level}%</span>
                            </div>
                            <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-[#6c5ce7] to-[#8e74fd]"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                              ></motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-white font-medium mb-3">Technologies</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {technologies.map((tech, index) => (
                            <motion.div 
                              key={tech.name}
                              className="bg-[#1e1e2e] px-3 py-2 rounded border border-[#3d3d5c] text-[#a0a0b0] text-sm flex items-center"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                            >
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                tech.category === 'frontend' ? 'bg-blue-400' :
                                tech.category === 'backend' ? 'bg-green-400' :
                                tech.category === 'database' ? 'bg-yellow-400' : 'bg-purple-400'
                              }`}></span>
                              {tech.name}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "projects" && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#a0a0b0] mb-6">
                        Here are some of my recent projects that showcase my technical skills and problem-solving abilities:
                      </p>
                      
                      <div className="space-y-4">
                        {projects.map((project, index) => (
                          <motion.div
                            key={project.title}
                            className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] hover:border-[#6c5ce7] transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="text-white font-medium mb-2">{project.title}</h4>
                              <a href={project.url} className="text-[#6c5ce7] hover:text-white transition-colors">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                            <p className="text-[#a0a0b0] mb-3 text-sm">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.split(', ').map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-[#6c5ce7]/10 text-[#6c5ce7] text-xs rounded-md">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        className="mt-8 py-4 px-5 bg-[#6c5ce7]/10 border border-[#6c5ce7]/20 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="flex items-center">
                          <Github className="h-5 w-5 text-[#6c5ce7] mr-3" />
                          <h4 className="text-white font-medium">More Projects</h4>
                        </div>
                        <p className="text-[#a0a0b0] mt-2 text-sm">
                          Check out my GitHub profile to see more of my projects and contributions.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === "contact" && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <p className="text-[#a0a0b0] mb-4">
                        I'm currently open to job opportunities in full-stack, frontend, or backend development. Feel free to reach out!
                      </p>
                      
                      <motion.a
                        href="mailto:your.email@example.com"
                        className="block bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] hover:border-[#6c5ce7] transition-colors group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center">
                          <div className="bg-[#6c5ce7]/20 p-2 rounded mr-4">
                            <Mail className="h-5 w-5 text-[#6c5ce7]" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium group-hover:text-[#6c5ce7] transition-colors">Email</h4>
                            <p className="text-[#a0a0b0] text-sm">nkumarwork7@gmail.com</p>
                          </div>
                        </div>
                      </motion.a>
                      
                      <motion.a
                        href="https://www.linkedin.com/in/nirbhay-singh-b8a169207/"
                        className="block bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] hover:border-[#6c5ce7] transition-colors group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center">
                          <div className="bg-[#6c5ce7]/20 p-2 rounded mr-4">
                            <Linkedin className="h-5 w-5 text-[#6c5ce7]" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium group-hover:text-[#6c5ce7] transition-colors">LinkedIn</h4>
                            <p className="text-[#a0a0b0] text-sm">Connect with me on Linkdin</p>
                          </div>
                        </div>
                      </motion.a>
                      
                      <motion.a
                        href="https://github.com/NirbhaySingh74"
                        className="block bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] hover:border-[#6c5ce7] transition-colors group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center">
                          <div className="bg-[#6c5ce7]/20 p-2 rounded mr-4">
                            <Github className="h-5 w-5 text-[#6c5ce7]" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium group-hover:text-[#6c5ce7] transition-colors">GitHub</h4>
                            <p className="text-[#a0a0b0] text-sm">View my code and contributions</p>
                          </div>
                        </div>
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}