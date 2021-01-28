export default {
  env: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_BD: process.env.MONGO_BD
  },
  watch: ['src'],
  ext: 'ts',
  ignore: ['src/**/*.spec.ts'],
  exec: 'ts-node ./src/server.ts'
}
