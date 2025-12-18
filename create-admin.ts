import { auth } from "./lib/auth";
import readline from "readline";

// Setup readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
const ask = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n🔐 --- Interactive Admin Setup ---\n");
  
  // 1. Prompt for inputs
  const name = await ask("Enter Admin Name: ");
  const email = await ask("Enter Admin Email: ");
  const password = await ask("Enter Admin Password: "); // Note: Input will be visible
  
  rl.close();

  console.log("\n⏳ Creating admin account...");

  try {
    // 2. Create the user using Better Auth API
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    
    console.log("✅ Success! Admin user created.");
    console.log(`👉 You can now login at: http://localhost:3000/login`);
    
  } catch (error) {
    console.error("\n❌ Failed to create admin.");
    // This often fails if a user already exists (due to your block > 1 logic)
    console.error("Reason:", error);
  }
}

main();