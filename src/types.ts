export type Vec<
  T extends number = number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
