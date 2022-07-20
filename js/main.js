var $photoInput = document.querySelector('#photoURL');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
// var $aForm = document.querySelector('a.form');
// var $aEntries = document.querySelector('a.entries');

$photoInput.addEventListener('input', handlePhotoInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

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
}

/*  <li class="row pd-b">
      <div class="column-half">
        <img src="" alt="placeholder">
      </div>
      <div class="column-half">
        <h2>Title</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </li> */

function handleDOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
    $ul.append(renderEntry(data.entries[i]));
  }
}

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  var $divImg = document.createElement('div');
  $divImg.setAttribute('class', 'column-half');
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title);
  var $divText = document.createElement('div');
  $divText.setAttribute('class', 'column-half');
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  var $p = document.createElement('p');
  $p.textContent = entry.notes;

  $li.appendChild($divImg);
  $divImg.appendChild($img);
  $li.appendChild($divText);
  $divText.appendChild($h2);
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
}

// if the data.entries === []
// the "no entries" is on view
// if the user presses save
// the "no entries" is hidden
// if the data.entries !== []
// the "no entries" is hidden

//
