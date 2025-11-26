import type { SignupFormData } from "../validations/auth";
import { FetchHelper } from "./fetch-helper";
import type { IUser } from "../types/user";

export class UserService {
    private static userProfileEndpoint = "/auth/me"
    private static signupEndpoint = "/auth/signup"

    static getUserProfile() {
        return FetchHelper.get<IUser>(UserService.userProfileEndpoint);
    }

    static signup(data: SignupFormData) {
        return FetchHelper.post<IUser>(UserService.signupEndpoint, data);
    }
}