export const cacheAddresses = JSON.parse(process.env.CACHE_URL as string || '["redis://localhost:6379"]');