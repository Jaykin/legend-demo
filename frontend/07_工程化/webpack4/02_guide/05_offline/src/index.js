function component() {
    var element = document.createElement('div');
    element.innerHTML = 'Hello Webpak!';
    return element;
}

let element = component();
document.body.appendChild(element);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => {
                console.log('SW registered: ', reg);
            }).catch((err) => {
                console.log('SW registered failed: ', err);
            })
    });
}