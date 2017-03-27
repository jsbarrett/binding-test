/*
 * my interpretation of a "pubsub" implementation
 * it's pretty basic and nothing special but it works very well for this over simplified project
 */
const events = (function() {
  const collection = {};
  
  // "emit" allows you to trigger a custom event
  const emit = function(evt, info) {
    if ( collection[evt] ) {
      collection[evt].forEach( callback => {
        callback(info);
      });
    }
  }

  // "on" allows you to respond to a custom event with a given callback
  const on = function(evt, callback) {
    collection[evt] = (collection[evt]) ? collection[evt] : [];
    collection[evt].push(callback);
  }
  
  // "del" allows you to remove a custom event if you pass in the same callback function reference
  // didn't use this ... but might come in handy in the future
  const del = function(evt, callback) {
    if ( collection[evt] ) {
      collection[evt].forEach( (fn,i) => {
        if ( fn === callback ) {
          collection[evt].splice(i, 1);
        }
      });
    }
  }
  
  return {
    emit,
    on,
    del
  }
})();