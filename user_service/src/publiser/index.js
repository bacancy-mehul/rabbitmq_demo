export const publisher = async (connection) => {
  try {
    const channel = await connection.createChannel();
    await channel.assertQueue("user_created");

    await channel.sendToQueue(
      "userService",
      Buffer.from(JSON.stringify("userService is online"))
    );

    //! Pubsub Code
    pubSub(channel);
    //! Pubsub Code
  } catch (error) {
    console.error(error);
  }
};

const pubSub = (channel) => {
  const exchange = "logs";
  const msg = process.argv.slice(2).join(" ") || "Hello World!";

  channel.assertExchange(exchange, "fanout", {
    durable: false,
  });
  channel.publish(exchange, "", Buffer.from(msg));
  console.log(" [x] Sent %s", msg);
};
