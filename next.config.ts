import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://qpcfwfz1uay2lgkh.public.blob.vercel-storage.com")],
  },
};

export default withWorkflow(nextConfig);
