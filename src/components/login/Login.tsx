import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { LoginFormInputs, LoginProps } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./LoginSchema";

export default function Login({ setIsAuthenticated }: LoginProps) {
  // console.log("setIsAuthenticated :", setIsAuthenticated);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      if (data.email && data.password) {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IlBhc3N3b3JkQDEyMyIsImlkIjoxfQ.qfmMJMbmBZm7_4ba2SQBnXvgn8G445T2ENUXFpC0-kw";
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  className="w-full mt-2"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="Enter your password"
                  {...field}
                  className="w-full mt-2"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4 bg-blue-500 text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
