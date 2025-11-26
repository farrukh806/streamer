import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../validations/auth";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import AuthImagePattern from "../components/AuthImagePattern";
import AvatarSelector from "../components/AvatarSelector";
import { AVATAR_OPTIONS } from "../lib/constant";
import { Link } from "react-router";
import { MessageSquare, User, Mail, Lock } from "lucide-react";
import Button from "../components/Button";
import { handleError } from "../lib/utils";
import { UserService } from "../api/user-service";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            profilePicture: AVATAR_OPTIONS[0]
        }
    });
    const { mutate, isPending } = useMutation({
        mutationFn: UserService.signup,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                reset();
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            handleError(error);
        },
    })

    const onSubmit = (data: SignupFormData) => {
        mutate(data)
    };

    return (
        <AuthLayout
            rightContent={
                <AuthImagePattern
                    title="Connect with language partners worldwide"
                    subtitle="Practice conversations, make friends, and improve your language skills together"
                />
            }
        >
            <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-2 group">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare size={16} className="text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                    <p className="text-base-content/60">Get started with your free account</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={<User className="size-5 text-base-content/40" />}
                    error={errors.fullName}
                    {...register("fullName")}
                />

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

                <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <AvatarSelector
                            value={value}
                            onChange={onChange}
                            error={errors.profilePicture}
                        />
                    )}
                />

                <Button type="submit" isLoading={isSubmitting || isPending} loadingText="Submitting...">
                    Create Account
                </Button>
            </form>

            <div className="text-center">
                <p className="text-base-content/60">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Signup;