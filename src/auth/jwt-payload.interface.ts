/**
 * Using an interface to register payloads.
 * This helps to having dynamic extension of code.
 * Open closed principle
 */
export interface JwtPayload {
  username: string;
}
