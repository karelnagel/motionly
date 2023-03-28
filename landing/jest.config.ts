export default {
    clearMocks:true,
    coverageProvider: "v8",
    preset: "ts-jest/presets/js-with-ts",
    setupFiles: ["dotenv/config"],
    setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
    transform:{
        "^.+\\.mjs?$": "ts-jest"
    }
}