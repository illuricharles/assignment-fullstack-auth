"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react"
import { signinSchema, type SignInValues } from "../validators/schemaValidation";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/cn";
import { buttonBase, errorText, inputBase, labelBase } from "../styles/formStyles";
import { api } from "../lib/axios";

export default function LoginForm(): React.ReactElement {
    const [serverError, setServerError] = useState('')
    const {login} = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        } = useForm<SignInValues>({
        resolver: zodResolver(signinSchema),
        mode: "onTouched",
    });

    async function onSubmit(data: SignInValues) {
    setServerError("");

    try {
        const res = await api.post("http://localhost:3000/api/v1/auth/login", data);
        const body = res.data;

        if (body.ok) {
            await login(body.token);   
            navigate("/");
            return;
        }

        if (body.error) {
            setServerError(body.error || "Something went wrong.");
            return;
        }

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (!err.response) {
                setServerError("Network error or server unreachable");
                return;
            }

            const body = err.response.data;

            if (body?.path) {
                setError(body.path, { type: "server", message: body.message });
                return;
            }

            if (body?.error) {
                setServerError(body.error);
                return;
            }

            setServerError("Unexpected server error");
        } else {
            setServerError("Something went wrong");
        }
    }
}

   
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 space-y-5">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-600">Sign in to your account</p>
            </div>
            <div>
                <label htmlFor='email' className={cn(labelBase)}>
                    Email Address
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                   className={cn(inputBase)}
                />
                {errors.email?.message && <p  className={cn(errorText)}>{errors.email.message}</p>}
            </div>


            <div>
                <label htmlFor='password' className={cn(labelBase)}>
                    Password
                </label>
                <input
                    {...register('password')}
                    type={'password'}
                    id={'password'}
                    placeholder={"••••••••"}
                    className={cn(inputBase)}
                />
                {errors.password?.message && <p  className={cn(errorText)}>{errors.password.message}</p>}
            </div>

            <button
                type="submit"
                className={cn(buttonBase)}
            >
                Sign In
            </button>

            {serverError && <p className={cn(errorText, "text-center font-semibold")}>{serverError}</p>}

            {/* Divider */}
            <div className="relative ">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
            </div>

            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">New to us?</span>
                </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-600">
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Create an account
                </Link>
            </p>

        </form>
      </div>
    </div>
  )
}

