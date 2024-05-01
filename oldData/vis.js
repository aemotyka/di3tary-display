function generateVisualizations() {
    console.log(allFood);
    [calorieDataset, macroDataset] = generateBarChart(allFood, "calories");
    userNeeds = calculateNecessaryNutrition(userInfo);
    console.log(userNeeds);
    actuals = calculateTotalCalsAndMacros(allFood);
    console.log(actuals);
    generateArcsVisualization(actuals, userNeeds);
}




function generateBarChart(data, view) {
    // Calculate totals for each macronutrient
    const totalCalories = data.reduce((sum, item) => sum + item.Energy, 0);
    const totalCarbs = data.reduce((sum, item) => sum + item.Carbohydrate, 0);
    const totalProtein = data.reduce((sum, item) => sum + item.Protein, 0);
    const totalFat = data.reduce((sum, item) => sum + item.Fat, 0);

    console.log(totalCalories);
    // Create datasets for each view
    const calorieDataset = [{ description: 'Total Calories', value: totalCalories }];
    const macroDataset = [
        { description: 'Total Carbohydrates', value: totalCarbs },
        { description: 'Total Protein', value: totalProtein },
        { description: 'Total Fat', value: totalFat }
    ];
    console.log(macroDataset);
    
    // Render the appropriate dataset based on the view
    if (view === 'calories') {
        renderBarChart(calorieDataset);
    } else {
        console.log(macroDataset);
        renderBarChart(macroDataset);
    }

    // Return both datasets
    return [calorieDataset, macroDataset];
}

function toggleView() {
    const currentView = document.getElementById("barChart").dataset.view;
  
    // Render the appropriate dataset based on the current view
    if (currentView === 'calories') {
        renderBarChart(macroDataset); // Pass macroDataset when switching to macros view
        document.getElementById("barChart").dataset.view = 'macros';
    } else {
        renderBarChart(calorieDataset); // Pass calorieDataset when switching to calories view
        document.getElementById("barChart").dataset.view = 'calories';
    }
}


// Function to render the bar chart
function renderBarChart(dataset) {

    // Define dimensions and margins for the SVG
   

    // Create SVG element
    const svg = d3.select("#barChart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Create scales
    const xScale = d3.scaleBand()
      .domain(dataset.map(d => d.description))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.value)])
      .range([height, 0]);
  
    // Add bars to the chart
    svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.description))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d.value))
      .attr("height", d => height - yScale(d.value));
  
    // Add x-axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
  
    // Add y-axis
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));
}

function generateArcsVisualization(caloriesConsumed, macroValues) {
    // Calculate necessary values for arcs
    const svgWidth = 400;
    const svgHeight = 200;
    const radius = Math.min(svgWidth, svgHeight) / 2;
    const arcWidth = 20;
    const arcPadding = 10;

    // Create SVG element
    const svg = d3.select("#arcsChart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

    // Define color scale for different macronutrients
    const colorScale = d3.scaleOrdinal()
        .domain(["Carbs", "Protein", "Fat"])
        .range(["#ffcc00", "#ff6666", "#3399ff"]);

    // Define arcs
    const arcs = d3.arc()
        .innerRadius(radius - arcWidth - arcPadding)
        .outerRadius(radius - arcPadding);

    // Generate arcs for each macronutrient
    const arcsData = d3.pie()(Object.values(macroValues));

    // Append arcs to SVG
    svg.selectAll("path")
        .data(arcsData)
        .enter()
        .append("path")
        .attr("d", arcs)
        .attr("fill", (d, i) => colorScale(Object.keys(macroValues)[i]));

    // Draw a single arc for calories
    const caloriesArc = d3.arc()
        .innerRadius(radius - arcWidth - arcPadding)
        .outerRadius(radius - arcPadding)
        .startAngle(0)
        .endAngle(Math.PI * 2 * (caloriesConsumed / macroValues.calories));

    svg.append("path")
        .attr("d", caloriesArc)
        .attr("fill", "#66ccff");
}

// Toggle view function
function toggleArcsView() {
    // Toggle between calorie only and all macronutrient view
    // Update arcs visualization based on the selected view
}