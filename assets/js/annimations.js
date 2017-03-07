var moreCircleOne = document.getElementById("more-circle-1")
var moreCircleTwo = document.getElementById("more-circle-2")
var moreCircleThree = document.getElementById("more-circle-3")

setInterval(() => {
  moreCircleOne.classList.remove("more-circle");
  moreCircleOne.classList.add("active-more-circle");

  setTimeout(() => {
    moreCircleOne.classList.remove("active-more-circle");
    moreCircleOne.classList.add("more-circle");

    moreCircleTwo.classList.remove("more-circle");
    moreCircleTwo.classList.add("active-more-circle");
  }, 150);

  setTimeout(() => {
    moreCircleTwo.classList.remove("active-more-circle");
    moreCircleTwo.classList.add("more-circle");

    moreCircleThree.classList.remove("more-circle");
    moreCircleThree.classList.add("active-more-circle");
  }, 300);

  setTimeout(() => {
    moreCircleThree.classList.remove("active-more-circle");
    moreCircleThree.classList.add("more-circle");
  }, 450);

}, 3500);
