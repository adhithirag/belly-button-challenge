const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let samples = []
d3.json(url).then(function(data) {
    samples.push(data);
});

//Console log the data_array
console.log(samples);

// Creating a for loop to loop through the samples object in samples.json 

// Created three empty arrays
let sample_values = []
let otu_ids = []
let otu_labels = []

//console.log(otu_ids);

console.log(samples);

// For loop to go through all the samples in the json file to populate the arrays 
for (let i=0; i<samples.length; i++) {
    row = otu_ids[i];
    otu_ids.push(row);
    sample_values.push(row);
    otu_labels.push(row);
}

console.log(otu_ids);



// initialize the dashboard on startup 
function init() {

    // Getting a reference to the button on the page with the id property set to `click-me`
    let dropDown = d3.select("#selDataset");
        // Use D3 to get sample names and populate the drop-down selector
        d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let sampleNames = data.names;

        // Add  samples to dropdown menu
        sampleNames.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropDown.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        // Build the initial plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });
};



