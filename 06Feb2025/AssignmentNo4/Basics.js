const products = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Shirt", price: 30, category: "Clothing" },
  { name: "Shoes", price: 80, category: "Footwear" },
];
const ProductNameUppercase = products.map((product) => {
  return product.name.toUpperCase();
});
console.log(ProductNameUppercase);

const ElectronicProducts = products.filter((products) => {
  return products.category === "Electronics";
});
console.log(ElectronicProducts);

const TotalPrice = products.reduce((acc, product) => {
  return acc + product.price;
}, 0);
console.log("Total of All item is ", TotalPrice);

const calculateCategoryTotal = (category) => {
  return products
    .filter((product) => product.category === category)
    .map((product) => product.price)
    .reduce((acc, price) => acc + price, 0);
};

console.log(
  "Total price of Electronics:",
  calculateCategoryTotal("Electronics")
);
console.log("Total price of Clothing:", calculateCategoryTotal("Clothing")); // Should output 30

// Output:
// [ 'LAPTOP', 'PHONE', 'SHIRT', 'SHOES' ]
// [
//   { name: 'Laptop', price: 1000, category: 'Electronics' },
//   { name: 'Phone', price: 500, category: 'Electronics' }
// ]
// Total of All item is  1610
// Total price of Electronics: 1500
// Total price of Clothing: 30
