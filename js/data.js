/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntries = localStorage.getItem('codejournal-local-storage');
if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', handleBeforeUnload);

function handleBeforeUnload(event) {
  var serializedData = JSON.stringify(data);
  localStorage.setItem('codejournal-local-storage', serializedData);
  data.editing = null;
}
