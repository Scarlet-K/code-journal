var $photoInput = document.querySelector('#photoURL');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');

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
  data.entries.unshift(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

/*  <li class="row pd-b">
      <div class="column-half">
        <img src="" alt="placeholder">
      </div>
      <div class="column-half">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id arcu laoreet, porttitor orci eu, pharetra ipsum. Ut
          non mi eget arcu vehicula euismod nec id lacus. Mauris tempor ex elit, convallis vestibulum turpis eleifend ac. Quisque
          pellentesque, orci et porttitor egestas, justo odio maximus mauris, sed mattis augue nulla congue mauris. Integer
          aliquam congue magna sed efficitur. Proin ac pharetra velit.
        </p>
      </div>
    </li> */

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

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
