export function paginate(items, pageNumber, pageSize) {
  //filter array based on pagination
  const endIndex = pageSize * pageNumber;
  const startIndex = endIndex - pageSize;
  return items.filter((_, index) => index >= startIndex && index < endIndex);
}
