const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);

// Step 1: Fetch the JSON data and console log it 
d3.json(url).then(function(data) {
    console.log(data);
});


// initialize the dashboard on startup 
function init() {

    // Getting a reference to the button on the page with the id property set to `click-me`
    let dropDown = d3.select("#selDataset");
        // Use D3 to get sample names and populate the drop-down selector
        d3.json(url).then((data) => {
            console.log(data);

            let names = data.names;
            names.forEach((id) => {
            dropDown.append("option").text(id).property("value", id);
            });

        let firstSample = names[0];

        console.log(firstSample);

         //Building the initial plots 
         buildBarChart(firstSample);
         buildBubbleChart(firstSample);
         //buildGaugeChart(firstSample);
         buildMetadata(firstSample);
        });

        // Add event listener to the dropdown element
        dropDown.on("change", function() {
        // Get the selected sample
        let newSample = dropDown.property("value");
        // Call optionChanged function with the new sample
        optionChanged(newSample);
    });

};

//Building the Bar Chart
function buildBarChart(sample) {
    d3.json(url).then((data) => {
        console.log(data);

        let samples = data.samples;
        let results = samples.filter(sampleObject => sampleObject.id == sample);
        let result = results[0];
        let otu_ids = result.otu_ids;
        let sampleValues = result.sample_values;
        let labels = result.otu_labels
        

        let ytick = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let xtick = sampleValues.slice(0,10).reverse();
        let sampleLabels = labels.slice(0,10).reverse(); 

        let barGraph = {
            x: xtick,
            y: ytick,
            type: "bar",
            text: sampleLabels,
            orientation: "h"
          };

        let barTitle = {
            title: "Top 10 OTUs Present"
        };

        Plotly.newPlot("bar", [barGraph], barTitle);
    });       

};


//Building the Bubble Chart
function buildBubbleChart(sample) {
    d3.json(url).then((data) => {
        console.log(data);

        let samples = data.samples;
        let results = samples.filter(sampleObject => sampleObject.id == sample);
        let result = results[0];
        let otu_ids = result.otu_ids;
        let sampleValues = result.sample_values;
        let labels = result.otu_labels
        

        let ytick = sampleValues;
        let xtick = otu_ids;
        let sampleLabels = labels;


        let bubblePlot = {
            x: xtick,
            y: ytick,
            type: "bubble",
            text: sampleLabels,
            mode: 'markers',
            marker: { size:sampleValues,
                    color: otu_ids}
          };

        let bubbleTitle = {
            title: "otuID vs SampleValues",
            xaxis: {
                title: 'OTU ID' // Set the x-axis label
            },
            yaxis: {
                title: 'Sample Values' // Set the y-axis label
            }
        };

        Plotly.newPlot("bubble", [bubblePlot], bubbleTitle);
    });       

};


// Displaying the Metadata 
function buildMetadata(sample) {
    d3.json(url).then((data) => {
       console.log(data);
       let metadata = data.metadata;
       let results = metadata.filter(metadataObject => metadataObject.id == sample);
       let result = results[0];
       let metadataPanel = d3.select("#sample-metadata");
       //Clear any existing content 
       metadataPanel.html("");
       
       Object.entries(result).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);     

        });
    });
};


//Function to handle change in sample selection
function optionChanged(newSample) {
    buildBarChart(newSample);
    buildBubbleChart(newSample);
    buildMetadata(newSample);
};



// Call the init function
init();



































            
