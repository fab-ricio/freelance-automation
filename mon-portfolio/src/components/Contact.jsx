import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Me Contacter</h2>
      <motion.form
        className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <label className="block mb-2 font-medium">Nom</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Ton nom"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="ton@email.com"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Message</label>
          <textarea
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Écris ton message ici..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Envoyer
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
