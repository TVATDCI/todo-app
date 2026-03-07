export default function ProductList({ products, loading, error, onDelete }) {
  if (loading) return <p className="status-text">Loading products…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!products.length)
    return <p className="status-text">No products yet. Add one above!</p>;

  return (
    <ul className="item-list">
      {products.map((product) => (
        <li key={product._id} className="item-row">
          <div className="item-info">
            <span className="item-name">{product.name}</span>
            {product.description && (
              <span className="item-sub">{product.description}</span>
            )}
          </div>
          <span className="price-badge">${product.price.toFixed(2)}</span>
          <button
            className="btn-delete"
            onClick={() => onDelete(product._id)}
            aria-label="Delete product"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
