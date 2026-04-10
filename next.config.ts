import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qpcfwfz1uay2lgkh.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withWorkflow(nextConfig);
