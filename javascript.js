
var storageArray = JSON.parse(localStorage.getItem('storeMe')) || [];

$(document).ready(function() {
  storageArray.forEach( function(idea){
    var id = idea.id;
    var title = idea.title;
    var body = idea.body;
    var quality = idea.quality;
    printIdea(title,body);
  })
});

$('#save').on('click', function() {

  // check inputs - confirm inputs are populated | disable 'save' button

  storeIdea();
  pushToStorage();
  printIdea($('#title').val(),$('#body').val());
  clearInputs();
});


function storeIdea(){
  var id = Math.floor(Math.random()*1e10)
  var title = $('#title').val();
  var body = $('#body').val();
  var newIdea = new Idea(id,title,body);
  storageArray.push(newIdea);
};

function Idea(id,title,body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
};

function pushToStorage() {
  localStorage.setItem("storeMe", JSON.stringify(storageArray));
};

function printIdea(title,body) {
  $('.ideas').prepend(
    `<article class="template">
    <h2>${title}</h2>
    <img class="icon" id="delete-btn" src="icons/delete.svg" alt="delete button">
    <p>${body}</p>
    <img class="icon upvote"src="icons/upvote.svg" alt="upvote button">
    <img src="" alt="downvote button">
    <h3><b>quality:</b> <span id="quality"></span></h3>
    </article>`);
};

function clearInputs() {
  $('form')[0].reset();
};

function pullFromStorage() {
  JSON.parse(localStorage.getItem('storeMe'));
};


$('.ideas').on('click', '#delete-btn', function() {
 //store ID in local variable
 var id = $('#id')
  $(this).parent().remove('article');

//take ID, filter through StorageArray and remove object with matching ID from storage
// run filter function on storagearray, match ID from deleted Idea with ID of object in array, delete the filtered object
});
