'use strict';
//Global varibles 
let animalHorns = [];// global varibles animal horns array for pictures of animal horns 
let animalKeywords = []; // global varibles for array of keywords

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

//AJAX

$.ajax(`data/pag-1.json`).then(data => {
  data.forEach(hornAnimal=>{
  new Horns(hornAnimal).renderImage();
  console.log(hornAnimal);
  })

})