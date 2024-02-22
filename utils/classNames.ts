function classNames(
  ...strings: (string | boolean | null | undefined)[]
): string {
  return strings
    .reduce<string>((previousValue, currentValue) => {
      if (currentValue) {
        return `${previousValue} ${currentValue}`;
      }
      return previousValue;
    }, '')
    .trim();
}

export default classNames;
