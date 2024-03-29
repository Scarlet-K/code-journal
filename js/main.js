var $photoInput = document.querySelector('#photoURL');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $newFormButton = document.querySelector('.new-form-button');
var $entriesButton = document.querySelector('.entries-button');
var $noEntries = document.querySelector('.no-entries');
var $editEntryHeading = document.querySelector('.edit-entry-heading');
var $newEntryHeading = document.querySelector('.new-entry-heading');
var $confirmDelete = document.querySelector('.confirm-delete');
var $openModal = document.querySelector('.open-modal');
var $closeModal = document.querySelector('.close-modal');
var $modalContainer = document.querySelector('.modal-container');

$photoInput.addEventListener('input', changeImage);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
$newFormButton.addEventListener('click', handleClick);
$entriesButton.addEventListener('click', handleClick);
$ul.addEventListener('click', handleEdit);
$openModal.addEventListener('click', openModal);
$closeModal.addEventListener('click', closeModal);
$confirmDelete.addEventListener('click', handleDelete);

function changeImage(event) {
  $img.setAttribute('src', $photoInput.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var newEntry = {
    title: $form.title.value,
    photoURL: $form.photoURL.value,
    notes: $form.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $ul.prepend(renderEntry(newEntry));
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = $form.title.value;
        data.entries[i].photoURL = $form.photoURL.value;
        data.entries[i].notes = $form.notes.value;
      }
      var $entryList = document.querySelectorAll('li');
      if ($entryList[i].getAttribute('data-entry-id') === JSON.stringify(data.entries[i].entryId)) {
        $entryList[i].replaceWith(renderEntry(data.entries[i]));
      }
    }
  }
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapView('entries');
  showNoEntryDefault();
  data.editing = null;
}

function handleDOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
    $ul.append(renderEntry(data.entries[i]));
  }
  swapView(data.view);
  data.editing = null;
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
  data.editing = null;
  $openModal.classList.add('hidden');
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function handleClick(event) {
  if (event.target.getAttribute('data-view') === 'entry-form') {
    $editEntryHeading.classList.add('hidden');
    $newEntryHeading.classList.remove('hidden');
  }
  swapView(event.target.getAttribute('data-view'));
  showNoEntryDefault();
  data.editing = null;
}

function handleEdit(event) {
  if (event.target.tagName === 'I') {
    swapView('entry-form');
    $newEntryHeading.classList.add('hidden');
    $editEntryHeading.classList.remove('hidden');
    $openModal.classList.remove('hidden');
    var targetEntry = event.target.closest('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (targetEntry.getAttribute('data-entry-id') === JSON.stringify(data.entries[i].entryId)) {
        data.editing = data.entries[i];
        break;
      }
    }
    $form.title.value = data.editing.title;
    $form.photoURL.value = data.editing.photoURL;
    $form.notes.value = data.editing.notes;
    $img.setAttribute('src', data.editing.photoURL);
  }
}

function openModal(event) {
  $modalContainer.classList.remove('hidden');
}

function closeModal(event) {
  $modalContainer.classList.add('hidden');
}

function handleDelete(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
    }
  }
  var $entryList = document.querySelectorAll('li');
  for (var k = 0; k < $entryList.length; k++) {
    if ($entryList[k].getAttribute('data-entry-id') === JSON.stringify(data.editing.entryId)) {
      $entryList[k].remove();
      break;
    }
  }
  $modalContainer.classList.add('hidden');
  swapView('entries');
  showNoEntryDefault();
  data.editing = null;
}

function showNoEntryDefault() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}
