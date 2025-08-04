export function getMeleeBonus(body: number): number {
  if (body <= 2) return -4;
  if (body <= 4) return -2;
  if (body <= 6) return 0;
  if (body <= 8) return 2;
  if (body <= 10) return 4;
  if (body <= 12) return 6;
  return 8;
}
