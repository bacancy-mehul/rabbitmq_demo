// import { registerUser } from "./user.consumer";

export const consumer = async (connection) => {
  try {
    const channel = await connection.createChannel();

    await channel.assertQueue("userService");
    await channel.assertQueue("user_created", { durable: true });

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
        console.log("user_created recieved from User Service");
        // await registerUser(userObject);
      },
      { noAck: true }
    );

    //! pubsub
    pubSubConsume1(channel);
    //! pubsub
  } catch (ex) {
    console.error(JSON.stringify(ex));
  }
};

const pubSubConsume1 = async (channel) => {
  const exchange = "logs";

  await channel.assertExchange(exchange, "fanout", {
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

  await channel.bindQueue(q.queue, exchange, "");
  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        console.log(" [x] %s", msg.content.toString());
      }
    },
    {
      noAck: true,
    }
  );
  console.log("Waiting for messages...");
};
