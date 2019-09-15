export default function max(array: Array<number>): number {
  let max: number = -1;
  for (const value of array) {
    if (value != null && (max < value || (max == -1 && value >= value))) {
      max = value;
    }
  }
  return max;
}