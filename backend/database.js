const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inventory.db', (err) => {
    if (err) console.error("DB Error:", err.message);
    else console.log('Connected to SQLite database.');
});

db.serialize(() => {
    // Products Table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        unit TEXT,
        category TEXT,
        brand TEXT,
        stock INTEGER NOT NULL DEFAULT 0,
        status TEXT,
        image TEXT
    )`);

    // Inventory History Table
    db.run(`CREATE TABLE IF NOT EXISTS inventory_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        old_stock INTEGER,
        new_stock INTEGER,
        changed_by TEXT DEFAULT 'Admin',
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(product_id) REFERENCES products(id)
    )`);
});

module.exports = db;