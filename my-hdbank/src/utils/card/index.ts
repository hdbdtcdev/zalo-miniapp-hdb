export const formatCardNumber = (
  cardNumber: string,
  showLast4Digit = false
) => {
  const nonDigitCharacterRegex = /[^0-9]/g;
  const raw = cardNumber.replace(nonDigitCharacterRegex, '');
  const firstPart = raw.slice(0, 4);
  const lastPart = raw.slice(-4);
  const middlePart = raw.slice(4, -4).replace(/./g, ' ****');

  return showLast4Digit
    ? `*${lastPart}`
    : `${firstPart}${middlePart} ${lastPart}`;
};
