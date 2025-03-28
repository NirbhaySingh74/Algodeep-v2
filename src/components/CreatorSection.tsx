"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Github, Mail, Briefcase, Code, Server, Database } from "lucide-react";
import profilePic from "../../public/profilePic.webp";

export default function CreatorSection() {
  return (
    <section className="py-16 bg-[#1e1e2e] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#8e74fd]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

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
                  href="https://www.linkedin.com/in/nirbhay-singh-b8a169207/"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://github.com/NirbhaySingh74"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="mailto:nkumarwork7@gmail.com"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Email me"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
              
              <motion.div
                className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-white text-lg font-medium mb-3">Portfolio</h4>
                <motion.a
                  href="https://www.nirbhay.work/"
                  target="_blank"
                  className="flex items-center text-[#a0a0b0] hover:text-[#6c5ce7] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2">View Full Portfolio</span>
                  <Briefcase className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </div>

            <div className="lg:w-2/3">
              <p className="text-[#a0a0b0] mb-4 leading-relaxed">
                As a passionate Computer Science graduate from LNCT University, I bring a dynamic blend of technical expertise and innovative problem-solving skills to the world of web development.
              </p>
              <p className="text-[#a0a0b0] mb-4 leading-relaxed">
                My technical arsenal spans the entire web development spectrum, with deep expertise in the MERN stack and modern frameworks like Next.js. I craft scalable, performant applications that seamlessly blend elegant design with robust functionality.
              </p>
              <p className="text-[#a0a0b0] mb-4 leading-relaxed">
                Beyond technical skills, I'm a creative problem-solver who thrives on transforming complex challenges into elegant, user-centric solutions. My approach combines technical precision with a passion for creating impactful digital experiences.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] flex flex-col items-center">
                  <div className="bg-[#6c5ce7]/20 p-3 rounded-full mb-2">
                    <Code className="h-6 w-6 text-[#6c5ce7]" />
                  </div>
                  <h4 className="text-white font-medium text-center mb-1">Frontend</h4>
                  <p className="text-[#a0a0b0] text-sm text-center">React, Next.js, Tailwind</p>
                </div>
                <div className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] flex flex-col items-center">
                  <div className="bg-[#6c5ce7]/20 p-3 rounded-full mb-2">
                    <Server className="h-6 w-6 text-[#6c5ce7]" />
                  </div>
                  <h4 className="text-white font-medium text-center mb-1">Backend</h4>
                  <p className="text-[#a0a0b0] text-sm text-center">Node.js, Express</p>
                </div>
                <div className="bg-[#1e1e2e] p-4 rounded-lg border border-[#3d3d5c] flex flex-col items-center">
                  <div className="bg-[#6c5ce7]/20 p-3 rounded-full mb-2">
                    <Database className="h-6 w-6 text-[#6c5ce7]" />
                  </div>
                  <h4 className="text-white font-medium text-center mb-1">Databases</h4>
                  <p className="text-[#a0a0b0] text-sm text-center">MongoDB, PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}