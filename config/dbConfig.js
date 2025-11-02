import { Sequelize } from "sequelize";
import config from "./config.js";
import { initProjHelp } from "../src/seeders/ProjHelp/ProjHelp.seeders.js";
import ProjectHelpModel from "../src/models/ProjHelp/ProjHelp.model.js";

// First, connect without specifying a database to check/create it
const createDatabaseIfNotExists = async () => {
    const initialSequelize = new Sequelize('postgres', config.db.dbUserName, config.db.dbPass, {
        host: config.db.dbHost,
        dialect: 'postgres',
        // logging: false, // Optional: disable logging for this connection
    });

    try {
        // Check if database exists
        const result = await initialSequelize.query(
            `SELECT 1 FROM pg_database WHERE datname = '${config.db.dbName}'`
        );
        
        if (result[0].length === 0) {
            console.log(`📁 Database '${config.db.dbName}' does not exist. Creating...`);
            await initialSequelize.query(`CREATE DATABASE "${config.db.dbName}"`);
            console.log(`✅ Database '${config.db.dbName}' created successfully.`);
        } else {
            console.log(`✅ Database '${config.db.dbName}' already exists.`);
        }
        
        await initialSequelize.close();
    } catch (error) {
        console.error('Error checking/creating database:', error);
        await initialSequelize.close();
        throw error;
    }
};

// Main sequelize instance for the actual database
export const sequelize = new Sequelize(config.db.dbName, config.db.dbUserName, config.db.dbPass, {
    host: config.db.dbHost,
    dialect: 'postgres',
    logging: false,
});

const connectDb = async () => {
    try {
        // First, ensure database exists
        await createDatabaseIfNotExists();
        
        // Then connect to the actual database
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');
        
        // Sync models
        await sequelize.sync({ alter: true });
        await initProjHelp(ProjectHelpModel); // seeding projHelp ...
        console.log('✅ All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export default connectDb;