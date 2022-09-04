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

  if (user) {
    return res.status(200).json({
      message: "User Created Successfully",
      data: await user,
    });
  }
  return res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(404).send({
      message: "User Not Found",
    });
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({
      message: "Password is incorrect",
    });
  }

  return res.status(200).json({
    message: "Login Successful",
    data: user,
  });
};

export const ResetPassword = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({ where: { email: req.body.email } });
  const { new_password, confirm_new_password } = req.body;
  if (!user) {
    return res.status(404).send({
      message: "User Not Found",
    });
  }
  const old_password = user.password;
  if (new_password !== confirm_new_password) {
    return res.status(400).json({
      message: "Password does not match",
    });
  }

  await getRepository(User).update(user.id, {
    password: new_password,
  });

  return res.status(200).json({
    message: "Password Reset Successful",
    data: { old_password: old_password, new_password: new_password },
  });
};
