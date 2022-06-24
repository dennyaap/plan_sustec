export const getOffsetElements = (currentPage, limitElements) => {
    return currentPage * limitElements - limitElements;
}

export const getCountPages = (countPages, limitElements) => {
    return Math.ceil(countPages / limitElements)
}