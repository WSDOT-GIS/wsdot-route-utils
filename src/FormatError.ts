/**
 * An error that is thrown when an input string is not
 * in the expected format.
 */
export default class FormatError extends Error {
  /**
   * Creates a new instance of FormatError
   * @param input - The input string that caused the error
   * @param expectedFormat - The expected format as a RegExp.
   */
  constructor(
    public readonly input: string,
    public readonly expectedFormat: RegExp
  ) {
    super(`${input} is not in expected format: ${expectedFormat}.`);
  }
}
