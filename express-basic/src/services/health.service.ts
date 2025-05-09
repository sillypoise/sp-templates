// Could contain health checks like DB pings in future
export const checkHealth = (): {
  status: string;
  timestamp: string;
} => {
  return { status: "ok", timestamp: new Date().toISOString() };
};
