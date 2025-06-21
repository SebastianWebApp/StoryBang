// jest.config.js
export default {
  testEnvironment: "node",
  // Eliminar moduleNameMapper si causa problemas con dependencias
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transformar archivos .js con babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!socket.io-client|engine.io-client)/", // Transformar socket.io-client y engine.io-client
  ],
  testMatch: [
    "**/__tests__/**/*.test.js",
    "**/?(*.)+(spec|test).js",
  ],
};