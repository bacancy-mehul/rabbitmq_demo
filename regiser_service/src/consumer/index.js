import { registerUser } from "./user.consumer";

export const consumer = async (connection) => {
  try {
    const channel = await connection.createChannel();

    await channel.assertQueue("userService");
    await channel.assertQueue("user_created");

    //** When User Service is come to Live **//
    channel.consume(
      "userService",
      (data) => {
        console.log(data.content.toString());
      },
      { noAck: true }
    );

    //** When User Service Create New User Add in our RegisterDB **//
    channel.consume(
      "user_created",
      async (data) => {
        let userObject = JSON.parse(data.content.toString());
        console.log('user_created recieved from User Service');
        await registerUser(userObject);
      },
      { noAck: true }
    );
  } catch (ex) {
    console.error(JSON.stringify(ex));
  }
};
