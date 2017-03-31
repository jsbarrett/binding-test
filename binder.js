/*
 * depends on events object (my simple pubsub implementation)
 * you pass in the reference to the root of your scope binding
 * it can be the window object if your scope is a global variable
 * or it can be a reference to an object
 */

const binder = function(scope) {
  const bindingElements = document.querySelectorAll('[data-bind]');
  bindingElements.forEach( elm => {
    elm.addEventListener('input', () => {
      let ref = get(scope, elm.dataset.bind.split('.'));
      ref[0] = elm.value || elm.innerText;

      events.emit(elm.dataset.bind, elm);
    });
    events.on(elm.dataset.bind, function(elm) {
      updateView(elm.dataset.bind, get(scope, elm.dataset.bind.split('.')), elm);
    });
  });

  function updateView(binding, ref, origin) {
    const elements = document.querySelectorAll(`[data-bind="${binding}"]`);
    elements.forEach( elm => {
      if (elm.value && elm !== origin) {
        elm.value = ref[0];
      } else if (elm !== origin) {
        elm.innerHTML = ref[0];
      }
    });
  }
  
  // helper function for diving into nested objects
  function get(scope, properties) {
    let nested = scope;
    for (let i=0; i<properties.length; i+=1) {
      nested = nested[properties[i]];
    }
    // returns the reference to the nested object property on the scope
    return nested;
  }
};