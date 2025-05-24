export const formatDate = (date?: Date | string): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateWaitingTime = (startDate?: Date | string): string => {
  if (!startDate) return 'N/A';
  
  const startDateObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const currentDate = new Date();
  
  // Calculate difference in milliseconds
  const diffTime = Math.abs(currentDate.getTime() - startDateObj.getTime());
  
  // Calculate days, months, and years
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  if (diffYears > 0) {
    const remainingMonths = diffMonths - (diffYears * 12);
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}${remainingMonths > 0 ? `, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}` : ''}`;
  } else if (diffMonths > 0) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  }
};