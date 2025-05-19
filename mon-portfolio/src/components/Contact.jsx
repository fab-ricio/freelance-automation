import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="w-full py-8 sm:py-12 md:py-20 px-2 sm:px-4 md:px-8 bg-transparent text-white">
      <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center">Me Contacter</h2>
      <motion.form
        className="max-w-xs sm:max-w-lg md:max-w-xl mx-auto bg-white/10 p-4 sm:p-8 rounded-lg shadow-lg space-y-4 sm:space-y-6 border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <label className="block mb-2 font-medium text-xs sm:text-base">Nom</label>
          <input
            type="text"
            className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-md bg-gray-50/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-base"
            placeholder="Ton nom"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-xs sm:text-base">Email</label>
          <input
            type="email"
            className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-md bg-gray-50/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-base"
            placeholder="ton@email.com"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-xs sm:text-base">Message</label>
          <textarea
            rows="4"
            className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-md bg-gray-50/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-base"
            placeholder="Écris ton message ici..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-md transition w-full sm:w-auto text-xs sm:text-base"
        >
          Envoyer
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
