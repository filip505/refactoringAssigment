module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    "user.client": "<rootDir>/test/mock/user.client",
    "record.client": "<rootDir>/test/mock/record.client",
    "local.storage": "<rootDir>/test/mock/local.storage",
    "remote.storage": "<rootDir>/test/mock/remote.storage",
  }
};