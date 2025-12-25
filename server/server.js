import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import cors from 'cors';
import FlagRoutes from './routes/FlagRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api", vendorRoutes);
app.use("/api/flags", FlagRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});