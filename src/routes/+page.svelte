<script lang="ts">
	import { products, type Product } from '../data/products.ts';

	type CartItem = Product & { quantity: number };

	let cart = $state<CartItem[]>([]);
	let total = $derived(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));

	const addProduct = (product: Product) => {
		const currentProd = cart.find((p) => p.id === product.id);
		if (currentProd) {
			currentProd.quantity += 1;
		} else {
			cart = [...cart, { ...product, quantity: 1 }];
		}
	};

	const removeProduct = (id: number) => {
		const currentProd = cart.find((p) => p.id === id);
		if (currentProd) {
			if (currentProd.quantity > 1) {
				currentProd.quantity -= 1;
			} else {
				cart = cart.filter((p) => p.id !== id);
			}
		}
	};
</script>

<div>
	<h1>Fruit Shop</h1>

	<div>
		<section>
			<h2>Available Products</h2>
			<div>
				<span>for each here</span>
			</div>
		</section>

		<!-- SHOPPING CART -->
		<section>
			<h2>Shopping Cart</h2>
			<div>
				<ul>Selected products</ul>
			</div>
			<div>
				<div>
					<span>Total:</span>
				</div>
			</div>
		</section>
	</div>
</div>
