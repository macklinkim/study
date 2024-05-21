const modalTriggers = document.querySelectorAll("[data-modal-trigger]");
const modalClose = document.querySelectorAll("[data-modal-close]");
modalTriggers.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    const slug = modal.dataset.modalTrigger;
    const target = slug
      ? document.querySelector(`[data-modal-target="${slug}"]`)
      : null;
    if (target) {
      target.classList.add("is_active");
    }
  });
});
modalClose.forEach((close) => {
  close.addEventListener("click", (e) => {
    const target = close.closest("[data-modal-target]");
    if (target) {
      target.classList.remove("is_active");
    }
  });
});

const load = document.querySelector(".loader.button");
const contentsGrid = document.querySelector(".contents-grid");
// const newContents = document.querySelectorAll(".item");
const newContents = document.querySelectorAll(".item").lastElementChild;
const tempArray = [];

let gridIdx = 0;
load.addEventListener("click", (e) => {
  // if(gridIdx >= newContents.length){
  //   gridIdx = 0;
  // }
  const node = document.createElement("div");
  node.className = "item";
  node.textContent = "empty";
  node.style.display = "block";
  node.style.textAlign = "center";
  node.style.fontSize = "40px";
  contentsGrid.appendChild(node);
});

// let currentSlide = 0;
// const slides = document.querySelectorAll(".slider-img");
// const slideScreen = document.querySelector(".screen-wrapper");

// function moveSlide() {
//   slideScreen.style.transition = "transform .4s";
//   slideScreen.style.transform = `translateX(-${currentSlide * 100}%)`;
// }

// function prevSlide() {
//   if (currentSlide === 0) {
//     currentSlide = slides.length - 1;
//   } else {
//     currentSlide--;
//   }
//   moveSlide();
// }
// function nextSlide() {
//   if (currentSlide >= slides.length - 1) {
//     currentSlide = 0;
//   } else {
//     currentSlide++;
//   }
//   moveSlide();
// }

// const slideButtons = document.querySelectorAll(".slider-button");
// slideButtons.forEach((aBtn) => {
//   if (aBtn.className.includes("type_prev")) {
//     aBtn.addEventListener("click", (e) => {
//       prevSlide();
//     });
//   } else if (aBtn.className.includes("type_next")) {
//     aBtn.addEventListener("click", (e) => {
//       nextSlide();
//     });
//   } else {
//     return;
//   }
// });

// let currentSlide = 0;
// const slides = document.querySelectorAll(".slider-img");
// const slideScreen = document.querySelector(".screen-wrapper");
// const last = slides.length - 1;
// function reorderSlide(direction) {
//   console.log("before:", currentSlide);
//   if (direction === "prev") {
//     if (currentSlide === 0) {
//       currentSlide = last;
//       slideScreen.insertAdjacentElement("afterbegin", slides[last]);
//     } else {
//       currentSlide--;
//       slideScreen.insertAdjacentElement("afterbegin", slides[currentSlide]);
//     }
//   }

//   if (direction === "next") {
//     if (currentSlide === last) {
//       //now at 0 and for looping to last
//       currentSlide = 0;
//       console.log(slides[slides.length - 1]);
//       slideScreen.insertAdjacentElement("afterend", slides[0]);
//       slideScreen.style.transform = `translateX(-${currentSlide * 100}%)`;
//     } else {
//       currentSlide++;
//       slideScreen.style.transform = `translateX(-${currentSlide * 100}%)`;
//     }
//   }

//   slideScreen.style.transition = "all 1s";
//   console.log("after:", currentSlide);
// }

// const slideButtons = document.querySelectorAll(".slider-button");
// slideButtons.forEach((aBtn) => {
//   if (aBtn.className.includes("type_prev")) {
//     aBtn.addEventListener("click", (e) => {
//       //move last slide to first;
//       reorderSlide("prev");
//     });
//   } else if (aBtn.className.includes("type_next")) {
//     aBtn.addEventListener("click", (e) => {
//       reorderSlide("next");
//     });
//   } else {
//   }
// });

const buttonCommentLike = document.querySelectorAll(".comment-btn.like");

buttonCommentLike.forEach((e) => {
  e.addEventListener("click", (e) => {
    confirm("미구현");
  });
});

let active = 0;
const buttonTopicLike = document.querySelectorAll(".item-liked");
buttonTopicLike.forEach((e) => {
  e.addEventListener("click", (btn) => {
    buttonTopicLike.forEach((elem) => {
      elem.classList.remove("is_active");
    });
    if (active%2 === 0 ) {
      buttonTopicLike.forEach((elem) => {
        elem.classList.remove("is_active");
      });
    } else {
      e.classList.add("is_active");
    }
    active++;
  });
});







let slider = document.getElementById('photo-slider');
let sliderItems = document.getElementById('slides');
let prev = document.getElementById('type_prev');
let next = document.getElementById('type_next');

function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = document.getElementsByClassName('slide_w'),
      slidesLength = slides.length,
      slideSize = document.getElementsByClassName('slide_w')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);