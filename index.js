window.addEventListener('beforeunload', function(event) {
    localStorage.clear();
});

const foodData = filteredFoodData;

const mealSearchContainer = document.getElementById('mealSearchContainer');
mealSearchContainer.classList.add('hidden');

document.getElementById('submitBtn').addEventListener('click', handleUserInfo);
///document.getElementById('userInfoForm').addEventListener('submit', handleUserInfo);

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;
    const results = searchFood(query);
    displaySearchResults(results);
});

document.getElementById('searchDropdown').addEventListener('change', function() {
    const selectedFood = JSON.parse(this.value);
});

document.getElementById('addToMealBtn').addEventListener('click', function() {
    const selectedFood = JSON.parse(document.getElementById('searchDropdown').value);
    const meal = document.getElementById('mealSelector').value;
    console.log("Selected meal:", meal);
    addFoodToMeal(selectedFood, meal);
    document.getElementById('mealSelector').value = meal;
});

function searchFood(query) {
    query = query.toLowerCase();
    const results = foodData.filter(food => food.description.toLowerCase().includes(query));
    return results;
}

function displaySearchResults(results) {
    const searchDropdown = document.getElementById('searchDropdown');
    searchDropdown.innerHTML = '';
    results.forEach(food => {
        const option = document.createElement('option');
        option.textContent = food.description;
        option.value = JSON.stringify(food);
        searchDropdown.appendChild(option);
    });
}

function addFoodToMeal(food, meal) {
    const mealList = document.getElementById(`${meal}List`);
    if (!mealList) {
        console.error(`Meal list with ID '${meal}List' not found.`);
        return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = food.description;

    if (food.portionDescription) {
        listItem.textContent += ` (${food.portionDescription})`;
    }

    const servingsInput = document.createElement('input');
    servingsInput.type = 'number';
    servingsInput.min = '1';
    servingsInput.value = '1';
    servingsInput.addEventListener('change', function() {
        console.log('New servings value:', this.value);
        food.servings = this.value;
        updateFoodInLocalStorage(meal, food);
    });

    listItem.appendChild(servingsInput);
    mealList.appendChild(listItem);
    food.servings = servingsInput.value;
    addFoodToLocalStorage(food, meal);
}

function addFoodToLocalStorage(food, meal) {
    const storedFoodData = localStorage.getItem(`${meal}Data`);
    let foodData = storedFoodData ? JSON.parse(storedFoodData) : {};
    if (!foodData[meal]) {
        foodData[meal] = [];
    }

    food.servings = 1;
    foodData[meal].push(food);
    localStorage.setItem(`${meal}Data`, JSON.stringify(foodData));
    console.log(`Added ${food.description} to ${meal} data:`, JSON.stringify(foodData[meal]));
}

function updateFoodInLocalStorage(meal, food) {
    const storedMealData = localStorage.getItem(`${meal}Data`);
    let mealData = storedMealData ? JSON.parse(storedMealData) : {};

    const existingFoodIndex = mealData[meal].findIndex(f => f.description === food.description);

    if (existingFoodIndex !== -1) {
        mealData[meal][existingFoodIndex].servings = food.servings;
    }

    localStorage.setItem(`${meal}Data`, JSON.stringify(mealData));
}


function handleUserInfo(event) {
    event.preventDefault();
    
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const heightFeet = document.getElementById('heightFeet').value;
    const heightInches = document.getElementById('heightInches').value;
    const age = document.getElementById('age').value;

    const userInfo = {
        gender: gender,
        weight: +weight,
        activity: activity,
        goal: goal,
        height: ((+heightFeet) * 12) + (+heightInches),
        age: +age
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    document.getElementById('userInfoForm').classList.add('hidden');
    mealSearchContainer.classList.remove('hidden');

    document.getElementById('meals').classList.remove('hidden');
    document.getElementById('searchInput').classList.remove('hidden');
    document.getElementById('searchDropdown').classList.remove('hidden');
    document.getElementById('addToMealBtn').classList.remove('hidden');
    document.getElementById('mealSelector').classList.remove('hidden');
    document.getElementById('calculateBtn').classList.remove('hidden');

    document.getElementById('userInfoContainer').classList.add('hidden');
}


document.getElementById('calculateBtn').addEventListener('click', function() {
    mealSearchContainer.classList.add('hidden');

    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        try {
            console.log('User Information:');
            console.log(JSON.parse(userInfo));
        } catch (error) {
            console.error('Error parsing user information:', error);
        }
    }

    const breakfastData = localStorage.getItem('breakfastData');
    const lunchData = localStorage.getItem('lunchData');
    const dinnerData = localStorage.getItem('dinnerData');
    const snacksData = localStorage.getItem('snacksData');

    if (breakfastData || lunchData || dinnerData || snacksData) {
        try {
            console.log('Meal Data:');
            if (breakfastData) {
                console.log('Breakfast:');
                console.log(JSON.parse(breakfastData));
            }
            if (lunchData) {
                console.log('Lunch:');
                console.log(JSON.parse(lunchData));
            }
            if (dinnerData) {
                console.log('Dinner:');
                console.log(JSON.parse(dinnerData));
            }
            if (snacksData) {
                console.log('Snacks:');
                console.log(JSON.parse(snacksData));
            }
        } catch (error) {
            console.error('Error parsing meal data:', error);
        }
    } else {
        console.log('No meal data found in local storage.');
    }

    document.getElementById('visualizationContainer').classList.remove('hidden');
});