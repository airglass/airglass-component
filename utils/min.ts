export default function min(array: Array<number>): number {
  let min: number = -1;
  for (const value of array) {
    if (value != null && (min > value || (min === -1 && value >= value))) {
      min = value;
    }
  }
  return min;
}