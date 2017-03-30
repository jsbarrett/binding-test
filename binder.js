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
      scope[elm.dataset.bind] = elm.value || elm.innerText;
      events.emit(elm.dataset.bind, elm);
    });
    events.on(elm.dataset.bind, function(elm) {
      updateView(elm.dataset.bind, scope[elm.dataset.bind], elm);
    });
  });

  function updateView(binding, ref, origin) {
    const elements = document.querySelectorAll(`[data-bind="${binding}"]`);
    elements.forEach( elm => {
      if (elm.value && elm !== origin) {
        elm.value = ref;
      } else if (elm !== origin) {
        elm.innerHTML = ref;
      }
    });
  }
};

// wrapped in IIFE to show your scope doesn't have to be in the global scope anymore
(function() {
  const app = {
    scope1: {
      firstName: {
        name: "Jacob"
      }
    }
  };
  binder(app);
})();
