export function validateNumber(phone: string) {
  let isValid = false;
  if (!phone) isValid = true;
  if (phone.length > 10) isValid = true;
  if (isNaN(+phone) === true) isValid = true;
  return isValid;
}
