var moreCircleOne = document.getElementById("more-circle-1");
var moreCircleTwo = document.getElementById("more-circle-2");
var moreCircleThree = document.getElementById("more-circle-3");
var moreCircleFour = document.getElementById("more-circle-4");
var seeMoreTaskDiv = document.getElementById("see-more-tasks");

setInterval(() => {
  moreCircleOne.classList.add("active-more-circle");
  moreCircleOne.classList.remove("more-circle");

  setTimeout(() => {
    moreCircleOne.classList.add("more-circle");
    moreCircleOne.classList.remove("active-more-circle");

    moreCircleTwo.classList.add("active-more-circle");
    moreCircleTwo.classList.remove("more-circle");
  }, 150);

  setTimeout(() => {
    moreCircleTwo.classList.add("more-circle");
    moreCircleTwo.classList.remove("active-more-circle");

    moreCircleThree.classList.add("active-more-circle");
    moreCircleThree.classList.remove("more-circle");
  }, 300);

  setTimeout(() => {
    moreCircleThree.classList.add("more-circle");
    moreCircleThree.classList.remove("active-more-circle");

    moreCircleFour.classList.add("active-more-circle")
    moreCircleFour.classList.remove("more-circle")
  }, 450);

  setTimeout(() => {
    moreCircleFour.classList.add("more-circle");
    moreCircleFour.classList.remove("active-more-circle");
  }, 600);

}, 3500);
