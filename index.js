import app from "./app.js";
import config from "./config/config.js";
import connectDb from "./config/dbConfig.js";


const PORT = config.app.apiPort || 6000;


app.listen(PORT, async () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    await connectDb();
});