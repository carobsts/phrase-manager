export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      // eslint-disable-next-line no-undef
      clearTimeout(timeout);
    }

    // eslint-disable-next-line no-undef
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
