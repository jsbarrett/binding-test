const model = {
  type: [0,1,2,3,4]
}

const model2 = {
  type: [5,6,7,8,9,10]
}

const template = function(x) {
  function repeat(el, data) {
    let str = "";
    for (let i=0; i<data.length; i+=1) {
      str += `<${el}> ${ data[i] } </${el}>`
    }
    return str;
  }

  return ` 
    <ul>
      ${repeat("li", x.type)}
    </ul>
  `;
}

document.body.insertAdjacentHTML('beforeend', template(model));
document.body.insertAdjacentHTML('beforeend', template(model2));


const div = document.querySelector('.htmlTemplatingTest');
const component = (function(container) {
  
  function render() {
    container.innerHTML = `
      Hello World
    `;    
  }
  
  return {
    render
  }
})(div);

component.render();