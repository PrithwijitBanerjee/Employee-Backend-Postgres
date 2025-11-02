import dotenv from "dotenv";


dotenv.config();  // configure dotenv external middleware globally ...

const config = {
        app: {
        apiPort: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PORT : process.env.PORT,
        apiUrl: process.env.API_URL,
        baseUrl: process.env.NODE_ENV === "production" ? process.env.AWS_LIVE_URL : process.env.SERVER_BASE_URL,
        jwtSecretKey: process.env.JWT_SECRET_KEY,
    },
    db: {
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbPass: process.env.DB_PASS,
        
        dbUserName: process.env.DB_USER_NAME,
    }
};

export default config;