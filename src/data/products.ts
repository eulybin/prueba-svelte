export type Product = {
	id: number;
	name: string;
	price: number;
	color: string;
};

export const products: Product[] = [
	{
		id: 1,
		name: 'Apples',
		price: 2.53,
		color: 'bg-green-500'
	},
	{
		id: 2,
		name: 'Oranges',
		price: 3.11,
		color: 'bg-orange-500'
	},
	{
		id: 3,
		name: 'Bananas',
		price: 1.88,
		color: 'bg-yellow-500'
	},
	{
		id: 4,
		name: 'Strawberries',
		price: 4.26,
		color: 'bg-red-500'
	},
	{
		id: 5,
		name: 'Grapes',
		price: 3.42,
		color: 'bg-purple-500'
	}
];
