import {defineConfig} from "vitest/config"

export default defineConfig({
    test: {
        environment:"jsdom",
        globals:true,
        setupFiles:["testSetup.ts"],
        include: ['src/**/*.test.{js,ts,jsx,tsx}']
    }
})