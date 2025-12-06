import { Router } from 'express';
import { prisma } from '../lib/prisma.js'; 
import { signinSchema, SignInValues, signupSchema, SignUpValues } from '../validators/schemaValidation.js';
import bcrypt from "bcrypt"
import { signToken } from '../utils/jwt.js';
import jwt from "jsonwebtoken"

const router = Router();


const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

router.post("/signup", async (req, res) => {
 
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, path: parsed.error.issues[0].path[0], message: parsed.error.issues[0].message});
    }
    const data: SignUpValues = parsed.data;
    const { confirmPassword, ...payload } = data as any; 

    try {
        const existing = await prisma.user.findUnique({ where: { email: payload.email } });
        if (existing) {
        return res.status(400).json({ ok: false, error: "Email already in use" });
        }

        
        const hashed = await bcrypt.hash(payload.password, SALT_ROUNDS);

        
        const user = await prisma.user.create({
        data: {
            email: payload.email,
            name: payload.fullname,   
            password: hashed
        },
        select: { id: true, email: true, name: true } 
        });

        return res.status(201).json({
        ok: true,
        user,
        message: "User created successfully"
        });

    } catch (err: any) {
        console.error("Signup error:", err);

        
        if (err?.code === "P2002" && err?.meta?.target?.includes("email")) {
        return res.status(400).json({ ok: false, error: "Email already registered" });
        }

        return res.status(500).json({ ok: false, error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
  
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, path: parsed.error.issues[0].path[0], message: parsed.error.issues[0].message});
    }
    const data: SignInValues = parsed.data;

    try {
        
        const user = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true, email: true, name: true, password: true }
        });

        if (!user) {
        return res.status(400).json({ ok: false, error: "Invalid credentials" });
        }

        
        const match = await bcrypt.compare(data.password, user.password);
        if (!match) {
        return res.status(400).json({ ok: false, error: "Invalid credentials" });
        }


        const token = signToken({ userId: user.id, email: user.email });

        return res.json({
        ok: true,
        user: { id: user.id, email: user.email, name: user.name },
        token
        });


    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
});


router.get("/me", async (req, res) => {
  
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
        .status(401)
        .json({ ok: false, error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    } catch (err) {
        return res
        .status(401)
        .json({ ok: false, error: "Invalid or expired token" });
    }

    
    try {

        const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, name: true },
        });

        if (!user) {
        return res.status(404).json({ ok: false, error: "User not found" });
        }

       
        return res.json({ ok: true, user });

    } catch (err) {
        console.error("Me endpoint error:", err);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
});



export default router;
