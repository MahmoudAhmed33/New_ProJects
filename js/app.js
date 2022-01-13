/*
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/*
 * Define Global Variables
 * 
*/
/*
  return a list of all <section> elements in this document
  */
const multiSections = document.getElementsByTagName("section");
/*
 * We Get This Element To Append The List Style When We Creat It
*/
const myUl = document.getElementById("navbar__list");
/*
 * This Is Dummy Element We Used It We Will Append To It
 *   The List Style Before Adding To The Ul
*/
let myDummy = document.createDocumentFragment();

let links = document.getElementsByTagName('a')
/*
 * End Global Variables
 * Start Helper Functions
 * 
*/
for (const section of multiSections) {
// Creat List Style
const myList = document.createElement("li");
// Creat Link
const myLink = document.createElement("a");
myLink.href += `${section.id}`

//Adding class menu__link on navigation-items
myLink.className += "menu__link";

// Creat Text Node
    const textLink = document.createTextNode(section.getAttribute("data-nav")); // A Relation Between Links And Sections 
    // Append The Text To The Links
    myLink.appendChild(textLink);
    // Append The Link To The List Style
    myList.appendChild(myLink);
    // Append Li For The Dummy Element[fragment]
    myDummy.appendChild(myList);
    
    myLink.addEventListener("click",function (event){
    event.preventDefault()
    section.scrollIntoView({behavior:'smooth'})
    })
  }

//append the dummy element to the ul
    myUl.appendChild(myDummy);
  // Reduce The Repaint & The Reflow
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */
// add class 'active' to section when near top of viewport

// Determine The Position Of The Element In The Page
function sectionBoundary (element) {
  //Return Value Object Which This Is The Smallest Rectangle Contains The Entire Element
  let sectionRectangle = element.getBoundingClientRect();
  // Using Only One Property To Determine The Section 0 => Top Of Page :240px
  return (sectionRectangle.top >= 0 && sectionRectangle.top < 240);
}
// Make The Determined Section Active Section With Scrolling
window.addEventListener("scroll",function addActiveSection(){
  //Foreach For Apply The Active Class To The Determined Section
  for(const sec of multiSections){
    //Given Active Class To The Determined Section
    sectionBoundary(sec)? sec.setAttribute("class","your-active-class"): sec.classList.remove("your-active-class");
  }
});

  /* 
    Add Class 'Active' To Nav-Bar Items When Section In Viewport 
  */
let options = {
  threshold : '.7' //.7 = 70% Of The Visible Section
}
const observer = new IntersectionObserver(
  // Callback Function Arrow Function
  entries => {
    for(const event of entries) {
      /* A Boolean Value Which Whether The Target Element Has Transitioned into
      a State Of Intersection (True) Or Out Of A State Of Intersection (False) 
      -> (Out Of Viewport->(False))
      */
    if(event.isIntersecting){
      for(let i = 0; i < multiSections.length; i++){
        (event.target.id === links[i].getAttribute('href'))? links[i].classList.add('active') : links[i].classList.remove('active');
      }
    }
  }
  //optional part
},options)
for(const section of multiSections){
  observer.observe(section)
}