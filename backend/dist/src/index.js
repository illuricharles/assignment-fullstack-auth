import cors from "cors";
import express from 'express';
import AuthRouter from './router/AuthRouter.js';
const app = express();
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
}));
app.use(express.json());
app.use('/api/v1/auth', AuthRouter);
app.use((req, res) => {
    res.status(404).json({ ok: false, error: "Route not found" });
});
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    return res.status(err.status || 500).json({
        ok: false,
        error: err.message || "Internal server error",
    });
});
app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    }
});
