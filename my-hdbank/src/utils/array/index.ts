export function firstArray<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}
