//global variables
let myChart;
let data;
let queLength;
let peopleServed;
let myLineChart;
let i = 0; // counter for interval we set 
let j = 0; // counter for lenght of data array
let beersTotal = 0; //counter for number of beers 
let orderTotal = 0;
let storageData = ["Peter"];
let storageDatasets = [];

//snippet of code, copied from stackoverflow
function countInArray(array, what) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === what) {
      count++;
    }
  }
  return count;
}

// Chart.js library, we learned to use it from youtube tutorials and their documentation
let canvas = document.getElementById('myChart');
data = {
  labels: ["0"],
  datasets: [{
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
myLineChart = Chart.Line(canvas, {
  data: data,
  options: option
});
//adding data of people in que dynamically, function can be find in chart.js documentation
function addData() {
  myLineChart.data.datasets[0].data[j] = queLength;
  myLineChart.data.labels[j] = i;
  myLineChart.update();
}
//adding data of people getting served dynamically 
function addSecondData() {
  myLineChart.data.datasets[1].data[j] = peopleServed;
  myLineChart.data.labels[j] = i;
  myLineChart.update();
}

//bar chart from chart js
let canvasD = document.getElementById('myDoughnut');
let dataD = {
    labels: storageDatasets,
    datasets: [
        {
            label: "Storage of beers",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: storageData,
        }
    ]
};
let optionD = {
    animation: false,
    scales: {
           
        xAxes: [{ticks: {
            autoSkip: false,
            beginAtZero: true,
            fontColor: '#fff',
            fontSize: 18
        },
            display: true,
            responsive: true,
           
        }],
        yAxes: [{ ticks: {
            beginAtZero: true,
            fontColor: '#fff',
            fontSize: 18,
           // mirror: true
            
        },
            display: true,
            responsive: true,

        }]
    }

};


var myBarChart = Chart.Bar(canvasD,{
	data:dataD,
  options:optionD
});

function loadJson() {
  //get data
  let data = FooBar.getData();
  //transfer data to JSON
  const json = JSON.parse(data);

  console.log(json);
  // assign length of que and length of people getting served to variable we are going to use in function to add data dynamically
  queLength = json.queue.length;
  peopleServed = json.serving.length;
  // increasing the counters for function add data , i is for the interval, which we set for each 10 seconds and j is for the lenght of data array
  i = i + 10;
  j++;
  // calling add data functions of the length of que and length of people getting served
  addData();
  addSecondData();

  function getStorage(){
    storageData = [];
    storageDatasets = [];
    //get data
    let data = FooBar.getData();
    //transfer data to JSON
    const json = JSON.parse(data);
    json.storage.forEach(e =>{
      storageDatasets.push(e.name);
      storageData.push(e.amount);

      //bar chart from chart js


let canvasD = document.getElementById('myDoughnut');
let dataD = {
    labels: storageDatasets,
    datasets: [
        {
            label: "Storage of beers",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: storageData,
        }
    ]
};
let optionD = {
    animation: false,
    scales: {
           
        xAxes: [{ticks: {
            autoSkip: false,
            beginAtZero: true,
            fontColor: '#fff',
            fontSize: 18
        },
            display: true,
            responsive: true,
           
        }],
        yAxes: [{ ticks: {
            beginAtZero: true,
            fontColor: '#fff',
            fontSize: 18,
           // mirror: true
            
        },
            display: true,
            responsive: true,

        }]
    }

};


var myBarChart = Chart.Bar(canvasD,{
	data:dataD,
  options:optionD
});

    })

  }



  function getOrders() {
    //get data
    let data = FooBar.getData();
    //transfer data to JSON
    const json = JSON.parse(data);
    //select the template from HTML to get the info about orders
    let template = document.querySelector("#que").content;
    let parent = document.querySelector(".in-que");

    let serveTemplate = document.querySelector("#serve").content;
    let serveParent = document.querySelector(".in-serve");

    parent.innerHTML = '';
    json.queue.forEach(e => {
      let clone = template.cloneNode(true);
      clone.querySelector('.id').textContent = "Order nr. " + (e.id + 1);

      

      // Show number of beers in order "X"+"Name"
      const orderinfo = {};

      // build orderinfo from e.order.forEach
      e.order.forEach(beer =>{
        const count = countInArray(e.order,beer);
        orderinfo[beer]=count;
      });

      for (name in orderinfo) {
        clone.querySelector('.order').textContent += "  " + orderinfo[name] + " " + name + " | ";
      }
      




      parent.appendChild(clone);
    })
    serveParent.innerHTML = '';
    json.serving.forEach(e => {
      let clone = serveTemplate.cloneNode(true);
      clone.querySelector('.serve-id').textContent = "Order nr. " + (e.id + 1);
      const orderinfo = {};
      e.order.forEach(beer => {
        const count = countInArray(e.order,beer);
        orderinfo[beer]=count;
      })
      for (name in orderinfo){
      clone.querySelector('.serve-order').textContent += "  " + orderinfo[name] + " " + name + " | ";
    }
      serveParent.appendChild(clone);

    })
  }

  function getTaps() {
    //get data
    let data = FooBar.getData();
    //transfer data to JSON
    const json = JSON.parse(data);
    //select the template from HTML to get the info about taps
    let template = document.querySelector("#tap").content;
    let parent = document.querySelector(".taps-grid");
    //run forEach method to loop through all the taps we have in object
    parent.innerHTML = "";
    json.taps.forEach(element => {
      let clone = template.cloneNode(true);
      let status = clone.querySelector('.st0');
      let full = clone.querySelector('#full');
      let halfFull = clone.querySelector('#half-full');
      let half = clone.querySelector('#half');
      let empty = clone.querySelector('#almost-empty')

      clone.querySelector('.tap-name').textContent = element.beer;
      clone.querySelector('.capacity').textContent = (element.level * 0.01) + " litres";
      if (element.level < 1875) {
        full.style.display = "none";
      }
      if (element.level < 1250) {
        halfFull.style.display = "none";
      }
      if (element.level < 625) {
        half.style.display = "none";
        status.style.fill = "red";
      }
      if (element.level < 60) {
        empty.style.display = "none";
        status.style.fill = "red";
      }
      if (element.inUse) {
        clone.querySelector('.in-use').textContent = "Tap is currently in use";
        status.style.fill = "#79CC6D";
      } else {
        clone.querySelector('.in-use').textContent = "Tap is not in use";
      }

      parent.appendChild(clone);
    });
  }

  function getBartenders() {
    //get data
    let data = FooBar.getData();
    //transfer data to JSON
    const json = JSON.parse(data);
    //select the template from HTML to get the info about taps
    let template = document.querySelector("#bartender").content;
    let parent = document.querySelector(".bartenders-grid");
    //run forEach method to loop through all the taps we have in object
    parent.innerHTML = "";
    json.bartenders.forEach(element => {
      let clone = template.cloneNode(true);
      clone.querySelector('.bartender-name').textContent = element.name;
      clone.querySelector('.status').textContent = element.status;
      clone.querySelector('.status-detail').textContent = element.statusDetail;
      let bartenderBowtie = clone.querySelector('#bowtie');
      let bartenderHead = clone.querySelector('#head');
      let bartenderBody = clone.querySelector('#body');

      if (element.status === "WORKING") {
        bartenderBowtie.style.fill = "#79cc6d";
        bartenderHead.style.fill = "#79cc6d";
        bartenderBody.style.fill = "#79cc6d";
        clone.querySelector('.status').style.color = "#79cc6d";


      }
      if (element.statusDetail === "pourBeer") {
        clone.querySelector('.status-detail').style.color = "#F4EB71";
        clone.querySelector('.status-detail').textContent = "Pouring beer";
        bartenderBowtie.style.fill = "#F4EB71";
        bartenderHead.style.fill = "#F4EB71";
        bartenderBody.style.fill = "#F4EB71";

      }
      if (element.statusDetail === "reserveTap") {
        clone.querySelector('.status-detail').style.color = "#F8BF61";
        clone.querySelector('.status-detail').textContent = "Reserving the tap";
        bartenderBowtie.style.fill = "#F8BF61";
        bartenderHead.style.fill = "#F8BF61";
        bartenderBody.style.fill = "#F8BF61";


      }
      if (element.statusDetail === "receivePayment") {
        clone.querySelector('.status-detail').style.color = "#985EFF";
        clone.querySelector('.status-detail').textContent = "Receiving payment";
        bartenderBowtie.style.fill = "#985EFF";
        bartenderHead.style.fill = "#985EFF";
        bartenderBody.style.fill = "#985EFF";


      }
      if (element.statusDetail === "startServing") {
        clone.querySelector('.status-detail').style.color = "#4BC0BF"

      }




      parent.appendChild(clone);
    });
  }
  getStorage();
  getTaps();
  getOrders();
  getBartenders();

}

function getBeers() {
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
    clone.querySelector('.beer-info').dataset.alc = element.alc;
    clone.querySelector('.appearance').textContent = "APPEARANCE: " + element.description.appearance;
    clone.querySelector('.aroma').textContent = "AROMA: " + element.description.aroma;
    clone.querySelector('.flavour').textContent = "FLAVOR: " + element.description.flavor;
    clone.querySelector('.mouthfeel').textContent = "MOUTHFEEL: " + element.description.mouthfeel;
    clone.querySelector('.overall-impression').textContent = "OVERALL IMPRESSION: " + element.description.overallImpression;
    clone.querySelector('img').src = "images/" + element.label;
    let description = clone.querySelector('.description');
    clone.querySelector('button').addEventListener("click", (e) => {
      description.classList.toggle('hidden');
      //console.log(e.target);
      e.target.parentElement.parentElement.parentElement.classList.toggle('more');
    })
    //sorting beer 
    document.querySelector("#weakest").addEventListener("click", function () {

      let ps = [].slice.call(document.querySelectorAll(".beers .beer-info"));
      let parent = document.querySelector('.beers')
      ps.sort(function (a, b) {
        return a.dataset.alc - b.dataset.alc;
      })
      ps.forEach(p => {
        //clean container
        parent.removeChild(p)
        parent.appendChild(p)
      })


    })
    document.querySelector("#strongest").addEventListener("click", function () {

      let ps = [].slice.call(document.querySelectorAll(".beers .beer-info"));
      let parent = document.querySelector('.beers')
      ps.sort(function (a, b) {
        return b.dataset.alc - a.dataset.alc;
      })
      ps.forEach(p => {
        //clean container
        parent.removeChild(p)
        parent.appendChild(p)
      })


    })

    parent.appendChild(clone);
  });
}

// Current Time
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
// show 0's
let min;
if (minutes < 10){
  min = minutes.toString();
  min = "0" + min;
} else {
  min = minutes.toString();
}

document.querySelector("#current_time").textContent = " | " + hours + ":" + min;


//navigation links
let queSection = document.querySelector('.que');
let tapsSection = document.querySelector('.taps');
let beersSection = document.querySelector('.beers-sec');
let bartendersSection = document.querySelector('.bartenders');
let storageSection = document.querySelector('.storage');

document.querySelector('#que-section').addEventListener("click", () => {
  queSection.classList.remove('hidden');
  beersSection.classList.add('hidden');
  tapsSection.classList.add('hidden');
  bartendersSection.classList.add('hidden');
  storageSection.classList.add('hidden');
})

document.querySelector('#taps-section').addEventListener("click", () => {
  tapsSection.classList.remove('hidden');
  beersSection.classList.add('hidden');
  queSection.classList.add('hidden');
  bartendersSection.classList.add('hidden');
  storageSection.classList.add('hidden');

})

document.querySelector('#beers-section').addEventListener("click", () => {
  beersSection.classList.remove('hidden');
  queSection.classList.add('hidden');
  tapsSection.classList.add('hidden');
  bartendersSection.classList.add('hidden');
  storageSection.classList.add('hidden');

})

document.querySelector('#bartenders-section').addEventListener("click", () => {
  bartendersSection.classList.remove('hidden');
  queSection.classList.add('hidden');
  tapsSection.classList.add('hidden');
  beersSection.classList.add('hidden');
  storageSection.classList.add('hidden');
})
document.querySelector('#storage-section').addEventListener("click", () => {
  storageSection.classList.remove('hidden');
  queSection.classList.add('hidden');
  tapsSection.classList.add('hidden');
  beersSection.classList.add('hidden');
  bartendersSection.classList.add('hidden');
})


loadJson();
getBeers();
setInterval(loadJson, 10000);