export function notLocalStorageNull<TValue>(
  value: TValue | 'null' | null,
): value is TValue {
  return value !== 'null' && value !== null;
}
