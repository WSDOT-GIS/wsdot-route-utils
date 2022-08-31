/**
 * An error that is thrown when an input string is not in the expected format.
 */
export default class FormatError extends Error {
  /**
   * Creates a new instance of FormatError
   * @param input - The input string that caused the error
   * @param expectedFormat - The expected format as a [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).
   * @param message - Override the default messsage.
   * If omitted, the {@link FormatError.message} will be as follows:
   * ```javascript
   * `${input} is not in expected format: ${expectedFormat}.`
   * ```
   */
  constructor(
    /** The input string that caused the error */
    public readonly input: string,
    /** The expected format as a [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp). */
    public readonly expectedFormat: RegExp,
    /** Override the default messsage. */
    message?: string
  ) {
    super(message || `${input} is not in expected format: ${expectedFormat}.`);
  }
}
