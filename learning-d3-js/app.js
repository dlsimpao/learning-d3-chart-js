/* Resources
# Basic introduction
https://www.youtube.com/watch?v=TOJ9yjvlapY&ab_channel=Academind

# Documentation
https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js

# Y Axis ticks not showing up
https://stackoverflow.com/questions/40753501/d3-yaxis-ticks-not-showing-up

*/


//console.log(d3);

const DUMMY_DATA = [
    {id: 'd1', value: 85.18, model: 'Logistic Regression'},
    {id: 'd2', value: 78.71, model: 'Naive Bayes'},
    {id: 'd3', value: 72.02, model: 'KNN'},
    {id: 'd4', value: 88.80, model: 'SVM'},
    {id: 'd5', value: 65.66, model: 'Adaboost'}
];

margin = 200;
width = 600-margin;
height = 500-margin;
/*
select('svg') - gets all elements, class, ids
classed() - gets whether element has a specific class
*/

var container = d3.select('svg')
  .classed('container',true) // parameters: class and boolean if true or false

/*
Notice for non-svg
We use style()

For svg
We use attr()
*/

/* USED FOR PLACING ITEMS IN A COORDINATE SYSTEM
scaleBand() - sets all items to have the same width; used for discrete/categorical data
rangeRound() - gets available space 
padding() - sets space between elements

scaleLinear() - sets all equal spacing; used for continuous data
domain() - sets min and max values based off data values
range() - sets max min based off container
*/


var xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map((dataPoint) => dataPoint.model)) //domain of data categories
  .rangeRound([0,width]) //min, max width of container
  .padding(0.4);

var yScale = d3
  .scaleLinear()
  .domain([0,100]) //domain of data values
  .range([height, 0]); 


/*
data() - an array of information; sets data
enter() - gets differences between operations and existing
append() - adds if differences are seen
attr() -  adds attributes to 'rect'
*/

// Creating the bars

const bars = container
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar',true) //adds bar class, defined in index.html
  .attr('width', xScale.bandwidth()) 
  .attr('height', data => height-yScale(data.value)) //function data references data values from DUMMY_DATA
  .attr('x', data => xScale(data.model))
  .attr('y', data => yScale(data.value))

var g = container.append('g')


//Setting the x and y axes


  g.append('g')
    .attr('transform','translate(0,'+height+')')
    .call(d3.axisBottom(xScale));

  g.append('g')
    .attr('transform','translate(30,0)')
    .call(d3.axisLeft(yScale).tickFormat(function(data){
        return data;
    }).ticks(10))
    .append('text')
    .attr('y',6)
    .attr('dy','0.71em')
    .attr('text-anchor','end')
    .text('value');