import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db_config";

const startServer = async() =>{
    const PORT = config.port || 3000;

    // database connection.
    await connectDB();    
    
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

startServer();