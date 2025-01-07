import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="footer-section font-Roboto w-auto bg-primaryColor h-auto lg:py-20 lg:mt-12 sm:mt-10 mt-10 px-4"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-6 grid-cols-1 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primaryColor about_section font-Roboto col-span-5 justify-center"
          >
            <h1 className="text-xl py-1">Tanuj Pandey</h1>
            <p className="text-base py-1 lg:w-2/3">
              A Frontend focused Web Developer building the Frontend of Websites and
              Web Applications that leads to the success of the overall product
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-primaryColor font-Roboto col-span-1"
          >
            <h1 className="text-2xl py-1 font-bold uppercase">Social</h1>
            <div className="py-1">
              <div className="pt-2 pb-2 flex gap-6 w-3/5">
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:shadow-xl hover:text-purple-500 transition-all"
                  target="_blank"
                >
                  <FaInstagram size={30} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:shadow-xl hover:text-purple-500 transition-all"
                  href="https://github.com/TanujPandey09"
                  target="_blank"
                >
                  <FaGithub size={30} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:shadow-xl hover:text-purple-500 transition-all"
                  href="https://www.linkedin.com/in/tanujp09/"
                  target="_blank"
                >
                  <FaLinkedin size={30} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="main-footer__lower border border-r-0 border-l-0 border-b-0 pt-8 text-center text-white"
        >
          © Copyright 2024 . Made by
          <a
            rel="noreferrer"
            target="_blank"
            href="https://tanujportfoliodev.netlify.app/"
            className="hover:text-purple-500 underline"
          >
            Tanuj Pandey
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
