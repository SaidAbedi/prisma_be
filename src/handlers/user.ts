import {
  comparePassword,
  generateToken,
  hashPassword,
} from "./../modules/auth";
import prisma from "../db";

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      userName: req.body.userName,
      password: await hashPassword(req.body.password),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
    },
  });
  const token = generateToken(user);
  res.json({ token });
};

export const loginUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.userName,
    },
  });

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    return res.status(401).send("Invalid credentials");
  }

  const token = generateToken(user);
  res.json({ token });
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
