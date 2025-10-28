const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://supersimplebackend.dev/products/first', true);
xhr.addEventListener('load', function() {
  console.log(xhr.response);
});
xhr.send();


