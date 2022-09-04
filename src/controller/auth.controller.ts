import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const user = getRepository(User).save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: body.password,
  });
  res.send(user);
};
