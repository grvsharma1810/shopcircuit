export const getDiscountedPrice = (price, discountPercent) => {
    if (discountPercent) {
        return price - Math.ceil((price * discountPercent) / 100);
    }
    return price;
};