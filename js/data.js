/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', handleBeforeUnload);

function handleBeforeUnload(event) {
  var serializedData = JSON.stringify(data);
  localStorage.setItem('codejournal-local-storage', serializedData);
}
