const carouselImages = document.querySelector('.carousel__images');
const carouselButtons = document.querySelectorAll('.carousel__button');
const numberOfImages = document.querySelectorAll('.carousel__images img').length;
let imageIndex = 1;
let translateX = 0;

carouselButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    if (event.target.id === 'previous') {
      if (imageIndex !== 1) {
        imageIndex--;
        translateX += 300;
      }
    } else {
      if (imageIndex !== numberOfImages) {
        imageIndex++;
        translateX -= 300;
      }
    }
    
    carouselImages.style.transform = `translateX(${translateX}px)`;
  });
});

// const carouselenco = document.getElementById('carouselenco');

// function btn2Click(){
//   console.log("AAA");
//   document.getElementById('carouselenco').scrollBy(0, 30);
// }

const slider = document.getElementById('carouselenco');
let isDown = false;
let startX;
let scrollLeft;



function goForward(){
  imageCounter++
  if(imageCounter===2){
    imageCounter = 0
  }
  document.getElementById("image-front").src = imageArray[imageCounter].front
  document.getElementById("image-back").src = imageArray[imageCounter].back
}

function goBackward(){
  imageCounter--
  if(imageCounter===-1){
    imageCounter = 1
  }
document.getElementById("image-front").src = imageArray[imageCounter].front
document.getElementById("image-back").src = imageArray[imageCounter].back
}
imageCounter = 0
const imageArray = [
  {
    front:'./img/kisi.jpg',
    back:'./img/kisi-back.jpg'},
  {
  front:'./img/saperavi.jpg',
  back:'./img/saperavi-back.jpg'
  }
]

