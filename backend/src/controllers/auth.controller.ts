import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
    res.send("Signup")
}

export async function login(req: Request, res: Response) {
    res.send("Login")
}

export function logout(req: Request, res: Response) {
    res.send("Logout")
}
