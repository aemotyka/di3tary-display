const fs = require('fs');

fs.readFile('data.js', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
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

    const transformedFoodData = foodData.map(entry => {
        const transformedEntry = {
            description: entry.description,
            portionDescription: entry.foodPortions ? (entry.foodPortions.length > 0 ? entry.foodPortions[0].portionDescription : null) : null
        };

        entry.foodNutrients.forEach(nutrient => {
            // Modify nutrient names
            let nutrientName = nutrient.nutrient.name.replace(", by difference", "");
            nutrientName = nutrientName.replace("Total lipid (fat)", "Fat");

            transformedEntry[nutrientName] = nutrient.amount;
        });

        return transformedEntry;
    });

    fs.writeFile('processedData.js', 'const filteredFoodData = ' + JSON.stringify(transformedFoodData, null, 4) + ';', err => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Data has been written to', 'processedData.js');
    });
});
