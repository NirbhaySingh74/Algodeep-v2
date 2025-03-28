"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Github, Mail, Briefcase } from "lucide-react";
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
                className="w-52 h-52 relative rounded-xl overflow-hidden border-2 border-[#6c5ce7]/50 shadow-lg mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={profilePic}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 208px"
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
                <motion.a
                  href="https://www.nirbhay.work/"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors border border-[#3d3d5c]"
                  whileHover={{ scale: 1.1, backgroundColor: "#6c5ce7", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Portfolio"
                >
                  <Briefcase className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            <div className="lg:w-2/3">
              <p className="text-[#a0a0b0] mb-4 leading-relaxed">
              I'm Nirbhay, a Full Stack Developer with a passion for building scalable, high-performance web applications. As a Computer Science graduate from LNCT University, I specialize in the MERN stack and modern frameworks like Next.js, crafting seamless, user-centric digital experiences.
              </p>
              <p className="text-[#a0a0b0] mb-4 leading-relaxed">
              With a strong foundation in both frontend and backend development, I thrive on solving complex challenges with clean, efficient code. My expertise extends beyond just writing code—I focus on building robust, intuitive, and visually engaging applications that drive real impact.
              </p>
              <p className="text-[#a0a0b0] mb-4 leading-relaxed">
              Currently, I'm looking for opportunities to contribute my skills and grow in a dynamic environment. Let's build something amazing together!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}