/**
 * Yield to the main thread to prevent long tasks
 * Breaks up work into smaller chunks to improve TBT
 */
export async function yieldToMain(): Promise<void> {
  return new Promise<void>((resolve) => {
    // Use scheduler.postTask if available (Chrome 94+)
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      (window as any).scheduler.postTask(() => resolve(), { priority: 'background' });
    } else {
      // Fallback to setTimeout
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Process array in chunks, yielding between each chunk
 * @param array Array to process
 * @param chunkSize Number of items to process before yielding
 * @param callback Function to call for each item
 */
export async function processInChunks<T>(
  array: T[],
  chunkSize: number,
  callback: (item: T, index: number) => void
): Promise<void> {
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunk.forEach((item, chunkIndex) => callback(item, i + chunkIndex));
    
    // Yield to main thread after each chunk
    if (i + chunkSize < array.length) {
      await yieldToMain();
    }
  }
}

