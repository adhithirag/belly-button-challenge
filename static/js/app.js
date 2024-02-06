const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and push it into the empty array
let data_array = []
d3.json(url).then(function(data) {
    data_array.push(data);
});

//Console log the data_array
console.log(data_array);

// Creating a for loop to loop through the samples object in samples.json 

// Created three empty arrays
let sample_values = []
let otu_ids = []
let otu_labels = []

//console.log(otu_ids);

// For loop to populate the arrays 
for (let i=0; i<otu_ids.length; i++) {
    row = otu_ids[i];
    otu_ids.push(row);
    sample_values.push(row);
    otu_labels.push(row);
}

console.log(otu_ids);