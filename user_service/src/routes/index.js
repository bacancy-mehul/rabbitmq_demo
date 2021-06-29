import { Router } from "express";
import connectionRBMQ from "../config/rabbitMQ/rabbitMQ";
import User from "../models/user.model";

const routes = new Router();

routes.route("/users").post(async (req, res) => {
  let connection = await connectionRBMQ();
  let channel = await connection.createChannel();
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) throw new Error("Email is already Exist");

    let user = await User.create(req.body);
    console.log("user_created published from User Service");

    channel.sendToQueue("user_created", Buffer.from(JSON.stringify(user)));
    res.status(201).json({ message: "User Created Sucessfully" });
  } catch (error) {
    if (error.message)
      return res.status(400).json({ error: { message: error.message } });
    return res
      .status(500)
      .json({ error: { message: "Internal Server Error" } });
  }
});

export default routes;
