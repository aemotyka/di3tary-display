function calculateNecessaryNutrition(data) {
    let weightKGS = data.weight * 0.453592;
    let heightCM = data.height * 2.54

    let bmr = data.gender === 'male'? ((10 * weightKGS) + (6.25 * heightCM) - (5 * data.age) + 5): ((10 * weightKGS) + (6.25 * heightCM) - (5 * data.age) -161);
    let needsActivity = bmr * (data.activity === 'sedentary' ? (1.2) : data.activity === 'light' ? (1.375) : data.activity === 'moderate' ? (1.55) : data.activity === 'very' ? (1.725) : (1.9));
    let needsGoal = data.goal === 'gain' ? (needsActivity + 500) : data.goal=== 'lose' ? (needsActivity * .85) : needsActivity;

    let _f = Math.ceil(data.goal === 'loss' ? ((needsGoal * .2) / 9) : (needsGoal * .3) / 9);
    let _c = Math.ceil((needsGoal * .4) / 4);
    let _p = Math.ceil(data.goal === 'loss' ? ((needsGoal * .4)/4) : (needsGoal * .3) / 4);

    return {
        Calories: needsGoal,
        Fat: _f,
        Carbohydrates: _c,
        Protein: _p
    };
}

function calculateTrueNutrition(data) {
        var processedItems = [];

        data.forEach(function(item) {
            let servings = item.servings;
            let calories = item.Energy * servings;
            let protein = item.Protein * servings;
            let carbohydrate = item.Carbohydrate * servings;
            let fat = item.Fat * servings;

                let processedItem = {
                    meal: item.meal,
                    description: item.description,
                    portionDescription: item.portionDescription,
                    servings: servings,
                    Calories : calories,
                    Protein: protein,
                    Carbohydrate: carbohydrate,
                    Fat: fat
                };
                
            processedItems.push(processedItem);
        });
        
        return processedItems;
}

function processActuals(data) {
    let BtotalCals = 0;
    let BtotalProtein = 0;
    let BtotalCarbs = 0;
    let BtotalFat = 0;
    let LtotalCals = 0;
    let LtotalProtein = 0;
    let LtotalCarbs = 0;
    let LtotalFat = 0;
    let DtotalCals = 0;
    let DtotalProtein = 0;
    let DtotalCarbs = 0;
    let DtotalFat = 0;
    let CtotalCals = 0;
    let CtotalProtein = 0;
    let CtotalCarbs = 0;
    let CtotalFat = 0;

    data.forEach(function(item) {
        let meal = item.meal;
        let calories = item.Calories;
        let protein = item.Protein;
        let carbohydrate = item.Carbohydrate;
        let fat = item.Fat;

        if (meal === "breakfast") {
            BtotalCals = BtotalCals + calories;
            BtotalProtein = BtotalProtein + protein;
            BtotalCarbs = BtotalCarbs + carbohydrate;
            BtotalFat = BtotalFat + fat;
        } else if (meal === "lunch") {
            LtotalCals = LtotalCals + calories;
            LtotalProtein = LtotalProtein + protein;
            LtotalCarbs = LtotalCarbs + carbohydrate;
            LtotalFat = LtotalFat + fat;
        } else if (meal === "dinner") {
            DtotalCals = DtotalCals + calories;
            DtotalProtein = DtotalProtein + protein;
            DtotalCarbs = DtotalCarbs + carbohydrate;
            DtotalFat = DtotalFat + fat;
        } else {
            CtotalCals = CtotalCals + calories;
            CtotalProtein = CtotalProtein + protein;
            CtotalCarbs = CtotalCarbs + carbohydrate;
            CtotalFat = CtotalFat + fat;
        }
    })
    return [
        {meal: "breakfast", cals: Math.ceil(BtotalCals), protein: Math.ceil(BtotalProtein * 4), carbs: Math.ceil(BtotalCarbs * 4), fat: Math.ceil(BtotalFat * 9)},
        {meal: "lunch", cals: Math.ceil(LtotalCals), protein: Math.ceil(LtotalProtein * 4), carbs: Math.ceil(LtotalCarbs * 4), fat: Math.ceil(LtotalFat * 9)},
        {meal: "dinner", cals: Math.ceil(DtotalCals), protein: Math.ceil(DtotalProtein * 4), carbs: Math.ceil(DtotalCarbs * 4), fat: Math.ceil(DtotalFat * 9)},
        {meal: "snacks", cals: Math.ceil(CtotalCals), protein: Math.ceil(CtotalProtein * 4), carbs: Math.ceil(CtotalCarbs * 4), fat: Math.ceil(CtotalFat * 9)}
    ];
};

function processActualsAgain(data, needs) {
    let BtotalCals = 0;
    let BtotalProtein = 0;
    let BtotalCarbs = 0;
    let BtotalFat = 0;
    let LtotalCals = 0;
    let LtotalProtein = 0;
    let LtotalCarbs = 0;
    let LtotalFat = 0;
    let DtotalCals = 0;
    let DtotalProtein = 0;
    let DtotalCarbs = 0;
    let DtotalFat = 0;
    let CtotalCals = 0;
    let CtotalProtein = 0;
    let CtotalCarbs = 0;
    let CtotalFat = 0;

    data.forEach(function(item) {
        let meal = item.meal;
        let calories = item.Calories;
        let protein = item.Protein;
        let carbohydrate = item.Carbohydrate;
        let fat = item.Fat;

        if (meal === "breakfast") {
            BtotalCals = BtotalCals + calories;
            BtotalProtein = BtotalProtein + protein;
            BtotalCarbs = BtotalCarbs + carbohydrate;
            BtotalFat = BtotalFat + fat;
        } else if (meal === "lunch") {
            LtotalCals = LtotalCals + calories;
            LtotalProtein = LtotalProtein + protein;
            LtotalCarbs = LtotalCarbs + carbohydrate;
            LtotalFat = LtotalFat + fat;
        } else if (meal === "dinner") {
            DtotalCals = DtotalCals + calories;
            DtotalProtein = DtotalProtein + protein;
            DtotalCarbs = DtotalCarbs + carbohydrate;
            DtotalFat = DtotalFat + fat;
        } else {
            CtotalCals = CtotalCals + calories;
            CtotalProtein = CtotalProtein + protein;
            CtotalCarbs = CtotalCarbs + carbohydrate;
            CtotalFat = CtotalFat + fat;
        }
    })

let deficitFat = needs.Fat - (BtotalFat + LtotalFat + DtotalFat + CtotalFat);
let deficitCarbs = needs.Carbohydrates - (BtotalCarbs + LtotalCarbs + DtotalCarbs + CtotalCarbs);
let defecitProtein = needs.Protein - (BtotalProtein + LtotalProtein + DtotalProtein + CtotalProtein);

    return [
        // {macro: "cals", breakfast: BtotalCals, lunch: LtotalCals, dinner: DtotalCals, snacks: CtotalCals},
        {macro: "carbs", breakfast: Math.ceil(BtotalCarbs), lunch: Math.ceil(LtotalCarbs), dinner: Math.ceil(DtotalCarbs), snacks: Math.ceil(CtotalCarbs), defecit: deficitCarbs},
        {macro: "protein", breakfast: Math.ceil(BtotalProtein), lunch: Math.ceil(LtotalProtein), dinner: Math.ceil(DtotalProtein), snacks: Math.ceil(CtotalProtein), defecit: defecitProtein},
        {macro: "fat", breakfast: Math.ceil(BtotalFat), lunch: Math.ceil(LtotalFat), dinner: Math.ceil(DtotalFat), snacks: Math.ceil(CtotalFat), defecit: deficitFat},
    ];
}

function createMealHierarchy(data) {
    const meals = {};

    // Iterate through each food item
    data.forEach(item => {
        // Extract meal name
        const meal = item.meal;
        
        // If the meal doesn't exist in the meals object, create it
        if (!meals[meal]) {
            meals[meal] = {
                name: meal,
                children: []
            };
        }
        
        // Create a copy of the item excluding the meal attribute
        const foodItem = { ...item };
        delete foodItem.meal;
        
        // Add the food item to the meal's children array
        meals[meal].children.push(foodItem);
    });

    // Convert meals object to array of meals
    const mealArray = Object.values(meals);

    // Create hierarchy object
    const hierarchy = {
        name: "meals",
        children: mealArray
    };

    return hierarchy;
}

const needs = calculateNecessaryNutrition(userInfo);
const actuals = calculateTrueNutrition(bruhdata);
const hierarchicals = createMealHierarchy(actuals);

const width = 600;
const height = 600;
const margin = {top: 20, bottom: 20, left: 40, right:0};

const scaleCalories = d3.scaleLinear()
    .domain([0, d3.max(actuals.map((d) => d.Calories))])
    .range([0, width - margin.left - margin.right]);

const scaleColorMacros = d3.scaleOrdinal()
    .domain(['protein', 'fat', 'carbs', 'calories'])
    .range(["#1b9e77","#d95f02","#7570b3","#e7298a"]);

const ScaleColorMacros = d3.scaleOrdinal()
    .domain(['Protein', 'Fat', 'Carbs', 'Calories'])
    .range(["#1b9e77","#d95f02","#7570b3","#e7298a"]);

const scaleColorMeals = d3.scaleOrdinal()
    .domain(["breakfast", "lunch", "dinner", "snacks"])
    .range(["#e41a1c","#377eb8","#4daf4a", "#984ea3"]);

const scaleBandedCalories = d3.scaleBand()
    .domain([["Energy"]])
    .range([0, 200])
    .paddingInner(0.1);

const scaleBandedMacros = d3.scaleBand()
    .domain(['protein', 'fat', 'carbs'])
    .range([height - margin.top - margin.bottom, 0])
    .paddingInner(0.1);

const scaleBandedMeals = d3.scaleBand()
    .domain(["breakfast", "lunch", "dinner", "snacks"])
    .range([0, 600])
    .paddingInner(0.1);

const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "1px dotted black");

svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg.append("g")
    .attr("id", "xaxis")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`);

svg.append("g")
    .attr("id", "yaxis")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

function mealStackViewInitial() {
    let processedActuals = processActuals(actuals);

    let maxSum = 0;
    let maxMeal = null;

    processedActuals.forEach(meal => {
        let num = meal.protein + meal.carbs + meal.fat;
    
        if (num > maxSum) {
            maxSum = num;
            maxMeal = meal.meal;
        }  
    });
    
    let scaleMacro = d3.scaleLinear()
        .domain([0, maxSum])
        .range([height - margin.top - margin.bottom, 0]);
    
    svg.select("#xaxis")
        .call(d3.axisBottom(scaleBandedMeals))
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
    
    svg.select("#yaxis")
        .call(d3.axisLeft(scaleMacro))
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    let foodkeys = ['protein', 'fat', 'carbs'];

    stackfood = d3.stack()
        .keys(foodkeys)
        (processedActuals);

        svg.append("g")
    .selectAll(".bucket")
    .data(stackfood)
    .join("g")
    .attr("class", "bucket")
    .attr("fill", (_, i) => scaleColorMacros([foodkeys[i]]))
    .selectAll("rect")
    .data((d, i) => {
        return d.map(item => {
            const combinedClass = `${foodkeys[i]} ${item.data.meal}`;
            return { ...item, className: combinedClass };
        });
    })
    .join("rect")
    .attr("x", d => scaleBandedMeals(d.data.meal) + margin.left)
    .attr("y", d => scaleMacro(d[1]) + margin.top)
    .attr("height", d => scaleMacro(d[0]) - scaleMacro(d[1]))
    .attr("width", scaleBandedMeals.bandwidth())
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr("class", d => {
        return d.className;
    })
    .on("mouseover", function(event, d) {
        const svgElement = event.target;
        const classNames = d3.select(this).attr("class").split(" "); // Split class names
        const mealClass = classNames[0]; // Meal class name
        const macroClass = classNames[1]; // Macro class name

        if (mealClass === "additional-bar") {
            d3.selectAll("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("stroke-width", "3px")
            .style("opacity", 0.75);

            d3.selectAll(".defecit")
            .transition()
            .duration(200)
            .style("stroke-width", "3px")
            .style("opacity", 0.75);
        } else {
            svg.selectAll("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("stroke-width", "3px")
            .style("opacity", 0.5);

            d3.select("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("stroke-width", "3px")
            .style("opacity", 0.5);
        }
    
        d3.selectAll("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("opacity", 0.5);
        
        svg.select("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("opacity", 0.5);

            handleMouseOver(event, d, svgElement)
    })
    .on("mouseout", function(event) {
        const classNames = d3.select(this).attr("class").split(" ");
        const mealClass = classNames[0];
        const macroClass = classNames[1];
    
        d3.selectAll("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("opacity", 1);
        
        svg.select("." + mealClass + "." + macroClass)
            .transition()
            .duration(200)
            .style("opacity", 1);

            handleMouseOut()
    })
}

function mealStackView(svg) {
    let processedActuals = processActuals(actuals);

    let maxSum = 0;
    let maxMeal = null;

    processedActuals.forEach(meal => {
        let num = meal.protein + meal.carbs + meal.fat;
    
        if (num > maxSum) {
            maxSum = num;
            maxMeal = meal.meal;
        }  
    });
    
    let scaleMacro = d3.scaleLinear()
        .domain([0, maxSum])
        .range([height - margin.top - margin.bottom, 0]);

    svg.selectAll("rect.additional-bar")
    .transition()
        .duration(1000)
        .attr('opacity', 0)
        .remove();

    svg.select("#xaxis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(scaleBandedMeals))
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    svg.select("#yaxis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(scaleMacro))
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let foodkeys = ['protein', 'fat', 'carbs'];
    //let mealkeys = ['breakfast', 'lunch', 'dinner', 'snacks'];

    stackfood = d3.stack()
        .keys(foodkeys)
        (processedActuals);
    svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#1b9e77";
        })
            .selectAll("rect")
            .data(d => d)
            .transition()
            .duration(1000)
            .attr("width", scaleBandedMeals.bandwidth())
            .attr("height", d => {
                return scaleMacro(d[0]) - scaleMacro(d[1]);
            })
            .attr("x", (d, i, nodes) => {
                const meal = d3.select(nodes[i]).attr("class").split(" ")[1];
                return scaleBandedMeals(meal) + margin.left;
            })
            .attr("y", d => {
                return scaleMacro(d[1]) + margin.top;
            });

    svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#d95f02";
        })
            .selectAll("rect")
            .data(d => d)
            .transition()
            .duration(1000)
            .attr("width", scaleBandedMeals.bandwidth())
            .attr("height", d => {
                return scaleMacro(d[0]) - scaleMacro(d[1]);
            })
            .attr("x", (d, i, nodes) => {
                const meal = d3.select(nodes[i]).attr("class").split(" ")[1];
                return scaleBandedMeals(meal) + margin.left;
            })
            .attr("y", d => {
                return scaleMacro(d[1]) + margin.top;
            });

    svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#7570b3";
        })
            .selectAll("rect")
            .data(d => d)
            .transition()
            .duration(1000)
            .attr("width", scaleBandedMeals.bandwidth())
            .attr("height", d => {
                return scaleMacro(d[0]) - scaleMacro(d[1]);
            })
            .attr("x", (d, i, nodes) => {
                const meal = d3.select(nodes[i]).attr("class").split(" ")[1];
                return scaleBandedMeals(meal) + margin.left;
            })
            .attr("y", d => {
                return scaleMacro(d[1]) + margin.top;
            });
}

function handleMouseOver(event, d, svgElement) {
    const grams = d[1] - d[0];
    
    const macro = stackfood[event.target.parentNode.__data__.index].key;
    
    const [mouseX, mouseY] = d3.pointer(event);

    let meal;

    meal = d3.select(svgElement).attr("class");

    const tooltipWidth = 150;
    const tooltipHeight = 30;
    const tooltipPadding = 10;

    let tooltipX = mouseX + tooltipPadding;
    let tooltipY = mouseY - tooltipHeight - tooltipPadding;

    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");

    if (tooltipX + tooltipWidth > svgWidth) {
        tooltipX = svgWidth - tooltipWidth;
    }
    if (tooltipY < 0) {
        tooltipY = 0;
    }
    if (tooltipY + tooltipHeight > svgHeight) {
        tooltipY = svgHeight - tooltipHeight;
    }

    let thisGCount = grams / (macro==="fat" ? 9 : 4);
    let calPCT = Math.round((grams / needs.Calories) * 100);
    let macroPCT = Math.round((macro==="fat" ? (thisGCount / needs.Fat)*100 : macro === "carbs" ? (thisGCount / needs.Carbohydrates)*100 : (thisGCount / needs.Protein)*100));

    const tooltipBg = svg.append("rect")
        .attr("id", "tooltip-bg")
        .attr("x", tooltipX)
        .attr("y", tooltipY)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("pointer-events", "none"); // Disable pointer events to allow interaction with elements underneath

    const tooltipText = svg.append("text")
        .attr("id", "tooltip")
        .attr("x", tooltipX + tooltipPadding)
        .attr("y", tooltipY + tooltipHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "black")
        tooltipText.append("tspan").text(`${grams} calories`);
        tooltipText.append("tspan").text(`${thisGCount} grams of ${macro}`).attr("x", tooltipX + tooltipPadding).attr("dy", "1.2em");
        tooltipText.append("tspan").text(`${calPCT}% of daily caloric needs`).attr("x", tooltipX + tooltipPadding).attr("dy", "1.2em");
        tooltipText.append("tspan").text(`${macroPCT}% of daily ${macro} needs`).attr("x", tooltipX + tooltipPadding).attr("dy", "1.2em");

    const tooltipHeading = svg.append("text")
        .attr("id", "tooltip-heading")
        .attr("x", tooltipX + tooltipPadding)
        .attr("y", tooltipY + tooltipHeight / 2 - 20)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .text(`${meal}`);

    const textWidth = tooltipText.node().getBBox().width + 2 * tooltipPadding;
    const textHeight = tooltipText.node().getBBox().height + 2 * tooltipPadding;
    
    tooltipBg.attr("width", textWidth)
        .attr("height", textHeight);

    setTimeout(() => {
        tooltipBg.remove();
        tooltipText.remove();
        tooltipHeading.remove();
    }, 3000);
}

function handleMouseOut() {
    d3.select("#tooltip").remove();
    d3.select("#tooltip-bg").remove();
    d3.select("#tooltip-heading").remove();
}

function mealBarView(svg) {
    let processedActuals = processActualsAgain(actuals, needs);
    
    let sumProtein = 0;
    let sumCarbs = 0;
    let sumFat = 0;

    processedActuals.forEach(meal => {
        if (meal.macro === 'protein') {
            sumProtein += meal.breakfast * 4 + meal.lunch * 4 + meal.dinner * 4 + meal.snacks * 4;
        } else if (meal.macro === 'carbs') {
            sumCarbs += meal.breakfast * 4 + meal.lunch  * 4 + meal.dinner  * 4 + meal.snacks  * 4;
        } else {
            sumFat += meal.breakfast * 9 + meal.lunch * 9 + meal.dinner * 9 + meal.snacks * 9;
        }
    });

    let diffP = needs.Protein*4 - sumProtein;
    let diffC = needs.Carbohydrates*4 - sumCarbs;
    let diffF = needs.Fat*9 - sumFat;

    let scaleMacro = d3.scaleLinear()
            .domain([0, (needs.Carbohydrates * 4)])
            .range([0, width - margin.left - margin.right]);

        svg.select("#xaxis")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(scaleMacro));
        
        svg.select("#yaxis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(scaleBandedMacros))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-90)")
                .style("text-anchor", "end");
    
    let foodkeys = ['protein', 'fat', 'carbs'];
    let mealkeys = ['breakfast', 'lunch', 'dinner', 'snacks'];
    let stackfood = d3.stack()
            .keys(mealkeys)
            (processedActuals);

    let proteinWidth = 0;
    let fatWidth = 0;
    let carbWidth = 0;

    svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#1b9e77";
        })
            .selectAll("rect")
            .data(d => d)
            .transition()
            .duration(1000)
            .attr("height", scaleBandedMacros.bandwidth())
            .attr("width", d => scaleMacro(d[1]))
            .attr("x", (d, i, nodes) => {
                proteinWidth += scaleMacro(d[1]);
                return proteinWidth - scaleMacro(d[1]) + margin.left;
            })
            .attr("y", d => {
                const macro = 'protein';
                return scaleBandedMacros(macro) + margin.top;
            })

    if (diffP > 0) {
        svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#1b9e77";
        })
        .append("rect")
        .attr("class", "additional-bar")
        .attr("height", scaleBandedMacros.bandwidth())
        .attr("width", scaleMacro(Math.abs(diffP))) // Use diffP directly as the width
        .attr("x", proteinWidth + margin.left)
        .attr("y", d => {
            const macro = 'protein';
            return scaleBandedMacros(macro) + margin.top;
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("opacity", 0) // Set initial opacity to 0
        //.attr("opacity", 0.5) // Transition opacity to 1
        .on("mouseover", function(event) {
            const svgElement = event.target;

            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 0.75); // Decrease opacity on mouseover

                const d = d3.select(this).datum(); // Get the data associated with the current element
                const [mouseX, mouseY] = d3.pointer(event);

                const tooltipWidth = 150;
                const tooltipHeight = 30;
                const tooltipPadding = 10;

                let tooltipX = mouseX + tooltipPadding;
                let tooltipY = mouseY - tooltipHeight - tooltipPadding;

            const svgWidth = +svg.attr("width");
            const svgHeight = +svg.attr("height");

            if (tooltipX + tooltipWidth > svgWidth) {
                tooltipX = svgWidth - tooltipWidth;
            }
            if (tooltipY < 0) {
                tooltipY = 0;
            }
            if (tooltipY + tooltipHeight > svgHeight) {
                tooltipY = svgHeight - tooltipHeight;
            }

            const tooltipBg = svg.append("rect")
                .attr("id", "tooltip-bg")
                .attr("x", tooltipX)
                .attr("y", tooltipY)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("pointer-events", "none"); // Disable pointer events to allow interaction with elements underneath

            const tooltipText = svg.append("text")
                .attr("id", "tooltip")
                .attr("x", tooltipX + tooltipPadding)
                .attr("y", tooltipY + tooltipHeight / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "start")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black")
                tooltipText.append("tspan").text(`${diffP} calories`)
                tooltipText.append("tspan").text(`${diffP / 4} grams of protein`)
                    .attr("x", tooltipX + tooltipPadding)
                    .attr("dy", "1.2em");;

            const tooltipHeading = svg.append("text")
                .attr("id", "tooltip-heading")
                .attr("x", tooltipX + tooltipPadding)
                .attr("y", tooltipY + tooltipHeight / 2 - 20) // Place above the tooltip text
                .attr("dy", "0.35em") // Center text vertically
                .attr("text-anchor", "start")
                .attr("font-weight", "bold") // Make the text bold
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("fill", "black")
                .text(`Deficit`);
    
    const textWidth = tooltipText.node().getBBox().width + 2 * tooltipPadding;
    const textHeight = tooltipText.node().getBBox().height + 2 * tooltipPadding;
    
    tooltipBg.attr("width", textWidth)
        .attr("height", textHeight);

    setTimeout(() => {
        tooltipBg.remove();
        tooltipText.remove();
        tooltipHeading.remove();
    }, 3000);

        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 0.5);
    
                d3.select("#tooltip")
                 .remove();

             d3.select("#tooltip-bg")
                 .remove();

             d3.select("#tooltip-heading")
                 .remove();
        })
        .transition()
            .duration(1000)
        .attr("opacity", 0.5)

    }        
    
    svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#d95f02";
        })
            .selectAll("rect")
            .data(d => d)
            .transition()
            .duration(1000)
            .attr("height", scaleBandedMacros.bandwidth())
            .attr("width", d => scaleMacro(d.data.fat))
            .attr("x", (d, i, nodes) => {
                fatWidth += scaleMacro(d.data.fat);
                return fatWidth - scaleMacro(d.data.fat) + margin.left;
            })
            .attr("y", d => {
                const macro = 'fat';
                return scaleBandedMacros(macro) + margin.top;
            })

            if (diffF > 0) {
                svg.selectAll(".bucket")
                .filter(function() {
                    return d3.select(this).attr("fill") === "#d95f02";
                })
                .append("rect")
                .attr("class", "additional-bar")
                .attr("height", scaleBandedMacros.bandwidth())
                .attr("width", scaleMacro(Math.abs(diffF))) // Use diffP directly as the width
                .attr("x", fatWidth + margin.left)
                .attr("y", d => {
                    const macro = 'fat';
                    return scaleBandedMacros(macro) + margin.top;
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("opacity", 0) // Set initial opacity to 0
                .on("mouseover", function(event) {
                    const svgElement = event.target;
        
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.75); // Decrease opacity on mouseover
        
                        const d = d3.select(this).datum(); // Get the data associated with the current element
                        const [mouseX, mouseY] = d3.pointer(event);
        
                        const tooltipWidth = 150;
                        const tooltipHeight = 30;
                        const tooltipPadding = 10;
        
                        let tooltipX = mouseX + tooltipPadding;
                        let tooltipY = mouseY - tooltipHeight - tooltipPadding;
        
                    const svgWidth = +svg.attr("width");
                    const svgHeight = +svg.attr("height");
        
                    if (tooltipX + tooltipWidth > svgWidth) {
                        tooltipX = svgWidth - tooltipWidth;
                    }
                    if (tooltipY < 0) {
                        tooltipY = 0;
                    }
                    if (tooltipY + tooltipHeight > svgHeight) {
                        tooltipY = svgHeight - tooltipHeight;
                    }
        
                    const tooltipBg = svg.append("rect")
                        .attr("id", "tooltip-bg")
                        .attr("x", tooltipX)
                        .attr("y", tooltipY)
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("rx", 5)
                        .attr("ry", 5)
                        .attr("pointer-events", "none"); // Disable pointer events to allow interaction with elements underneath
        
                    const tooltipText = svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", tooltipX + tooltipPadding)
                        .attr("y", tooltipY + tooltipHeight / 2)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "start")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("fill", "black")
                        tooltipText.append("tspan").text(`${diffP} calories`)
                        tooltipText.append("tspan").text(`${diffP / 9} grams of fat`)
                            .attr("x", tooltipX + tooltipPadding)
                            .attr("dy", "1.2em");;
        
                    const tooltipHeading = svg.append("text")
                        .attr("id", "tooltip-heading")
                        .attr("x", tooltipX + tooltipPadding)
                        .attr("y", tooltipY + tooltipHeight / 2 - 20)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "14px")
                        .attr("fill", "black")
                        .text(`Deficit`);
            
            const textWidth = tooltipText.node().getBBox().width + 2 * tooltipPadding;
            const textHeight = tooltipText.node().getBBox().height + 2 * tooltipPadding;

            tooltipBg.attr("width", textWidth)
                .attr("height", textHeight);
        
            setTimeout(() => {
                tooltipBg.remove();
                tooltipText.remove();
                tooltipHeading.remove();
            }, 3000);
        
                })
                .on("mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.5); // Decrease opacity on mouseover
            
                        d3.select("#tooltip")
                         .remove();
        
                     d3.select("#tooltip-bg")
                         .remove();
        
                     d3.select("#tooltip-heading")
                         .remove();
                })
                .transition()
            .duration(1000)
        .attr("opacity", 0.5)
            }

        svg.selectAll(".bucket")
        .filter(function() {
            return d3.select(this).attr("fill") === "#7570b3";
        })
            .selectAll("rect")
            .data(d => d)
            .transition()
            .duration(1000)
            .attr("height", scaleBandedMacros.bandwidth())
            .attr("width", d => scaleMacro(d.data.carbs))
            .attr("x", (d, i, nodes) => {
                carbWidth += scaleMacro(d.data.carbs);
                return carbWidth - scaleMacro(d.data.carbs) + margin.left;
            })
            .attr("y", d => {
                const macro = 'carbs';
                return scaleBandedMacros(macro) + margin.top;
            })

            if (diffC > 0) {
                svg.selectAll(".bucket")
                .filter(function() {
                    return d3.select(this).attr("fill") === "#7570b3";
                })
                .append("rect")
                .attr("class", "additional-bar")
                .attr("height", scaleBandedMacros.bandwidth())
                .attr("width", scaleMacro(Math.abs(diffC))) // Use diffP directly as the width
                .attr("x", carbWidth + margin.left)
                .attr("y", d => {
                    const macro = 'carbs';
                    return scaleBandedMacros(macro) + margin.top;
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("opacity", 0) // Set initial opacity to 0
                .on("mouseover", function(event) {
                    const svgElement = event.target;
        
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.75); // Decrease opacity on mouseover
        
                        const d = d3.select(this).datum(); // Get the data associated with the current element
                        const [mouseX, mouseY] = d3.pointer(event);
        
                        const tooltipWidth = 150;
                        const tooltipHeight = 30;
                        const tooltipPadding = 10;
        
                        let tooltipX = mouseX + tooltipPadding;
                        let tooltipY = mouseY - tooltipHeight - tooltipPadding;
        
                    const svgWidth = +svg.attr("width");
                    const svgHeight = +svg.attr("height");
        
                    if (tooltipX + tooltipWidth > svgWidth) {
                        tooltipX = svgWidth - tooltipWidth;
                    }
                    if (tooltipY < 0) {
                        tooltipY = 0;
                    }
                    if (tooltipY + tooltipHeight > svgHeight) {
                        tooltipY = svgHeight - tooltipHeight;
                    }
        
                    const tooltipBg = svg.append("rect")
                        .attr("id", "tooltip-bg")
                        .attr("x", tooltipX)
                        .attr("y", tooltipY)
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("rx", 5)
                        .attr("ry", 5)
                        .attr("pointer-events", "none"); // Disable pointer events to allow interaction with elements underneath
        
                    const tooltipText = svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", tooltipX + tooltipPadding)
                        .attr("y", tooltipY + tooltipHeight / 2)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "start")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("fill", "black")
                        tooltipText.append("tspan").text(`${diffP} calories`)
                        tooltipText.append("tspan").text(`${diffP / 4} grams of carbs`)
                            .attr("x", tooltipX + tooltipPadding)
                            .attr("dy", "1.2em");;
        
                    const tooltipHeading = svg.append("text")
                        .attr("id", "tooltip-heading")
                        .attr("x", tooltipX + tooltipPadding)
                        .attr("y", tooltipY + tooltipHeight / 2 - 20)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "14px")
                        .attr("fill", "black")
                        .text(`Deficit`);
            
            const textWidth = tooltipText.node().getBBox().width + 2 * tooltipPadding;
            const textHeight = tooltipText.node().getBBox().height + 2 * tooltipPadding;
            
            tooltipBg.attr("width", textWidth)
                .attr("height", textHeight);
        
            setTimeout(() => {
                tooltipBg.remove();
                tooltipText.remove();
                tooltipHeading.remove();
            }, 3000);
        
                })
                .on("mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.5); // Decrease opacity on mouseover
            
                        d3.select("#tooltip")
                         .remove();
        
                     d3.select("#tooltip-bg")
                         .remove();
        
                     d3.select("#tooltip-heading")
                         .remove();
                })
                .transition()
            .duration(1000)
        .attr("opacity", 0.5) // Transition opacity to 1
            }
                    
}

let isMealBarView = false;

function toggleView() {
    if (isMealBarView) {
        transitionToNewView(mealStackView);
        isMealBarView = false;
    } else {
        transitionToNewView(mealBarView);
        isMealBarView = true;
    }
}

function transitionToNewView(newViewFn) {
    const svg = d3.select("svg");
    newViewFn(svg);
}
    
document.getElementById("viewButton").addEventListener("click", toggleView);

transitionToNewView(mealStackViewInitial);

document.getElementById("proteinButton").addEventListener("click", function() {
    createTreemap(hierarchicals, "Protein");
});

document.getElementById("carbsButton").addEventListener("click", function() {
    createTreemap(hierarchicals, "Carbohydrate");
});

document.getElementById("fatButton").addEventListener("click", function() {
    createTreemap(hierarchicals, "Fat");
});

document.getElementById("caloriesButton").addEventListener("click", function() {
    createTreemap(hierarchicals, "Calories");
});

function pieCharts() {
    var data = processActualsAgain(actuals, needs);

    var numCharts = data.length;
    var containerWidth = 600;
    var containerHeight = 200;
    var padding = 20;

    var pwidth = (containerWidth - (numCharts + 1) * padding) / numCharts;
    var pheight = containerHeight - 2 * padding;

    var color = d3.scaleOrdinal()
        .domain(["breakfast", "lunch", "dinner", "snacks", "defecit"])
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#FF0000"]);

    var pie = d3.pie()
        .sort(null)
        .startAngle(-Math.PI + .5) // <-- Setting startAngle of the layout
        .endAngle(Math.PI - .5) // <-- and endAngle
        .value(function(d) { return d.value; });

    var svgContainer = d3.select("#pieChartContainer")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .style("border", "1px dotted black");

    var pieCharts = svgContainer.selectAll(".pie-chart")
        .data(data)
        .enter()
        .append("g")
        //.attr("class", "pie-chart")
        .attr("transform", function(d, i) {
            var x = (i + 1) * padding + i * pwidth + pwidth / 2;
            var y = containerHeight / 2;
            return "translate(" + x + "," + y + ")";
        });

    var arc = d3.arc()
        .innerRadius(Math.min(pwidth, pheight) / 4)
        .outerRadius(Math.min(pwidth, pheight) / 2); // Use the minimum of pwidth and pheight for the radius

    // Process the data and draw pie charts
    pieCharts.each(function(d) {
        if (!d || !d.macro) return;
        
        var pieData = Object.entries(d).filter(function(entry) {
            return entry[0] !== "macro";
        }).map(function(entry) {
            return { key: entry[0], value: entry[1], macro: d.macro };
        });
    
        var pieGroup = d3.select(this);

        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden");

        var arcs = pieGroup.selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("class", function(d) {
            console.log(d.data.key + " " + d.data.macro)
            return d.data.key + " " + d.data.macro;
        })
        .attr("d", arc)
        .attr("fill", function(d) { return scaleColorMacros(d.data.macro); })
        .style("opacity", function(d) {
            return d.data.key === 'defecit' ? 0.5 : 1;
        })
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        //.style("opacity", 1)
        .on("mouseover", function(event, d) {
            const svgElement = event.target;
            const classNames = d3.select(this).attr("class").split(" "); // Split class names
            const mealClass = classNames[0]; // Meal class name
            const macroClass = classNames[1]; // Macro class name

            if (mealClass === "defecit") {
                d3.selectAll("." + mealClass + "." + macroClass)
                .transition()
                .duration(200)
                .style("stroke-width", "3px")
                .style("opacity", 0.75);

                svg.selectAll(".additional-bar")
                .transition()
                .duration(200)
                .style("stroke-width", "3px")
                .style("opacity", 0.75);
            } else {
                d3.selectAll("." + mealClass + "." + macroClass)
                .transition()
                .duration(200)
                .style("stroke-width", "3px")
                .style("opacity", 0.5);

                svg.select("." + mealClass + "." + macroClass)
                .transition()
                .duration(200)
                .style("stroke-width", "3px")
                .style("opacity", 0.5);
            }
        })
        .on("mouseout", function(event) {
            const classNames = d3.select(this).attr("class").split(" "); // Split class names
            const mealClass = classNames[0]; // Meal class name
            const macroClass = classNames[1]; // Macro class name
        
            if (mealClass === "defecit") {
                d3.selectAll("." + mealClass + "." + macroClass)
                .transition()
                .duration(200)
                .style("stroke-width", "1px")
                .style("opacity", 0.5);

                svg.selectAll(".additional-bar")
                .transition()
                .duration(200)
                .style("stroke-width", "1px")
                .style("opacity", 0.5);
            } else {
                d3.selectAll("." + mealClass + "." + macroClass)
                .transition()
                .duration(200)
                .style("stroke-width", "1px")
                .style("opacity", 1);

                svg.select("." + mealClass + "." + macroClass)
                .transition()
                .duration(200)
                .style("stroke-width", "1px")
                .style("opacity", 1);
            }
        })

        // var labels = pieGroup.selectAll("text")
        //     .data(pie(pieData))
        //     .enter()
        //     .append("text")
        //     .attr("transform", function(d) {
        //         var pos = arc.centroid(d);
        //         return "translate(" + pos + ")";
        //     })
        //     .attr("dy", "0.35em")
        //     .text(function(d) { return d.data.key; })
        //     .attr("fill", "white")
        //     .style("font-size", "12px")
        //     .style("text-anchor", "middle");
    });
}

function createTreemap(data, view) {
    let width = 600;
    let height = 400;
    let margin = { top: 10, right: 10, bottom: 10, left: 10 };

    // Check if treemap SVG already exists
    let svg = d3.select("#treemapContainer svg");
    let g;

    if (svg.empty()) {
        // If treemap SVG doesn't exist, create a new one
        svg = d3.select("#treemapContainer")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g = svg.append("g");
    } else {
        // If treemap SVG exists, select the existing g element
        g = svg.select("g");
    }

    // Update the size of the treemap
    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    let root = d3.hierarchy(data).sum(function (d) { return d[view]; });

    d3.treemap()
        .size([width, height])
        .padding(2)
        (root);

    // Update or create rectangles
    let rects = g.selectAll("rect")
        .data(root.leaves());

    rects.enter()
        .append("rect")
        .merge(rects)
        .transition()
        .duration(1000)
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", ScaleColorMacros(view));

    rects.exit().remove();

let labels = g.selectAll("text")
.data(root.leaves());

labels.enter()
.append("text")
.merge(labels)
.attr("x", function(d){ return (d.x0 + d.x1) / 2; })
.attr("y", function(d){ return (d.y0 + d.y1) / 2; })
.text(function(d){ return d.data.description; })
.attr("font-size", "15px")
.attr("fill", "white")
.attr("text-anchor", "middle")
.attr("dy", "0.35em")
.each(function() {
    const rectWidth = parseFloat(d3.select(this.parentNode).select("rect").attr("width"));
    const rectHeight = parseFloat(d3.select(this.parentNode).select("rect").attr("height"));
    const textWidth = this.getBBox().width;
    const textHeight = this.getBBox().height;

    if (textWidth > rectWidth || textHeight > rectHeight) {
        d3.select(this).style("font-size", "6px");
    }
});

labels.exit().remove();
}


createTreemap(hierarchicals, "Protein"); // initalize with "energy view"

pieCharts();

d3.select("#barChartContainer")
    .append(() => svg.node());