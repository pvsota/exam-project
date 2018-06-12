//global variables
let myChart;
let data;
let queLength;
let peopleServed;
let myLineChart;
let i = 0; // counter for interval we set 
let j = 0; // counter for lenght of data array

// Chart.js library, we learned to use it from youtube tutorials and their documentation
let canvas = document.getElementById('myChart');
data = {
    labels: ["0"],
    datasets: [
        {
            label: "People in queue",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [0],
        },
        {
          label: "People getting served",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(192,75,75,0.4)",
          borderColor: "rgba(192,75,75,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(192,75,75,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(192,75,75,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          data: [0],
      }
    ]
};
let option = {
	showLines: true
};
myLineChart = Chart.Line(canvas,{
	data:data,
  options:option
});
//adding data of people in que dynamically, function can be find in chart.js documentation
function addData(){
  myLineChart.data.datasets[0].data[j] = queLength;
  myLineChart.data.labels[j] = i;
  myLineChart.update();
}
//adding data of people getting served dynamically 
function addSecondData(){
  myLineChart.data.datasets[1].data[j] = peopleServed;
  myLineChart.data.labels[j] = i;
  myLineChart.update();
}

function loadJson(){
//get data
let data = FooBar.getData();
//transfer data to JSON
const json = JSON.parse(data);

console.log(json);
// assign length of que and length of people getting served to variable we are going to use in function to add data dynamically
queLength = json.queue.length ; 
peopleServed = json.serving.length;
// increasing the counters for function add data , i is for the interval, which we set for each 10 seconds and j is for the lenght of data array
i = i + 10; 
j ++;
// calling add data functions of the length of que and length of people getting served
addData();
addSecondData();

json.bartenders.forEach(element => {
    console.log(element.name +" is "+ element.status);
    
});

function getOrders(){
  //get data
let data = FooBar.getData();
//transfer data to JSON
const json = JSON.parse(data);
//select the template from HTML to get the info about beers
let template = document.querySelector("#que").content;
let parent = document.querySelector(".in-que");

let serveTemplate = document.querySelector("#serve").content;
let serveParent = document.querySelector(".in-serve");

parent.innerHTML = '';
json.queue.forEach(e =>{
  let clone = template.cloneNode(true);
  clone.querySelector('.id').textContent = "Order nr. " + (e.id + 1);
  e.order.forEach(i =>{
    clone.querySelector('.order').textContent += i + " ";
  })

  parent.appendChild(clone);
})
serveParent.innerHTML = '';
json.serving.forEach(e=>{
  let clone = serveTemplate.cloneNode(true);
  clone.querySelector('.serve-id').textContent = "Order nr. " + (e.id + 1);
  e.order.forEach(i =>{
    clone.querySelector('.serve-order').textContent += i + " ";
  })

  serveParent.appendChild(clone);

})


}
getOrders();

}
function getBeers(){
    //get data
let data = FooBar.getData();
//transfer data to JSON
const json = JSON.parse(data);
    //select the template from HTML to get the info about beers
let template = document.querySelector("#beer").content;
let parent = document.querySelector(".beers");
//run forEach method to loop through all the beers we have in object
json.beertypes.forEach(element => {
    let clone = template.cloneNode(true);
    clone.querySelector('.name').textContent = element.name;
    clone.querySelector('.category').textContent = element.category;
    clone.querySelector('.alc').textContent = element.alc + "%";
    clone.querySelector('.appearance').textContent = element.description.appearance;
    clone.querySelector('.aroma').textContent = element.description.aroma;
    clone.querySelector('.flavour').textContent = element.description.flavour;
    clone.querySelector('.mouthfeel').textContent = element.description.mouthfeel;
    clone.querySelector('.overall-impression').textContent = element.description.overallImpression;
    clone.querySelector('img').src = "images/" + element.label;
    let description = clone.querySelector('.description');
    clone.querySelector('button').addEventListener("click",()=>{
        description.classList.toggle('hidden');
    })

    parent.appendChild(clone);
});
}
//navigation links
document.querySelector('#beers-section').addEventListener("click",()=>{
  document.querySelector('.beers').classList.toggle('hidden');
})


loadJson();
getBeers();
setInterval(loadJson,10000);









