var storageArray = JSON.parse(localStorage.getItem('storeMe')) || [];

$(document).ready(function() {
  //loop through storageArray, for each thing in it
});

$('#save').on('click', function() {

  // check inputs - confirm inputs are populated | disable 'save' button

  //create object | constructor function

  //store it
  storeIdea();
  pushToStorage()

  addIdea();
  clearInputs();
});

function storeIdea(){
  var id = Math.floor(Math.random()*1e10)
  var title = $('#title').val();
  var body = $('#body').val();
  var newIdea = new Idea(id,title,body);
  storageArray.push(newIdea);

  //stringify

  //setItem
}

function pushToStorage() {
  localStorage.setItem("storeMe", JSON.stringify(storageArray));
}

function pullFromStorage() {
  JSON.parse(localStorage.getItem('storeMe'));

}

function Idea(id,title,body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function addIdea() {
  $('.ideas').prepend(
    `<article class="template">
      <h2>${$('#title').val()}</h2>
      <img id="delete-btn" src="" alt="delete button">
      <p>${$('#body').val()}</p>
      <img src="" alt="upvote button">
      <img src="" alt="downvote button">
      <h3>quality: <span id="quality"></span></h3>
    </article>`);
}

function clearInputs() {
  $('form')[0].reset();
  };

$('.ideas').on('click', '#delete-btn', function() {
  $(this).parent().remove('article');


//   //remove from storage

});
