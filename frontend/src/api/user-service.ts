import type { IUser } from "../types/User";
import { FetchHelper } from "./fetch-helper";

export class UserService {
    private static userProfileEndpoint = "/user/profile"

    static getUserProfile() {
        return FetchHelper.get<IUser>(this.userProfileEndpoint);
    }
}