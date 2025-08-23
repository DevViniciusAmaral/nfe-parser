import { createServer } from "./server";

async function start() {
  const app = await createServer();

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.info("Server running at http://localhost:3000");
  } catch (error) {
    console.error("Error running server: ", error);
    process.exit(1);
  }
}

start();
