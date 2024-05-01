const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
        return;
    }

    if (!jsonData || !jsonData.foodData || !Array.isArray(jsonData.foodData)) {
        console.error('Invalid JSON data format');
        return;
    }

    const foodData = jsonData.foodData;

    const filteredData = {
        foodData: foodData
            .filter(entry => {
                return entry.foodNutrients.some(nutrient => {
                    const namesToKeep = ['Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Energy'];
                    return namesToKeep.includes(nutrient.nutrient.name);
                });
            })
            .map(entry => ({
                description: entry.description,
                foodNutrients: entry.foodNutrients.filter(nutrient => {
                    const namesToKeep = ['Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Energy'];
                    return namesToKeep.includes(nutrient.nutrient.name);
                }).map(nutrient => ({
                    nutrient: {
                        name: nutrient.nutrient.name,
                        unitName: nutrient.nutrient.unitName
                    },
                    amount: nutrient.amount
                })),
                foodPortions: entry.foodPortions ? (entry.foodPortions.length > 0 ? entry.foodPortions.slice(0, 1).map(portion => ({
                    gramWeight: portion.gramWeight,
                    portionDescription: portion.portionDescription
                })) : []) : []
            }))
    };

    const formattedFilteredData = JSON.stringify(filteredData, null, 4);

    fs.writeFile('data.js', `const filteredFoodData = ${formattedFilteredData};\n\nmodule.exports = filteredFoodData;\n`, (err) => {
        if (err) {
            console.error('Error writing JavaScript file:', err);
            return;
        }
        console.log('JavaScript file created successfully.');
    });
});
