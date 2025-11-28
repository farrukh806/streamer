import type { SignupFormData, OnboardingFormData, LoginFormData } from "../validations/auth";
import { FetchHelper } from "./fetch-helper";
import type { IUser, IFriendRequest } from "../types/user";

export class UserService {
    private static userProfileEndpoint = "/auth/me"
    private static signupEndpoint = "/auth/signup"
    private static loginEndpoint = "/auth/login"
    private static onboardingEndpoint = "/auth/onboarding"
    private static logoutEndpoint = "/auth/logout"
    private static recommendationsEndpoint = "/user/recommendations"
    private static friendsEndpoint = "/user/friends"
    private static sendFriendRequestEndpoint = "/user/send-friend-request"
    private static friendRequestsEndpoint = "/user/friend-requests"
    private static updateFriendRequestStatusEndpoint = "/user/update-friend-request-status"

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

    static getRecommendations() {
        return FetchHelper.get<IUser[]>(UserService.recommendationsEndpoint);
    }

    static getFriends() {
        return FetchHelper.get<IUser[]>(UserService.friendsEndpoint);
    }

    static sendFriendRequest(userId: string) {
        return FetchHelper.post(`${UserService.sendFriendRequestEndpoint}/${userId}`, {});
    }

    static getSentFriendRequests() {
        return FetchHelper.get<IFriendRequest[]>(`${UserService.friendRequestsEndpoint}?type=sent`);
    }

    static getIncomingFriendRequests() {
        return FetchHelper.get<IFriendRequest[]>(`${UserService.friendRequestsEndpoint}?type=incoming`);
    }

    static updateFriendRequestStatus(friendRequestId: string, status: "accepted" | "rejected") {
        return FetchHelper.put(`${UserService.updateFriendRequestStatusEndpoint}/${friendRequestId}`, { status });
    }
}