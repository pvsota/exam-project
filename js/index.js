//global variables
let myChart;
let data;
let queLength;
let peopleServed;
let myLineChart;
let i = 0; // counter for interval we set 
let j = 0; // counter for lenght of data array
let beersTotal = 0; //counter for number of beers 
let lastIdCounted = 0;
let ordersTotal = 0;
let storageData = [];
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

  //get data of storage 
  function getStorage() {
    storageData = [];
    storageDatasets = [];
    json.storage.forEach(e => {
      storageDatasets.push(e.name);
      storageData.push(e.amount);

      //bar chart from chart js


      let canvasD = document.getElementById('myDoughnut');
      let dataD = {
        labels: storageDatasets,
        datasets: [{
          label: "Storage of beers",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: storageData,
        }]
      };
      let optionD = {
        animation: false,
        scales: {

          xAxes: [{
            ticks: {
              autoSkip: false,
              beginAtZero: true,
              fontColor: '#fff',
              fontSize: 18
            },
            display: true,
            responsive: true,

          }],
          yAxes: [{
            ticks: {
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


      var myBarChart = Chart.Bar(canvasD, {
        data: dataD,
        options: optionD
      });

    })

  }


  // get data of the orders in que and getting served
  function getOrders() {
    //select the template from HTML to get the info about orders
    let template = document.querySelector("#que").content;
    let parent = document.querySelector(".in-que");

    let serveTemplate = document.querySelector("#serve").content;
    let serveParent = document.querySelector(".in-serve");

    //clearing the parent element to prevent looping
    parent.innerHTML = '';

    json.queue.forEach(e => {
      let clone = template.cloneNode(true);
      clone.querySelector('.id').textContent = "Order nr. " + (e.id + 1);

      //appealing fade in animation
      clone.querySelector('.id').classList.add("fadeIn");
      clone.querySelector('.order').classList.add("fadeIn");

      // Show number of beers in order "X"+"Name"
      const orderinfo = {};

      // build orderinfo from e.order.forEach
      e.order.forEach(beer => {
        const count = countInArray(e.order, beer); // how many times does the beer appears in order
        orderinfo[beer] = count;
      });
      // go into orderinfo object and change the text content with a count of exact beer
      for (name in orderinfo) {
        clone.querySelector('.order').textContent += "  " + orderinfo[name] + " " + name + " | ";
      }
      //appending the child
      parent.appendChild(clone);
    })
    //clearing the parent element to prevent looping
    serveParent.innerHTML = '';

    //getting the amount of total orders
    ordersTotal = json.queue[json.queue.length - 1].id + 1;
    document.querySelector("#people-total").textContent = ordersTotal;


    json.serving.forEach(e => {
      //counting total amount of beers which have been sold
      if (e.id > lastIdCounted) {
        beersTotal += e.order.length;
        lastIdCounted = e.id;
        document.querySelector('#beers-total').textContent = beersTotal;
      }

      let clone = serveTemplate.cloneNode(true);
      clone.querySelector('.serve-id').textContent = "Order nr. " + (e.id + 1);
      //appealing fade in animation
      clone.querySelector('.serve-id').classList.add("fadeIn");
      clone.querySelector('.serve-order').classList.add("fadeIn");
      
      // Show number of beers in order "X"+"Name"
      const orderinfo = {};
      
      // build orderinfo from e.order.forEach
      e.order.forEach(beer => {
        const count = countInArray(e.order, beer); //how many times does the beer appears in order
        orderinfo[beer] = count;
      })
      
      // go into orderinfo object and change the text content with a count of exact beer
      for (name in orderinfo) {
        clone.querySelector('.serve-order').textContent += "  " + orderinfo[name] + " " + name + " | ";
      }
      
      serveParent.appendChild(clone);

    })
  }

  function getTaps() {

    //select the template from HTML to get the info about taps
    let template = document.querySelector("#tap").content;
    let parent = document.querySelector(".taps-grid");

    //clearing the parent element to prevent looping
    parent.innerHTML = "";

    //run forEach method to loop through all the taps we have in object
    json.taps.forEach(element => {
      let clone = template.cloneNode(true);
      let status = clone.querySelector('.st0');
      let full = clone.querySelector('#full');
      let halfFull = clone.querySelector('#half-full');
      let half = clone.querySelector('#half');
      let empty = clone.querySelector('#almost-empty')

      clone.querySelector('.tap-name').textContent = element.beer;
      clone.querySelector('.capacity').textContent = (element.level * 0.01) + " litres";

      //conditional statements for the level of the beer, so if its less then 75%,50%,25% its hiding the element in svg
      if (element.level < 1875) {
        full.classList.add("fadeOut");
        setTimeout(() => {
          full.style.display = "none";
        }, 1500);
      }
      if (element.level < 1250) {
        halfFull.classList.add("fadeOut");
        setTimeout(() => {
          halfFull.style.display = "none";
        }, 1500);
      }
      if (element.level < 625) {
        half.classList.add("fadeOut");
        status.style.fill = "red";
        setTimeout(() => {
          half.style.display = "none";
        }, 1500);
        
      }
      if (element.level < 60) {
        empty.classList.add("fadeOut");
        status.style.fill = "red";
        setTimeout(() => {
          empty.style.display = "none";
        }, 1500);
      }

      //if tap is in use message out Tap in use and make the circle around in svg green
      if (element.inUse) {
        clone.querySelector('.in-use').textContent = "Tap in use";
        clone.querySelector('.in-use').classList.add("fadeIn");
        clone.querySelector('.in-use').style.color = "#79CC6D";
        status.style.fill = "#79CC6D";
      } else {
        clone.querySelector('.in-use').textContent = "-";
        clone.querySelector('.in-use').style.color = "#24282B";

      }

      parent.appendChild(clone);
    });
  }

  function getBartenders() {
    //select the template from HTML to get the info about bartenders
    let template = document.querySelector("#bartender").content;
    let parent = document.querySelector(".bartenders-grid");
    
    //clearing the parent element to prevent looping
    parent.innerHTML = "";

    //run forEach method to loop through all the taps we have in object
    json.bartenders.forEach(element => {
      let clone = template.cloneNode(true);
      clone.querySelector('.bartender-name').textContent = element.name;
      clone.querySelector('.status').textContent = element.status;
      clone.querySelector('.status-detail').textContent = element.statusDetail;
      let bartenderBowtie = clone.querySelector('#bowtie');
      let bartenderHead = clone.querySelector('#head');
      let bartenderBody = clone.querySelector('#body');

      // using conditional statements for different statuses and changing its colors to be more appealing to user
      if (element.status === "WORKING") {
        bartenderBowtie.style.fill = "#79cc6d";
        bartenderHead.style.fill = "#79cc6d";
        bartenderBody.style.fill = "#79cc6d";
        clone.querySelector('.status-detail').classList.add("fadeIn");
        clone.querySelector('.status').style.color = "#79cc6d";


      }
      if (element.statusDetail === "pourBeer") {
        clone.querySelector('.status-detail').classList.add("fadeIn");
        clone.querySelector('.status-detail').style.color = "#F4EB71";
        clone.querySelector('.status-detail').textContent = "Pouring beer";
        bartenderBowtie.style.fill = "#F4EB71";
        bartenderHead.style.fill = "#F4EB71";
        bartenderBody.style.fill = "#F4EB71";

      }
      if (element.statusDetail === "reserveTap") {
        clone.querySelector('.status-detail').classList.add("fadeIn");
        clone.querySelector('.status-detail').style.color = "#F8BF61";
        clone.querySelector('.status-detail').textContent = "Reserving the tap";
        bartenderBowtie.style.fill = "#F8BF61";
        bartenderHead.style.fill = "#F8BF61";
        bartenderBody.style.fill = "#F8BF61";


      }
      if (element.statusDetail === "receivePayment") {
        clone.querySelector('.status-detail').classList.add("fadeIn");
        clone.querySelector('.status-detail').style.color = "#985EFF";
        clone.querySelector('.status-detail').textContent = "Receiving payment";
        bartenderBowtie.style.fill = "#985EFF";
        bartenderHead.style.fill = "#985EFF";
        bartenderBody.style.fill = "#985EFF";


      }
      if (element.statusDetail === "startServing") {
        clone.querySelector('.status-detail').classList.add("fadeIn");
        clone.querySelector('.status-detail').style.color = "#4BC0BF";
        clone.querySelector('.status-detail').textContent = "Starting to serve";
        clone.querySelector('.status-detail').style.color = "#4BC0BF";
        bartenderBowtie.style.fill = "#4BC0BF";
        bartenderHead.style.fill = "#4BC0BF";
        bartenderBody.style.fill = "#4BC0BF";

      }
      if (element.statusDetail === "releaseTap") {
        clone.querySelector('.status-detail').classList.add("fadeIn");
        clone.querySelector('.status-detail').style.color = "#CE884A";
        clone.querySelector('.status-detail').textContent = "Releasing the tap";
        clone.querySelector('.status-detail').style.color = "#CE884A";
        bartenderBowtie.style.fill = "#CE884A";
        bartenderHead.style.fill = "#CE884A";
        bartenderBody.style.fill = "#CE884A";

      }




      parent.appendChild(clone);
    });
  }
  //calling all the functions
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
    clone.querySelector('.alc').textContent = "Alc | " + element.alc + "%";
    clone.querySelector('.beer-info').dataset.alc = element.alc;
    clone.querySelector('.overall-impression').textContent = element.description.overallImpression;
    clone.querySelector('img').src = "images/" + element.label;

    //conditional statements for making the alcohol level colorful
    if (element.alc < 6) {
      clone.querySelector('.alc').style.color = "#F4EB71";
    } else if (element.alc < 8) {
      clone.querySelector('.alc').style.color = "#F8BF61";
    } else if (element.alc < 9) {
      clone.querySelector('.alc').style.color = "#CE884A";
    } else if (element.alc <= 10) {
      clone.querySelector('.alc').style.color = "#CC614C";
    }

    //sorting beer from weakest to strongest
    document.querySelector("#weakest").addEventListener("click", function () {
      //the snippet of code we took from Petrograd assignment, where we used sorting
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

    //sorting beer from strongest to weakest
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
// show 0's if the minutes are lower then 
let min;
if (minutes < 10) {
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