import { sendEmail } from "@config/nodemailer";
import consumer, { configureConsumer } from "@config/kafka";

async function runConsumer() {
  await configureConsumer();

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value!.toString());

        if (!data) return;

        const { email, name, token, type } = data;

        switch (type) {

          case "verification":
            await sendEmail(email, "Verify Your Email", "verification", {
              name,
              token,
              email,
            });
            break;

          case "reset-password":
            await sendEmail(email, "Reset Your Password", "reset-password", {
              name,
              token,
              email,
            });
            break;

          default:
            console.log("Unknown email type:", type);
            break;
        }

        console.log("Processed:", data);
        await sendEmail(email, "Reset Your Password", "reset-password", {
              name:"hi",
              token:"fjdjd",
              email:"husnainiqbal577@gmail.com",
            });

      } catch (err) {
        console.error("Error handling message:", err);
      }
    },
  });

}
  
runConsumer();
