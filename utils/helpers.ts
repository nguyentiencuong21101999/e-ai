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

/**
 * Creates custom pagination styles with pink active page styling
 * @param className - The CSS class name for the pagination (e.g., 'topics-pagination', 'dialogues-pagination')
 * @returns CSS string for pagination styling
 */
export const createPaginationStyles = (className: string): string => {
  return `
    /* Additional spacing for ${className} pagination */
    .${className} .ant-pagination-item,
    .${className} .ant-pagination-prev,
    .${className} .ant-pagination-next {
      margin-right: 5px !important;
      margin-left: 0 !important;
    }
    .${className} .ant-pagination-item:last-child,
    .${className} .ant-pagination-next:last-child {
      margin-right: 0 !important;
    }
    
    /* Current page item styling - pink background with white text */
    .${className} .ant-pagination-item-active {
      background-color: #ec4899 !important;
      border-color: #ec4899 !important;
    }
    .${className} .ant-pagination-item-active a {
      color: white !important;
    }
    .${className} .ant-pagination-item-active:hover {
      background-color: #db2777 !important;
      border-color: #db2777 !important;
    }
    .${className} .ant-pagination-item-active:hover a {
      color: white !important;
    }
  `
}
