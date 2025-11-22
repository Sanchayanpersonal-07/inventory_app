import React, { useState } from 'react';
import axios from 'axios';
import { Edit, Trash2, Save, X } from 'lucide-react';

const ProductTable = ({ products, refresh, onSelect }) => {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const API_URL = "https://inventory-appp-ucw7.onrender.com/api/products"; 

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setEditFormData(product);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`${API_URL}/${id}`, editFormData);
            setEditingId(null);
            refresh();
        } catch (error) {
            alert("Error updating product");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await axios.delete(`${API_URL}/${id}`);
            refresh();
        }
    };

    return (
        <table className="product-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id} onClick={() => onSelect(product)} className={editingId === product.id ? "editing-row" : ""}>
                        <td><img src={product.image || "https://via.placeholder.com/40"} alt="prod" width="40" /></td>
                        
                        {editingId === product.id ? (
                            <>
                                <td><input name="name" value={editFormData.name} onChange={handleChange} /></td>
                                <td><input name="category" value={editFormData.category} onChange={handleChange} /></td>
                                <td><input type="number" name="stock" value={editFormData.stock} onChange={handleChange} /></td>
                                <td>-</td>
                                <td>
                                    <button className="icon-btn save" onClick={(e) => { e.stopPropagation(); handleSave(product.id); }}><Save size={16}/></button>
                                    <button className="icon-btn cancel" onClick={(e) => { e.stopPropagation(); handleCancel(); }}><X size={16}/></button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span className={`status-badge ${product.stock > 0 ? 'instock' : 'outstock'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td>
                                    <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleEditClick(product); }}><Edit size={16}/></button>
                                    <button className="icon-btn delete" onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}><Trash2 size={16}/></button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;