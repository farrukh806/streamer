import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../validations/auth";
import Input from "../components/Input";
import FormContainer from "../components/FormContainer";
import AvatarSelector from "../components/AvatarSelector";
import { AVATAR_OPTIONS } from "../lib/constant";

const Signup = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            profilePicture: AVATAR_OPTIONS[0]
        }
    });

    const onSubmit = async (data: SignupFormData) => {
        // Form submission logic will be added later
        console.log("Form data:", data);
    };

    return (
        <FormContainer
            title="Create Account"
            footer={
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="link link-primary">
                        Log in
                    </a>
                </p>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.fullName}
                    {...register("fullName")}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email}
                    {...register("email")}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
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

                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default Signup;