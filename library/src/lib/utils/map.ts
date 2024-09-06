const hasKey = (map: Map<unknown, unknown>, key: unknown): boolean => {
  if (!key) {
    return false;
  }
  return map.has(key);
};

const insertKey = (
  map: Map<unknown, unknown>,
  key: unknown,
  value: unknown,
): void => {
  if (!key) {
    return;
  }
  map.set(key, value);
};

export { hasKey, insertKey };
