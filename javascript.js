var titleInput = $('#title');
var bodyInput = $('#body');

$('#save').on('click', function() {


  // check inputs - confirm inputs are populated | disable 'save' button

  //create object | constructor function

  //store it



  addIdea();

// The text fields should be cleared and ready to accept a new idea.
clearInputs();
});

function addIdea() {
  $('.ideas').prepend(
    `<article class="template">
      <h2>${titleInput.val()}</h2>
      <img id="delete-btn" src="" alt="delete button">
      <p>${bodyInput.val()}</p>
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
