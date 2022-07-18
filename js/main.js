var $photoInput = document.querySelector('#photoURL');
var $img = document.querySelector('img');

$photoInput.addEventListener('input', handlePhotoInput);

function handlePhotoInput(event) {
  $img.setAttribute('src', $photoInput.value);
}
