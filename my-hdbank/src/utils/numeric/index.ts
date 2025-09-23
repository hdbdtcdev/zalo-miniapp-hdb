export const numberFormat = (amount: number | undefined) =>
  amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
