const templater = function(rootscope) {
  // grab elements with the repeat attribute and iterate over them
  const repeat = document.querySelectorAll('[data-repeat]');
  repeat.forEach( elm => {
    // the data-repeat attribute will take an array reference or an object with an array as a property
    // example: ["jacob", "steve"]
    // or: {names: ["jacob", "steve"]}
    // if an object then the properties nested down need to be handled
    const properties = elm.dataset.repeat.split('.');

    // if properties was split up because it's nested then use helper function to target the nested array
    // otherwise helper function will just return the array that's inside the rootscope
    const arr = get(rootscope, properties);
    
    // loop through the returned array (backwards so after each insertion they'll appear in correct order)
    for (let i=arr.length; i>0; i-=1) {
      const item = arr[i-1];
      // regular expression magic
      const newItem = elm.outerHTML.replace(/{{x\.?(.*?)}}/g, (match, capturegroup) => {
        // capture group is whatever you put in parentheses in the regex
        // I targeted anything that was other than the x that comes after a "."
        // which I assume is the name of a property on an object 
        const property = capturegroup;
        if (property !== "") {
          // if there is a property (meaning the array element is an object)
          return item[property];
          // currently not able to be nested property ... could probably add that if necessary later
        }
        // otherwise it is just a normal array element and it's value is what's being targeted
        return item
      });
      // add new item to the DOM after the template as a sibling node
      elm.insertAdjacentHTML('afterend', newItem);
    }
    // remove the template node
    elm.parentNode.removeChild(elm);
  });


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

(function() {
  const app = {
    scope: {
      donuts: [{
        name:"glazed",
        qty: 5
      }, {
        name: "sprinkled",
        qty: 3
      }, {
        name: "cream filled",
        qty: 2
      }, {
        name: "iced",
        qty: 1
      }]
    }
  };
  
  templater(app);
})();