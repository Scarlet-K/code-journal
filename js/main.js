var $photoInput = document.querySelector('#photoURL');
var $img = document.querySelector('img');
var $form = document.querySelector('form');

$photoInput.addEventListener('input', handlePhotoInput);
$form.addEventListener('submit', handleSubmit);

function handlePhotoInput(event) {
  $img.setAttribute('src', $photoInput.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var newEntry = {};
  newEntry.title = $form.title.value;
  newEntry.photoURL = $form.photoURL.value;
  newEntry.notes = $form.notes.value;
  newEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  var entriesArray = data.entries;
  entriesArray.unshift(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
