export const publisher = async (connection) => {
  try {
    const channel = await connection.createChannel();
    await channel.sendToQueue(
      "regiserService",
      Buffer.from(JSON.stringify("regiserService is online"))
    );
  } catch (error) {
    console.error(error);
  }
};
