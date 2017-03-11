
var storageArray = JSON.parse(localStorage.getItem('storeMe')) || [];

$(document).ready(function() {
  printStorageArray()
});

function printStorageArray() {
  storageArray.forEach(function(idea,i){
    printIdea(i);
  })
}

$('#save').on('click', function() {
  storeNewIdea();
  printIdea(storageArray.length - 1);
  pushToStorage();
  clearInputs();
});

function storeNewIdea(){
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

function printIdea(i) {
  var idea = storageArray[i];
  var id = idea.id;
  var title = idea.title;
  var body = idea.body;
  var quality = idea.quality;
  $('.ideas').prepend(
    `<article class="template">
      <h2 contenteditable="true">${title}</h2>
      <div class="icon" id="delete-btn" alt="delete button"></div>
      <p contenteditable="true">${body}</p>
      <h3 class="unique-id">${id}</h3>
      <div class="upvote" alt="upvote button"></div>
      <div class="downvote" alt="downvote button"></div>
      <h3><b>quality:</b> <span id="quality">${quality}</span></h3>
    </article>`);
};

function clearInputs() {
  $('#title, #body').val('');
  disableSave();
};

//Update "title" and "body" text in DOM
$('.ideas').on('focusout', 'h2, p', function() {
  var updatedTitle = $('h2').text();
  var updatedBody = $('p').text();
  var flaggedId = $(this).siblings('.unique-id').text()*1;
  updateObjectText(flaggedId, updatedTitle, updatedBody);
  pushToStorage();
});

function updateObjectText(flaggedId, updatedTitle, updatedBody) {
  storageArray.forEach(function(idea, i){
    if (idea.id == flaggedId) {
      idea.title = updatedTitle;
      idea.body = updatedBody;
      storageArray[i] = idea;
    }
  })
}

//Delete Button
$('.ideas').on('click', '#delete-btn', function() {
  var flaggedId = $(this).siblings('.unique-id').text()*1;
  storageArray = storageArray.filter(function(idea) {
    return idea.id !== flaggedId;
  })
  pushToStorage();
  $(this).parent().remove('article');
});

//Upvote and Downvote Buttons
$('.ideas').on('click', '.upvote, .downvote', function() {
  var quality = $(this).siblings().children('#quality').text();
  var flaggedId = $(this).siblings('.unique-id').text()*1;
  var voteClass = $(this).attr('class');
  var selector = this;
  quality = updateTextQuality(quality, voteClass);
  updateObjectQuality(flaggedId, quality);
  pushToStorage();
  deleteArticles(selector);
  printStorageArray();
})

function updateTextQuality(quality, voteClass) {
  if (voteClass === 'upvote') {
    (quality === 'swill') ? quality = 'plausible' : quality = 'genius';
  } else if (voteClass === 'downvote') {
    (quality === 'genius') ? quality = 'plausible' : quality = 'swill';
  }
  return quality
}

function updateObjectQuality(flaggedId, quality){
  storageArray.forEach(function(idea,i) {
    if (idea.id == flaggedId) {
      idea.quality = quality;
      storageArray[i] = idea;
    }
  })
}

function deleteArticles(selector) {
  $(selector).parent().siblings().remove();
  $(selector).parent().remove('article');
}

$('.search').on('keyup', function() {
  var searchValue = $(this).val().toLowerCase();
  $('article').each(function() {
    var retrievedValue = $(this).text().toLowerCase();
    if (retrievedValue.indexOf(searchValue) != -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
})

// Disable 'save' button when one or both of the input fields are empty
$('#title, #body').keyup(function() {
  checkInputs();
})

function checkInputs(){
  if ($('#title').val() == '' || $('#body').val() == '') {
    disableSave();
  } else {
    $('#save').prop('disabled', false);
  }
}

function disableSave () {
  $('#save').prop('disabled', true);
}
