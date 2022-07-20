var $photoInput = document.querySelector('#photoURL');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $aForm = document.querySelector('a.form');
var $aEntries = document.querySelector('a.entries');
var $noEntries = document.querySelector('.no-entries');
var $entries = document.querySelector('.entries');

$photoInput.addEventListener('input', handlePhotoInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
$aForm.addEventListener('click', handleClick);
$aEntries.addEventListener('click', handleClick);
$ul.addEventListener('click', handleEntries);

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
  data.entries.unshift(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $ul.prepend(renderEntry(newEntry));
  swapView('entries');
  $noEntries.classList.add('hidden');
}

function handleDOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
    $ul.append(renderEntry(data.entries[i]));
  }
  if (data.entries.length === 0) {
    $entries.classList.remove('hidden');
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
    swapView(data.view);
  }
}

function renderEntry(entry) {
/*
  <li class="row pos-rel">
    <div class="column-half">
      <img src="" alt="placeholder">
    </div>
    <div class="column-half">
      <h2 class="pd-r">Title</h2>
      <i class="fa-solid fa-pen pos-abs pen"></i>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  </li>
*/
  var $li = document.createElement('li');
  $li.setAttribute('class', 'row pos-rel');
  $li.setAttribute('data-entry-id', entry.entryId);
  var $divImg = document.createElement('div');
  $divImg.setAttribute('class', 'column-half');
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title);
  var $divText = document.createElement('div');
  $divText.setAttribute('class', 'column-half');
  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'pd-r');
  $h2.textContent = entry.title;
  var $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pen pos-abs pen');
  var $p = document.createElement('p');
  $p.textContent = entry.notes;

  $li.appendChild($divImg);
  $divImg.appendChild($img);
  $li.appendChild($divText);
  $divText.appendChild($h2);
  $h2.appendChild($i);
  $divText.appendChild($p);
  return $li;
}

function swapView(string) {
  var $viewList = document.querySelectorAll('.view');
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === string) {
      $viewList[i].classList.remove('hidden');
    } else {
      $viewList[i].classList.add('hidden');
    }
  }
  data.view = string;
}

function handleClick(event) {
  swapView(event.target.getAttribute('data-view'));
}

function handleEntries(event) {
  if (event.target.tagName === 'I') {
    swapView('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      var clickedEntry = event.target.closest('li');
      if (clickedEntry.getAttribute('data-entry-id') === JSON.stringify(data.entries[i].entryId)) {
        data.editing = data.entries[i];
      }
    }
  }
}
