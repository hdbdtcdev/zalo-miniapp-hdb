export function isUpperCase(char: string) {
  return char === char.toUpperCase();
}

export const vietnameseSlugify = (text: string, lowerCase = true) => {
  const vietnameseSlugifyText = text
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, (matchChar) => {
      return isUpperCase(matchChar) ? "A" : "a";
    })
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, (matchChar) => {
      return isUpperCase(matchChar) ? "E" : "e";
    })
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, (matchChar) => {
      return isUpperCase(matchChar) ? "I" : "i";
    })
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, (matchChar) =>
      isUpperCase(matchChar) ? "O" : "o"
    )
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, (matchChar) =>
      isUpperCase(matchChar) ? "U" : "u"
    )
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, (matchChar) => (isUpperCase(matchChar) ? "Y" : "y"))
    .replace(/đ/gi, (matchChar) => (isUpperCase(matchChar) ? "D" : "d"));

  if (lowerCase) {
    return vietnameseSlugifyText.toLowerCase();
  }
  return vietnameseSlugifyText;
};

export const createAccessibleTestProps = (id?: string) => {
  return id ? { testID: id, accessibilityLabel: id } : {};
};

export const containOnlyAlphaNumeric = (str: string, allowSpace = true) => {
  const alphaNumericRegex = allowSpace ? /^[a-zA-Z0-9 ]*$/ : /^[a-zA-Z0-9]$/;
  return alphaNumericRegex.test(str);
};

export const isJsonString = (str?: string) => {
  if (!str) {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (_) {
    return false;
  }
};

export const flattenDeepObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>
): { [key: string]: string } => {
  return Object.keys(obj).reduce(
    (acc, cur) =>
      typeof obj[cur] === "object"
        ? { ...acc, ...flattenDeepObject(obj[cur]) }
        : { ...acc, [cur]: obj[cur] },
    {}
  );
};

export const removeDiacritics = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
