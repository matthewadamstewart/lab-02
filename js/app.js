'use strict';
//Global varibles 
let animalHorns = [];// global varibles animal horns array for pictures of animal horns 
let failedKeywordTest = []; // global varibles for array of keywords

//constructor
function Horns(obj)// constructor function for the objects in the json file 
{
this.image_url = obj.image_url;
this.title = obj.title; 
this.description = obj.description;
this.keyword = obj.keyword;
this.horns = obj.horns;
animalHorns.push(this);// pushes created objrects in animal horns array
}
//render photos
Horns.prototype.renderImage = function() { // made a prototype for Horns constructor which is named renderImage
  let template = $('#photo-template').html(); // we use this to identify the element via its ID
  let $section = $(`<section id=${this.keyword}> </section>`);  // This is where we define the ID of new sections being created to render images below

  $section.html(template); // this insert what has been defined in template into $section 
  $section.find('h2').text(this.title);
  $section.find('img').attr('src', this.image_url);
  $section.find('img').attr('alt', this.keyword);
  $section.find('p').text(this.description); // This four find and add content to what was added above
  $('main').append($section); //this added the section with all of its contends defined above to the end of the main element
}
//filter keywords
Horns.prototype.keyWordTest = function() {// function for keyword drop down
  if(!failedKeywordTest.includes(this.keyword)) { // if the keyword dosnt match it will send it to another array which is used to exclude animals from the display 
    failedKeywordTest.push(this.keyword);
  let $option = $(`<option value=${this.keyword}>${this.keyword}</option>`)//giving the option the value of keyword and add display text
  $('select').append($option); //adds above to page in select element
  }
}
function filter(event) {
  let id = event.target.value;
  animalHorns.forEach(animalObject => {
    $(`section[id=${animalObject.keyword}]`).show();
    if (id !== animalObject.keyword) {
      console.log('this is ID ' + id);
      console.log('this is keyword ' + animalObject.keyword);
      $(`section[id=${animalObject.keyword}]`).hide();
    }
  })
}

//AJAX

$.ajax(`data/pag-1.json`).then(data => {
  data.forEach(hornAnimal=>{
  new Horns(hornAnimal).renderImage();
  new Horns(hornAnimal).keyWordTest();
  // console.log(hornAnimal);
  })

})
$('select').on('change', filter);