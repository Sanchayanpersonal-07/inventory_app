import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const InventoryHistory = ({ productId, productName, onClose }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(`https://inventory-appp-ucw7.onrender.com/products/${productId}/history`)
            .then(res => setHistory(res.data))
            .catch(err => console.error(err));
    }, [productId]);

    return (
        <div className="history-sidebar">
            <div className="sidebar-header">
                <h3>History: {productName}</h3>
                <button onClick={onClose}><X size={20}/></button>
            </div>
            <div className="history-list">
                {history.length === 0 ? <p>No history yet.</p> : (
                    <ul>
                        {history.map(log => (
                            <li key={log.id}>
                                <div className="log-date">{new Date(log.timestamp).toLocaleString()}</div>
                                <div className="log-detail">
                                    Stock: <b>{log.old_stock}</b> ➝ <b>{log.new_stock}</b>
                                </div>
                                <div className="log-user">By: {log.changed_by}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default InventoryHistory;