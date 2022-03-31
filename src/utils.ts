export const toCamelCase = (str: string) => {
  return str.split("-").reduce((res, string, index) => {
    const text =
      index > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : string;
    return res + text;
  });
};
