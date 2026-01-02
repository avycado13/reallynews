import { generateText, Output } from "ai";
import { hackclub } from "./ai";
import { ReporterInsertSchema } from "./types";



export async function generateReporters(count: number = 5) {
  const startTime = Date.now();

  try {
    const { output } = await generateText({
      model: hackclub("qwen/qwen3-32b"),
      system: `You are a creative persona generator. Generate satirical news reporter personas with the following details for each:
- Name
- Specialty/Beat
- Years of Experience
- Key Trait
- Notable Achievement
- A brief description of their reporting style
- Biography

Make the reporters humorous and exaggerated, suitable for a satirical news organization.
You may/should make them sound exaggerated or absurd.
`,
      output: Output.array({
        element: ReporterInsertSchema,
      }),
      prompt: `Generate ${count} unique news reporter personas for a news organization.`,
    });

    return output;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[generateReporterPersonas] Error after ${duration}ms:`,
      error
    );
    throw error;
  }
}
