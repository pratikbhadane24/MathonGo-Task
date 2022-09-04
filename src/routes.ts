import { Router } from "express";
import { Login, Register, ResetPassword } from "./controller/auth.controller";

export const routes = (router: Router) => {
  router.post("/api/register/", Register);
  router.post("/api/login/", Login);
  router.put("/api/resetpassword/", ResetPassword);
};
