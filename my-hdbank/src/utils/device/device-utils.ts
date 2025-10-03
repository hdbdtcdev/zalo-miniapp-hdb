export function isAndroid() {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /android/i.test(ua);
}
