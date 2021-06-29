import { Router } from "express";
import connectionRBMQ from "../config/rabbitMQ/rabbitMQ";
import Register from "../models/register.model";

const routes = new Router();

routes.route("/users/:id").delete(async (req, res) => {
  let connection = await connectionRBMQ();
  let channel = await connection.createChannel();
  try {
    let existingUser = await Register.findOne({ _id: req.params.id });
    if (!existingUser) throw new Error("There is no user exist");
    await Register.findByIdAndDelete(req.params.id);

    let deletedUser = { _id: existingUser.student_id };

    console.log("reg_user_deleted published from Register Service");

    channel.sendToQueue(
      "reg_user_deleted",
      Buffer.from(JSON.stringify(deletedUser))
    );
    res.status(200).json({ message: "User Deletd Sucessfully" });
  } catch (error) {
    if (error.message)
      return res.status(400).json({ error: { message: error.message } });
    return res
      .status(500)
      .json({ error: { message: "Internal Server Error" } });
  }
});

export default routes;
