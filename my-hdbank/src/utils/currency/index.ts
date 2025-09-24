export function formatCurrency(
  amount: number,
  currencyUnit: string,
  prefix: string | undefined = undefined
) {
  const engDecimalFormat = '$1,';
  // const viDecimalFormat = '$1.';
  const regex = /(.)(?=(\d{3})+$)/g;

  const formattedAmount = String(Math.floor(amount)).replace(
    regex,
    // as SBV requested, from now we only use 1 format for all languages ( isUsingEnglish() ? engDecimalFormat : viDecimalFormat)
    engDecimalFormat
  );

  return `${prefix || ''}${formattedAmount}${currencyUnit || ''}`;
}

export function formatCurrencyWithDecimal(
  amount: number,
  currencyUnit: string
) {
  const integerPart = Math.trunc(amount);
  const fractionPart = (amount + '').split('.')[1];

  if (fractionPart) {
    return `${formatCurrency(integerPart, '')}.${fractionPart}${
      currencyUnit || ''
    }`;
  }

  return formatCurrency(integerPart, currencyUnit);
}
