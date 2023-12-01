import React from "react";

const Contact = () => {
  return (
    <div className="bg-slate-300 text-gray-800 min-h-screen flex items-center justify-center">
      <div className="text-center bg-slate-200 p-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg mb-8">
          Nous serions ravis d'avoir de vos nouvelles. Envoyez-nous un message !
        </p>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded-md"
              placeholder="Votre Nom complet"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg mb-2">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded-md"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-2 border rounded-md resize-none"
              placeholder="Votre message ici..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
