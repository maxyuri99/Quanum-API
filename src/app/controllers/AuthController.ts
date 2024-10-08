import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../entities/User";
import ResponseFormat from "../interfaces/ResponseFormat";

class AuthController {
  async authenticate(req: Request, res: Response) {
    let response: ResponseFormat = { data: null, success: false, message: "" };
    try {
      const repository = getRepository(User);

      const { email, password } = req.body;

      //console.log('Passou aqui 1:' + req.body.password)

      let user = await repository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email })
        .getOne();
      if (!user) {
        throw new Error("Email not registered.");
      }

      //console.log('Passou aqui 2:' + user.password)

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password.");
      }

      //console.log('Passou aqui 3:' + isValidPassword)

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      user = await getRepository(User).findOneOrFail(user.id);


      response = {
        success: true,
        data: {
          user: { user },
          token,
        },
        message: "O usuário foi logado com sucesso!",
      };

      return res.json(response);
    } catch (err) {
      if (err instanceof Error) {
        response.message = err.message;
        res.json(response);
      }
    }
  }

  async logout(req: Request, res: Response) {
    let response: ResponseFormat = { data: null, success: false, message: "" };
    try {
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}

export default new AuthController();
