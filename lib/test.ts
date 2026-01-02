import db from "./db/drizzle";
import { reportersTable } from "./db/schema";
import { generateReporters } from "./gen-reporters";



// Run the script
async function main() {
  const scriptStartTime = Date.now();

  try {
    const personas = await generateReporters(5);

    console.log(personas);
    await db.insert(reportersTable).values(personas)
  } catch (error) {
    const scriptDuration = Date.now() - scriptStartTime;
    console.error(
      `[main] Error generating personas after ${scriptDuration}ms:`,
      error
    );
  }
}

main();
