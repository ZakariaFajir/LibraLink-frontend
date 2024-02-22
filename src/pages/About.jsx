import React from "react";
import image from "../assets/images/biblio.png";

const About = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center h-screen  text-gray-900">
        <div className="text-left bg-slate-300 bg-opacity-60 p-3">
          <h1 className="text-3xl font-bold mb-4">À Propos de Biblio</h1>
          <p className="text-lg text-gray-700 font-medium">
            Explorez l'univers captivant de Biblio, où chaque produit est
            soigneusement sélectionné pour enrichir votre expérience de lecture.
            Notre collection comprend des articles allant de stylos élégants à
            des étagères en bois massif, conçus pour les amoureux des livres.
          </p>
          <p className="text-lg mt-4 text-gray-700 font-medium">
            Chez Biblio, nous croyons que chaque accessoire a le pouvoir de
            rendre vos moments de lecture encore plus spéciaux. Découvrez notre
            gamme variée et trouvez des pièces uniques qui reflètent votre
            passion pour les livres.
          </p>
          <p className="text-lg mt-4 text-gray-700 font-medium">
            Nous nous engageons à offrir des produits de qualité qui complètent
            votre bibliothèque personnelle. Parcourez notre collection en
            constante évolution et trouvez des trésors qui ajouteront une touche
            distinctive à votre espace de lecture.
          </p>
          <p className="text-lg mt-4 text-gray-700 font-medium">
            Bienvenue chez Biblio, où chaque article raconte une histoire et
            transforme votre expérience de lecture en un voyage encore plus
            mémorable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
