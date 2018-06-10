let queArray = [];
window.addEventListener("load", loadJson());
function loadJson(){
//get data
let data = FooBar.getData();
//transfer data to JSON
const json = JSON.parse(data);

console.log(json);
console.log("Bar named " + json.bar.name + " closing at: " + json.bar.closingTime);
console.log("People in the que: " + json.queue.length);
console.log("People getting served: " + json.serving.length);
queArray.push(json.queue.length);
console.log(queArray)


json.bartenders.forEach(element => {
    console.log(element.name +" is "+ element.status);
    
});
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
getBeers();
setInterval(loadJson,1000);


// Chart.js
let myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart, {
      type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['0', '10', '20', '30', '40', '50'],
        datasets:[{
          label:'People in queue',
          data:[
            15,
            13,
            4,
            7,
            2,
            12
          ],
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        },
        {
            label:'People served',
            data:[
              10,
              8,
              6,
              9,
              5,
              10
            ],
            //backgroundColor:'green',
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          }
    ]
      },
      options:{
        title:{
          display:true,
          text:'People in queue',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    }
    
);



