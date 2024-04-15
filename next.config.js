/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    serverRuntimeConfig: {
        // Extend server response timeout to 10 minutes (600000 milliseconds)
        responseTimeout: 600000,
    }
};

export default config;
