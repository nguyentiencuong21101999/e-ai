import api from "../services/api";

export const handleRefreshTokenExpired = (token: string) => {
  return api.post("/users/refresh-token", {
    refreshToken: token,
  });
};

/**
 * Extracts the first letter of the last word from a full name
 * @param fullName - The full name to process
 * @returns The first letter of the last word in uppercase, or 'U' if no valid name is provided
 * @example
 * getFirstLetterOfLastName("Nguyen Van A") // Returns "A"
 * getFirstLetterOfLastName("Tran B") // Returns "B"
 * getFirstLetterOfLastName("") // Returns "U"
 */
export const getFirstLetterOfLastName = (fullName?: string): string => {
  if (!fullName?.trim()) return 'U';
  
  // Split the name by spaces and get the last word
  const nameParts = fullName.trim().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1];
  
  // Return the first letter of the last word in uppercase
  return lastName.charAt(0).toUpperCase();
};
