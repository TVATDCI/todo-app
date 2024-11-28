const products = [
    { id: 1, name: "Laptop", price: 999, description: "This is a very nice laptop." },
    { id: 2, name: "Phone", price: 499, description: "This is a mint condition phone." },
  ];
  
  // Get all products
  export const getAllProducts = (req, res) => {
    try {
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };
  
  // Get product by ID
  export const getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
  
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  
    const product = products.find((p) => p.id === productId);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    res.json(product);
  };
  
  // Create a new product
  export const createProduct = (req, res) => {
    const { name, price } = req.body;
  
    if (!name || typeof price !== "number") {
      return res.status(400).json({ error: "Invalid product data" });
    }
  
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description: req.body.description,
    };
  
    products.push(newProduct);
    res.status(201).json(newProduct);
  };
  