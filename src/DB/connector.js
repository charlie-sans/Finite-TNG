import sqlite3 from 'sqlite3';
import crypto from 'crypto';

// Enable verbose mode for debugging
sqlite3.verbose();

const db = new sqlite3.Database(process.env.DB_PATH || './finite_db.sqlite', (err) => {
    if (err) {
        console.error("Database connection failed!", err);
    } else {
        console.log("Connected to SQLite database");
        initializeTables();
    }
});

function initializeTables() {
    db.serialize(() => {
        // Create administrators table
        db.run(`CREATE TABLE IF NOT EXISTS administrators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            password_salt TEXT NOT NULL,
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME
        )`);

        // Create general users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    });
}

// Hash password with salt
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { hash, salt };
}

// Verify password
function verifyPassword(password, hash, salt) {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return verifyHash === hash;
}

// Create admin user
function createAdmin(username, email, password) {
    return new Promise((resolve, reject) => {
        const { hash, salt } = hashPassword(password);
        db.run(
            `INSERT INTO administrators (username, email, password_hash, password_salt) VALUES (?, ?, ?, ?)`,
            [username, email, hash, salt],
            function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
}


// Verify admin login
function verifyAdminLogin(username, password) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM administrators WHERE username = ? AND is_active = 1`,
            [username],
            (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(null);
                } else {
                    const isValid = verifyPassword(password, row.password_hash, row.password_salt);
                    if (isValid) {
                        db.run(`UPDATE administrators SET last_login = CURRENT_TIMESTAMP WHERE id = ?`, [row.id]);
                        resolve(row);
                    } else {
                        resolve(null);
                    }
                }
            }
        );
    });
}

export { createAdmin, verifyAdminLogin };