/**
 * Generates a random number between the given lower and upper limits,
 * or generates a random number with a specified number of digits.
 *
 * @param lower - The lower limit for the random number (inclusive). Default is 100_00_00.
 * @param upper - The upper limit for the random number (inclusive). Default is 999_99_99.
 * @param numberOfDigits - Optional parameter to specify the number of digits. Default is undefined.
 * @returns A random number based on the provided parameters.
 */
export function generateRandomNumber(lower: number = 100_00_00, upper: number = 999_99_99, numberOfDigits?: number): number {
  if (numberOfDigits !== undefined) {
    const min = Math.pow(10, numberOfDigits - 1);
    const max = Math.pow(10, numberOfDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }
}