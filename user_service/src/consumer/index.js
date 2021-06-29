import { deleteUser } from "./user.consumer";

export const consumer = async (connection) => {
  try {
    const channel = await connection.createChannel();
    await channel.assertQueue("regiserService");
    await channel.assertQueue("reg_user_deleted");

    //* When Register service comes live *//
    channel.consume("regiserService", (data) => {
      console.log(data.content.toString());
      channel.ack(data);
    });

    //** When Register service delete User then delete user from User DB **//
    channel.consume(
      "reg_user_deleted",
      async (data) => {
        let userObject = JSON.parse(data.content.toString());
        console.log("reg_user_deleted recieved from User Service");
        await deleteUser(userObject);
      },
      { noAck: true }
    );

    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
};
