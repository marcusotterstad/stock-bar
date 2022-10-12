// A fuction that takes in amount ordered within a timeframe, calculates price 
// based on ratio between target orders and amount of orders, and returns the new price. 


const calculateDrinkPrice = function (amountOrdered, minPrice, maxPrice, targetOrdered) {
    const basePrice = (minPrice+maxPrice)/2;
    const percentageIncrease = amountOrdered/targetOrdered;

    let calculatedPrice = basePrice * percentageIncrease;

    if (calculatedPrice < minPrice) {
        calculatedPrice = minPrice;
    } 
    if (calculatedPrice > maxPrice) {
        calculatedPrice = maxPrice;
    }

    return calculatedPrice;

};

module.exports = {calculateDrinkPrice: calculateDrinkPrice};