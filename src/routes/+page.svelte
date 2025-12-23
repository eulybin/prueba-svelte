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
				{#each products as product}
					<button onclick={() => addProduct(product)}>
						<span>{product.name}</span>
						<span>€{product.price.toFixed(2)}</span>
					</button>
				{/each}
			</div>
		</section>

		<!-- SHOPPING CART -->
		<section>
			<h2>Shopping Cart</h2>
			<div>
				{#if cart.length === 0}
					<p>No products in the cart</p>
				{:else}
					<ul>
						{#each cart as item (item.id)}
							<li>
								<div>
									<span>{item.name}</span>
									<span>€{item.price.toFixed(2)}</span>
									{#if item.quantity > 1}
										<span>x{item.quantity}</span>
									{/if}
								</div>
								<button onclick={() => removeProduct(item.id)}> Remove </button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div>
				<div>
					<span>Total:</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>
		</section>
	</div>
</div>
