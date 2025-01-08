import { useCart } from "../CartContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./panier.css";

const Panier = () => {
	const { cart, onRemoveItem, increaseQuantity, decreaseQuantity } = useCart(); // Utiliser le contexte du panier
	const total = cart.reduce(
		(acc, item) => acc + item.prix * (item.quantity ?? 0),
		0,
	);
	const tva = total * 0.2; // calcul de la TVA à 20%

	return (
		<div>
			<Header />
			<div className="panier">
				<h1>Votre Panier</h1>

				{cart.length === 0 ? (
					<p>Votre panier est vide.</p>
				) : (
					<div className="produit">
						{cart.map((item) => (
							<div key={item.id}>
								{item.image_url && (
									<img src={item.image_url} alt={item.nom} width="100" />
								)}
								<h2>{item.nom}</h2>
								<p>Prix: {item.prix} €</p>
								<p>Quantité: {item.quantity}</p>
								<button type="button" onClick={() => decreaseQuantity(item.id)}>
									-
								</button>
								<button type="button" onClick={() => increaseQuantity(item.id)}>
									+
								</button>
								<button type="button" onClick={() => onRemoveItem(item.id)}>
									Retirer
								</button>
							</div>
						))}
					</div>
				)}

				<div className="total">
					{cart.length > 0 && (
						<>
							<h2>Total: {total.toFixed(2)} €</h2>
							<h2>TVA: {tva.toFixed(2)} €</h2>
							<h2>Total à payer: {(total + tva).toFixed(2)} €</h2>
						</>
					)}
					<div>
						<h3>Mode de paiement</h3>
						<select>
							<option value="credit-card">Carte de crédit</option>
							<option value="paypal">PayPal</option>
							<option value="bank-transfer">Virement bancaire</option>
						</select>
					</div>
					<form>
						<label>
							Nom :
							<input type="text" name="lastName" />
						</label>
						<label>
							Prénom :
							<input type="text" name="firstName" />
						</label>
					</form>
					<label htmlFor="meeting-time">
						Choisissez la date et l'heure de votre retrait:
					</label>
					<br />
					<input
						type="datetime-local"
						id="meeting-time"
						name="meeting-time"
						value="2024-11-29T10:00"
						min="2024-11-29T00:00"
						max="2024-12-31T00:00"
					/>
					<p>
						Veuillez retirer votre commande en boutique muni d'une pièce
						d'identité.
					</p>
					<button type="button">Valider la commande</button>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Panier;
