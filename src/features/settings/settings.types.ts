export type AppSettings = {
  smtp: {
    enabled: boolean;
    port: number;
    host: string;
    username: string;
    authMethod: string;
    tls: boolean;
    localName: string;
  };
  backups: {
    cron: string;
    cronMaxKeep: number;
    s3: {
      enabled: boolean;
      bucket: string;
      region: string;
      endpoint: string;
      accessKey: string;
      forcePathStyle: boolean;
    };
  };
  s3: {
    enabled: boolean;
    bucket: string;
    region: string;
    endpoint: string;
    accessKey: string;
    forcePathStyle: boolean;
  };
  meta: {
    appName: string;
    appURL: string;
    senderName: string;
    senderAddress: string;
    hideControls: boolean;
  };
  rateLimits: {
    enabled: boolean;
    rules: Array<{
      label: string;
      audience: string;
      duration: number;
      maxRequests: number;
    }>;
  };
  trustedProxy: {
    headers: string[];
    useLeftmostIP: boolean;
  };
  batch: {
    enabled: boolean;
    maxRequests: number;
    timeout: number;
    maxBodySize: number;
  };
  logs: {
    maxDays: number;
    minLevel: number;
    logIP: boolean;
    logAuthId: boolean;
  };
};
