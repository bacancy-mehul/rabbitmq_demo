import amqp from "amqplib";
import { consumer } from "../../consumer";
import { publisher } from "../../publiser";

const amqpServer = process.env.AMQP_SERVER;

let connectionRBMQ = async () => await amqp.connect(amqpServer);

(async () => {
  try {
    let connection = await connectionRBMQ();

    await consumer(connection);
    await publisher(connection);
    console.log("Connected to RabbitMq...");
    process.on("beforeExit", () => {
      console.log("closing");
      connection.close();
    });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
})();

export default connectionRBMQ;
