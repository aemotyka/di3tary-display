const stack = [
    {"meal": "Breakfast", "Carbohydrate": 122, "Protein": 56,"Fat": 21, "Calories": 901},
    {"meal": "Lunch", "Carbohydrate": 114, "Protein": 64, "Fat": 33,"Calories": 1009},
    {"meal": "Dinner", "Carbohydrate": 98, "Protein": 69, "Fat": 23,"Calories": 875},
    {"meal": "Snack", "Carbohydrate": 25, "Protein": 31, "Fat": 13,"Calories": 875}
];

const unstack = [
    {"nutrient": "Protein", "Breakfast": 56, "Lunch": 64, "Dinner": 69, "Snack": 31},
    {"nutrient": "Carbohydrate", "Breakfast": 122, "Lunch": 114, "Dinner": 98, "Snack": 25},
    {"nutrient": "Fat", "Breakfast": 21, "Lunch": 33, "Dinner": 23, "Snack": 13},
    {"nutrient": "Calories", "Breakfast": 901, "Lunch": 1009, "Dinner": 875, "Snack": 875}
];