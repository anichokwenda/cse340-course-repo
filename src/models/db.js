import pg from 'pg';
const { Pool } = pg;

/**
 * Connection pool for PostgreSQL database.
 * Uses DB_URL from.env. SSL required for Render.
 */
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false // required for Render/Postgres
    }
});

/**
 * Wrapper for query logging in development
 */
let db = null;

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') {
    db = {
        async query(text, params) {
            try {
                const start = Date.now();
                const res = await pool.query(text, params);
                const duration = Date.now() - start;
                console.log('Executed query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    duration: `${duration}ms`,
                    rows: res.rowCount
                });
                return res;
            } catch (error) {
                console.error('Error in query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    error: error.message
                });
                throw error;
            }
        },
        async close() {
            await pool.end();
        }
    };
} else {
    db = pool; // in production just use pool directly
}

/**
 * Tests the database connection
 */
const testConnection = async() => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export { db, pool, testConnection };