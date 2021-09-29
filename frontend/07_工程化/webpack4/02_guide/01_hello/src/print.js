export default function printMe() {
  console.log('Updating print.js...');
}

if (module.hot) {
  module.hot.dispose(function (data) {
    console.log(data, module.id);
  });
}