"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Youtube, Twitter, Github } from "lucide-react";
import profilePic from "../../public/profilePic.webp";

export default function CreatorSection() {
  return (
    <section className="py-20 bg-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Meet the Creator
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto bg-[#292942] rounded-2xl p-8 border border-[#3d3d5c]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-48 h-48 relative rounded-xl overflow-hidden border-2 border-[#6c5ce7]/50">
              <Image
                src={profilePic}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Nirbhay Singh
              </h3>
              <p className="text-[#a0a0b0] mb-4">
                Hi! I'm a software engineer passionate about helping others
                excel in coding interviews and level up their Software
                Engineering career.
              </p>
              <p className="text-[#a0a0b0] mb-6">
                After solving 1000s of coding problems across multiple platforms
                and going through countless technical interviews myself, I
                created AlgoMaster.io to help make the learning process more
                systematic and enjoyable for everyone.
              </p>

              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Youtube className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#292942] flex items-center justify-center text-[#a0a0b0] hover:bg-[#6c5ce7] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
