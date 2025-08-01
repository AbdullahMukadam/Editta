import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['tesseract.js'],
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/tesseract.js/**/*.wasm',
      './node_modules/tesseract.js/**/*.json', 
      './node_modules/tesseract.js/src/worker-script/**/*.js', 
    ],
  },
};

export default nextConfig;
