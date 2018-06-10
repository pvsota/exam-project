window.addEventListener("load", loadJson());
function loadJson(){
//get data
let data = FooBar.getData();
//transfer data to JSON
const json = JSON.parse(data);

console.log(json);
console.log("Bar named " + json.bar.name + " closing at: " + json.bar.closingTime);
console.log("People in the que: " + json.queue.length);

json.bartenders.forEach(element => {
    console.log(element.name +" is "+ element.status);
    
});
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
    clone.querySelector('img').src = "images/" + element.label

    parent.appendChild(clone);
});

};
setInterval(loadJson,3000);

