import { useEffect, useState } from "react";
import CardsProduits from "../Cards/CardsProduits";
import { useCart } from "../CartContext";

interface Produit {
  id: number;
  image_url: string;
  nom: string;
  description: string;
  prix: number;
  quantity: number;
}

const Produits = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [favoris, setFavoris] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { addToCart } = useCart(); // Utilisation du hook du contexte

  useEffect(() => {
    fetch("https://api-strasbouq.vercel.app/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          setProduits(result);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        },
      );
  }, []);

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const savedFavoris = JSON.parse(localStorage.getItem("favoris") || "[]");
    setFavoris(savedFavoris);
  }, []);

  // Ajouter un produit au panier via le contexte
  const handleAddToCart = (produit: Produit) => {
    addToCart(produit);
    alert(`Produit ajouté au panier: ${produit.nom}`);
  };

  // Ajouter ou retirer un produit des favoris
  const handleToggleFavorite = (produit: Produit) => {
    const updatedFavoris = favoris.some((fav) => fav.id === produit.id)
      ? favoris.filter((fav) => fav.id !== produit.id)
      : [...favoris, produit];

    setFavoris(updatedFavoris);

    // Sauvegarder dans localStorage
    localStorage.setItem("favoris", JSON.stringify(updatedFavoris));
  };

  return (
    <div className="produit-container">
      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div>Erreur: {error.message}</div>
      ) : (
        produits.map((produit) => (
          <CardsProduits
            key={produit.id}
            produits={produit}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={() => handleAddToCart(produit)}
            isFavorite={favoris.some((fav) => fav.id === produit.id)}
          />
        ))
      )}
    </div>
  );
};

export default Produits;
