import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, type OnboardingFormData } from "../validations/auth";
import Input from "../components/Input";
import Select from "../components/Select";
import AuthLayout from "../components/AuthLayout";
import AuthImagePattern from "../components/AuthImagePattern";
import { Languages, BookOpen, User } from "lucide-react";
import Button from "../components/Button";
import { handleError } from "../lib/utils";
import { UserService } from "../api/user-service";
import toast from "react-hot-toast";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { IApiError } from "../types/api";
import { LANGUAGES } from "../lib/constant";
import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";

const Onboarding = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: UserService.getUserProfile,
    });

    const languageOptions = useMemo(() =>
        LANGUAGES.map(lang => ({ value: lang, label: lang })),
        []
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
    });

    useEffect(() => {
        if (user?.data && !isLoading) {
            if (user.data.nativeLanguage && user.data.learningLanguage && user.data.bio) {
                navigate("/");
                return;
            }
            setValue("fullName", user.data.fullName);
            setValue("email", user.data.email);
            setValue("profilePicture", user.data.profilePicture);
        }
    }, [user, setValue, isLoading, navigate]);

    const { mutate, isPending } = useMutation({
        mutationFn: UserService.onboarding,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                queryClient.invalidateQueries({
                    queryKey: ['user']
                });
                navigate("/");
            } else {
                toast.error(data.message);
            }
        },
        onError: (error: IApiError) => {
            handleError(error.response?.data?.message);
        },
    });

    const onSubmit = (data: OnboardingFormData) => {
        mutate(data);
    };

    return (
        <AuthLayout
            rightContent={
                <AuthImagePattern
                    title="Complete your profile"
                    subtitle="Tell us more about yourself to get the best experience"
                />
            }
        >
            <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-4 group">
                    <div className="relative">
                        <img
                            src={user?.data.profilePicture || "/avatar-placeholder.png"}
                            alt="Profile"
                            className="size-24 rounded-full object-cover border-4 border-base-100 shadow-xl"
                        />
                        <div className="absolute bottom-0 right-0 bg-primary text-primary-content p-1.5 rounded-full shadow-lg">
                            <User size={16} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold">{user?.data?.fullName}</h1>
                        <p className="text-base-content/60">{user?.data?.email}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Select
                    label="Native Language"
                    icon={<Languages className="size-5 text-base-content/40" />}
                    options={languageOptions}
                    placeholder="Select Language"
                    error={errors.nativeLanguage}
                    {...register("nativeLanguage")}
                />

                <Select
                    label="Learning Language"
                    icon={<BookOpen className="size-5 text-base-content/40" />}
                    options={languageOptions}
                    placeholder="Select Language"
                    error={errors.learningLanguage}
                    {...register("learningLanguage")}
                />

                <Input
                    label="Bio"
                    type="text"
                    placeholder="Tell us about yourself..."
                    icon={<User className="size-5 text-base-content/40" />}
                    error={errors.bio}
                    {...register("bio")}
                />

                <Button type="submit" isLoading={isSubmitting || isPending} loadingText="Saving...">
                    Complete Profile
                </Button>
            </form>
        </AuthLayout>
    );
};

export default Onboarding;
