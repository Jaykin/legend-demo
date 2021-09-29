function component() {
    var element = document.createElement('div');

    element.innerHTML = 'This Is Account!';
    element.classList.add('hello');

    return element;
}

let element = component();
document.body.appendChild(element);