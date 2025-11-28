import type { SignupFormData, OnboardingFormData, LoginFormData } from "../validations/auth";
import { FetchHelper } from "./fetch-helper";
import type { IUser } from "../types/user";

export class UserService {
    private static userProfileEndpoint = "/auth/me"
    private static signupEndpoint = "/auth/signup"
    private static loginEndpoint = "/auth/login"
    private static onboardingEndpoint = "/auth/onboarding"
    private static logoutEndpoint = "/auth/logout"

    static getUserProfile() {
        return FetchHelper.get<IUser>(UserService.userProfileEndpoint);
    }

    static signup(data: SignupFormData) {
        return FetchHelper.post<IUser>(UserService.signupEndpoint, data);
    }

    static onboarding(data: OnboardingFormData) {
        return FetchHelper.post<IUser>(UserService.onboardingEndpoint, data);
    }

    static login(data: LoginFormData) {
        return FetchHelper.post<IUser>(UserService.loginEndpoint, data);
    }

    static logout() {
        return FetchHelper.post(UserService.logoutEndpoint, {});
    }
}