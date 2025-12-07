"use client"

import type React from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignUpValues } from "../validators/schemaValidation";
import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonBase, errorText, inputBase, labelBase } from "../styles/formStyles";
import { cn } from "../lib/cn";
import { api } from "../lib/axios";


export default function SignupForm(): React.ReactElement {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors , isSubmitting},
    } = useForm<SignUpValues>({
        resolver: zodResolver(signupSchema),
        mode: "onTouched",
    });
    const [serverError, setServerError] = useState("")
    const navigate = useNavigate()

    async function onSubmit(data: SignUpValues) {
    try {
        const res = await api.post("/api/v1/auth/signup", data);

        const body = res.data;

        if (body.ok) {

            navigate('/login')
            return;
        }

        if (body.path) {
            setError(body.path, {
                type: "server",
                message: body.message || "Invalid field",
            });
            return;
        }

        if (body.error) {
            setServerError(body.error);
            return;
        }

    } catch (err) {
    if (!axios.isAxiosError(err)) {
      setServerError("Unexpected error");
      return;
    }

    if (!err.response) {
      setServerError("Network error or server not reachable");
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

    setServerError("Something went wrong");
  }
}


 

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md my-5">
        {/* Form */}

        {/* Header */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 space-y-5">
            <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600">Join us today and get started</p>
        </div>
          
        {/* Full Name */}
        <div>
            <label htmlFor={"fullName"} className={cn(labelBase)}>
                {"Full Name"}
            </label>
            <input
                {...register('fullname')}
                type={"text"}
                id={"fullName"}
                placeholder={"John Doe"}
                className={cn(inputBase)}
            />
            {errors.fullname?.message && <p className={cn(errorText)}>{errors.fullname.message}</p>}
        </div>

        {/* Email */}
        <div>
            <label htmlFor={"email"} className={cn(labelBase)}>
                {"Email Address"}
            </label>
            <input
                {...register('email')}
                type={"email"}
                id={"email"}
                placeholder={"you@example.com"}
                className={cn(inputBase)}
            />
            {errors.email?.message && <p className={cn(errorText)}>{errors.email.message}</p>}
        </div>

          
        {/* password */}
        <div>
            <label htmlFor={"password"} className={cn(labelBase)}>
                {"Password"}
            </label>
            <input
                {...register('password')}
                type={"password"}
                id={"password"}
                
                placeholder={"••••••••"}
                className={cn(inputBase)}
            />
            {errors.password?.message && <p className={cn(errorText)}>{errors.password.message}</p>}
        </div>

        {/* Confirm password */}
        <div>
            <label htmlFor={"confirmPassword"} className={cn(labelBase)}>
                {"Confirm Password"}
            </label>
            <input
                {...register('confirmPassword')}
                type={"password"}
                id={"confirmPassword"}
                placeholder={"••••••••"}
                className={cn(inputBase)}
            />
            {errors.confirmPassword?.message && <p className={cn(errorText)}>{errors.confirmPassword.message}</p>}
        </div>

          

          {/* Submit Button */}
        <button
            type="submit"
            disabled={isSubmitting}
            className={cn(buttonBase)}
            >
            {isSubmitting? "Submitting": "Create Account"}
        </button>

        {serverError && <p className={cn(errorText, "text-center font-semibold")}>{serverError}</p>}

          {/* Sign In Link */}
        <p className="text-center text-sm text-slate-600 pt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
            </Link>
        </p>
        </form>
      </div>
    </div>
  )
}
