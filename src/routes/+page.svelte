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

<div class="p-4">
	<h1 class="mb-4 text-xl font-bold">Fruit Shop</h1>

	<div class="grid gap-4 md:grid-cols-2">
		<section class="border p-4">
			<h2 class="mb-2 font-bold">Available Products</h2>
			<div class="flex flex-col space-y-2">
				{#each products as product}
					<button
						onclick={() => addProduct(product)}
						class="flex justify-between border p-2 {product.color} text-white"
					>
						<span>{product.name}</span>
						<span>€{product.price.toFixed(2)}</span>
					</button>
				{/each}
			</div>
		</section>

		<!-- SHOPPING CART -->
		<section class="border p-4">
			<h2 class="mb-2 font-bold">Shopping Cart</h2>
			<div class="mb-4">
				{#if cart.length === 0}
					<p>No products in the cart</p>
				{:else}
					<ul class="space-y-2">
						{#each cart as item (item.id)}
							<li class="flex justify-between pb-2">
								<div>
									<span>{item.name}</span>
									<span class="ml-2">€{item.price.toFixed(2)}</span>
									{#if item.quantity > 1}
										<span class="ml-2 rounded bg-gray-200 p-1">x{item.quantity}</span>
									{/if}
								</div>
								<button
									onclick={() => removeProduct(item.id)}
									class="bg-red-500 px-2 py-1 text-white"
								>
									Remove
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div class="border-t pt-2">
				<div class="flex justify-between font-bold">
					<span>Total:</span>
					<span>€{total.toFixed(2)}</span>
				</div>
			</div>
		</section>
	</div>
</div>
