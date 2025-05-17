export const baseUrl =
  process.env.NODE_ENV === "production" ? "/" : "http://127.0.0.1:8090/";

export const appVersion = `v${process.env.APP_VERSION}`;
