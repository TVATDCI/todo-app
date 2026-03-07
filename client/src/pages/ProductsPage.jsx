import { useProducts } from "../hooks/useProducts.js";
import AddProduct from "../components/AddProduct.jsx";
import ProductList from "../components/ProductList.jsx";

export default function ProductsPage() {
  const { products, loading, error, addProduct, remove } = useProducts();

  return (
    <div className="page">
      <h1>Products</h1>
      <AddProduct onProductAdded={addProduct} />
      <ProductList
        products={products}
        loading={loading}
        error={error}
        onDelete={remove}
      />
    </div>
  );
}
