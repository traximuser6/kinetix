import { Post } from "../models/post.model";

/**
 * Generates a random number between the given lower and upper limits.
 *
 * @param lower - The lower limit for the random number (inclusive). Default is 100_00_00.
 * @param upper - The upper limit for the random number (inclusive). Default is 999_99_99.
 * @returns A random number between lower and upper limits.
 */
export function generateRandomNumber(lower: number = 100_00_00, upper: number = 999_99_99): number {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function generateNextPostId(posts: Post[]): number {
  return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
}
