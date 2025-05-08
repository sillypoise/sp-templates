// Could contain health checks like DB pings in future
export const checkHealth = () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
};
