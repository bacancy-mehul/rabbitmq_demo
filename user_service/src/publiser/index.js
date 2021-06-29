export const publisher = async (connection) => {
  try {
    const channel = await connection.createChannel();
    await channel.sendToQueue(
      "userService",
      Buffer.from(JSON.stringify("userService is online"))
    );
  } catch (error) {
    console.error(error);
  }
};
