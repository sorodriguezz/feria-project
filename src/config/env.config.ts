export default () => ({
  baseUri: process.env.CONFIG_BASE_URI,
  port: parseInt(process.env.CONFIG_PORT) | 3000,
  mongooseDb: {
    // type: 'mongo',
    uri: process.env.MONGODB_URI,
  },
});
