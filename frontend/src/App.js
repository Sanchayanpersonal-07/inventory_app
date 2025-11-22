import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './components/ProductTable';
import InventoryHistory from './components/InventoryHistory';
import { Upload, Download, Plus } from 'lucide-react';
import './App.css'; // Basic styling

// CHANGE THIS TO YOUR DEPLOYED BACKEND URL LATER
const API_URL = "https://inventory-appp-ucw7.onrender.com/api/products"; 

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}?search=${search}&category=${category}`);
      setProducts(res.data);
      
      // Extract unique categories for filter
      const uniqueCats = [...new Set(res.data.map(p => p.category))];
      if (categories.length === 0) setCategories(uniqueCats); 
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    await axios.post(`${API_URL}/import`, formData);
    alert("Import Successful!");
    fetchProducts();
  };

  const handleExport = () => {
    window.open(`${API_URL}/export`, '_blank');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>📦 Inventory Manager</h1>
        <div className="header-actions">
            <label className="btn-import">
                <Upload size={16} /> Import CSV
                <input type="file" accept=".csv" hidden onChange={handleImport} />
            </label>
            <button className="btn-export" onClick={handleExport}>
                <Download size={16} /> Export CSV
            </button>
        </div>
      </header>

      <div className="controls">
        <input 
            type="text" 
            placeholder="Search by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="btn-primary"><Plus size={16}/> Add Product</button>
      </div>

      <div className="main-layout">
        <div className="table-section">
            <ProductTable 
                products={products} 
                refresh={fetchProducts} 
                onSelect={setSelectedProduct} 
            />
        </div>
        {selectedProduct && (
            <InventoryHistory 
                productId={selectedProduct.id} 
                productName={selectedProduct.name} 
                onClose={() => setSelectedProduct(null)}
            />
        )}
      </div>
    </div>
  );
}

export default App;