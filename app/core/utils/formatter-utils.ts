export const formatNumberInput = (value: string): number => {
  if (!value) {
    return 0;
  }
  return parseInt(value.replace(/\D/g, '').replace(/^0+/, ''));
}