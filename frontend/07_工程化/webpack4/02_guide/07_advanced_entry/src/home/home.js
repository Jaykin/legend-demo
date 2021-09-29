function component() {
    var element = document.createElement('div');

    element.innerHTML = 'This Is Home!';
    element.classList.add('hello');

    return element;
}

let element = component();
document.body.appendChild(element);