export const publisher = async (connection) => {
  try {
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    // await channel.sendToQueue("jobs", Buffer.from(JSON.stringify("2")));
    await channel.sendToQueue(
      "regiserService",
      Buffer.from(JSON.stringify("regiserService is online"))
    );
    // await channel.close();
    // await connection.close();
  } catch (error) {
    console.error(error);
  }
};
