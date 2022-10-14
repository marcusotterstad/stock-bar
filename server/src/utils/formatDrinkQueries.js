
// A helper fuction that joins two queries and returns a list of formatted objects

/*
Visual explanation:
    Input rows are 

                 drink_id | sum  
                    ------+-----
                        1 |   3
                        2 |   1
            
                and

         drink_id | min_price | max_price | target_orders 
            ------+-----------+-----------+---------------
                1 |    $50.00 |   $120.00 |            20
                2 |    $40.00 |   $100.00 |            25
                3 |    $60.00 |   $130.00 |            12

    and these are made into objects and returned as an array of objects like this:
    {drink_id: 1, sum: 3, min_price: $50, max_price: $120, target_orders: 20}
*/

module.exports = formatDrinkQueries = function (orderCount, drinkInformation) {
    const returnArr = [];
    for(var drinkRow of drinkInformation) {
        let matching = false;
        for(var ordRow of orderCount) {
            if(ordRow[0] === drinkRow[0]) {
                    const formattedObject = {drinkId: drinkRow[0], amountOrdered: parseInt(ordRow[1]), minPrice: parseFloat(drinkRow[1]), maxPrice: parseFloat(drinkRow[2]), targetOrdered: parseFloat(drinkRow[3])}
                    returnArr.push(formattedObject)
                    matching = true;
            }
        }
        if(!matching) {
            const formattedObject = {drinkId: drinkRow[0], amountOrdered: 0, minPrice: parseFloat(drinkRow[1]), maxPrice: parseFloat(drinkRow[2]), targetOrdered: parseFloat(drinkRow[3])}
            returnArr.push(formattedObject)
        }
    }
    return returnArr;

};
