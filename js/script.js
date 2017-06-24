var list = document.getElementById('list');
var viewer = document.getElementById('viewer');

getData('data/writings.json', receiveObject);

console.log("Changing things.");

function receiveObject(data){
  // Loop through each section
  for (var i = 0; i < data.length; i++) {
    var section = document.createElement('div');
    section.classList.add('section');
    var sectionName = document.createElement('div');
    sectionName.classList.add('section-name');
    sectionName.innerText = data[i].name;
    section.appendChild(sectionName);

    // Loop through each poems
    var poems = data[i].list;
    for (var j = 0; j < poems.length; j++) {

      // Creating title div
      var title = document.createElement('div');
      title.classList.add('poem-title');
      title.innerText = poems[j].title;
      addClickListener(title, poems[j].text);

      section.appendChild(title);
    }
    list.appendChild(section);
  }


}

function addClickListener(element, displayText){
  element.addEventListener('click', function(){
    var previous = document.querySelector('.active');
    if(previous) {
      previous.classList.remove('active');
    }


    this.classList.add('active');
    viewer.innerText = displayText;
  });
}

function getData(path, callback){
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var object = JSON.parse(this.responseText);
      callback(object);
    }
  };

  xhr.open('GET', path);
  xhr.send();
}
