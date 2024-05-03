export default () => ({
  baseUri: process.env.CONFIG_BASE_URI,
  port: parseInt(process.env.CONFIG_PORT) || 3000,
  mongooseDb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.BD_NAME,
  },
  jwtConfig: {
    secret: process.env.TOKEN_SECRET,
    signOptions: {
      expiresIn: process.env.TOKEN_EXPIRE,
    },
  },
  configMailer: {
    transport: {
      service: process.env.EMAIL_CREDENTIALS_SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL_CREDENTIALS_USER,
        pass: process.env.EMAIL_CREDENTIALS_PASSWORD,
      },
    },
    defaults: {
      from: process.env.EMAIL_DEFAULT_FROM,
    },
  },
});
