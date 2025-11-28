import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../validations/auth";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import AuthImagePattern from "../components/AuthImagePattern";
import { Mail, Lock, MessageSquare } from "lucide-react";
import Button from "../components/Button";
import { handleError } from "../lib/utils";
import { UserService } from "../api/user-service";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IApiError } from "../types/api";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UserService.login,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ['user']
        });
        // Check if user needs onboarding
        if (data.data && !data.data.isOnboarded) {
          navigate("/onboarding");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: IApiError) => {
      handleError(error.response?.data?.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <AuthLayout
      rightContent={
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your language learning journey"
        />
      }
    >
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MessageSquare size={16} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
          <p className="text-base-content/60">Sign in to your account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="size-5 text-base-content/40" />}
          error={errors.email}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="size-5 text-base-content/40" />}
          error={errors.password}
          {...register("password")}
        />

        <Button type="submit" isLoading={isSubmitting || isPending} loadingText="Signing in...">
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <p className="text-base-content/60">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;