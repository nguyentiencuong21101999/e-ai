export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return;
  const length = phoneNumber.length;

  const firstTwoDigits = "0***";
  const lastTwoDigits = "*" + phoneNumber.slice(length - 2);
  const middleDigits = "***";

  return `${firstTwoDigits} ${middleDigits} ${lastTwoDigits}`;
};

export const formatCardNumber = (value: string) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value?.replace(/[^\d]/g, "");

  return onlyNumbers?.replace(
    regex,
    (regex: string, $1: string, $2: string, $3: string, $4: string) =>
      [$1, $2, $3, $4].filter((group) => !!group).join(" ")
  );
};

export const formatEmail = (email: string) => {
  const atIndex = email.indexOf("@");
  let res = "";
  if (atIndex <= 1) return email;

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  res = username[0] + username[1];
  for (let i = 0; i < atIndex - 2; i++) {
    res += "*";
  }
  res += domain;
  return res;
};

export const formatCurrency = (value: string) => {
  return value
    ? "$ " +
        parseInt(value)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : undefined;
};
