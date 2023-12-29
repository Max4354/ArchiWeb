//!Получаем burger
const menuIcon = document.querySelector('.header__burger');

//!Вешаем событие на header
if(menuIcon){
	const menuBody = document.querySelector('.header__menu');
	menuIcon.addEventListener("click", function(e){
		document.body.classList.toggle("_lock");
		menuBody.classList.toggle("_burger-active");
		menuIcon.classList.toggle("_burger-active");
	})
}

//!Пишем carousel
const slider = [...document.querySelectorAll('.block__image')];
const prev = document.querySelector('.block__arrow_left');
const next = document.querySelector('.block__arrow_right');
let currentSlide = 0;

function nextSlide(){
	delete slider[currentSlide].dataset.active;
	currentSlide = (currentSlide + 1) % slider.length;
	slider[currentSlide].dataset.active = 'true';
}

next.addEventListener('click', function(){
	nextSlide();
	clearInterval(auto);
	auto = setInterval(nextSlide, 5000);
});
prev.addEventListener("click", function(){
	delete slider[currentSlide].dataset.active;
	currentSlide = (currentSlide - 1 + slider.length) % slider.length;
	slider[currentSlide].dataset.active = 'true';
});
auto = setInterval(nextSlide, 2500);

//!Пишем выпадающее окно 
const popup = document.querySelector('.about__btn');
const popupBody = document.querySelector('.info-about');
const popupClose = document.querySelector('.info-about__exit');
popup.addEventListener("click", function(e){
	popupBody.classList.toggle('_info-active');
	popup.classList.toggle('_info-active');
	document.body.classList.toggle("_lock");
});
popupBody.addEventListener("click", function(e){
	if(!e.target.closest('.info-about__text')){
		popupBody.classList.remove('_info-active');
		popupClose.classList.remove('_info-active');
		document.body.classList.remove("_lock");
	}
});

//!Пишем poppup для projects 
const projectItem = document.querySelector('.projects__burger');
if(projectItem){
	const menuProject = document.querySelector('.projects__menu');
	projectItem.addEventListener('click', function(e){
		menuProject.classList.toggle('_project-active');
		projectItem.classList.toggle('_project-burger');
	});
}
//!Пишем slider-dots
window.addEventListener('resize', scrollSlider);
const carouselBody = document.querySelector('.testimonial__line');
const carouselSlides = document.querySelectorAll('.testimonial__column');
let widthDot = carouselBody.offsetWidth;

function createDots(){
	const dotsBody = document.querySelector('.testimonial__part');
	if(widthDot > 551) {
		for(let i = 0; i < carouselSlides.length; i += 2 ){
			const dot = document.createElement('div');
			dot.className = 'testimonial__circle';
			dotsBody.appendChild(dot);
		}
	} else {
		for(let i = 0; i < carouselSlides.length; i++ ){
			const dot = document.createElement('div');
			dot.className = 'testimonial__circle';
			dotsBody.appendChild(dot);
		}
	}
	const firstDot = document.querySelector('.testimonial__circle')
	if(firstDot){
		firstDot.classList.add('testimonial__circle_active');
	}
}
createDots();

const carouselDots = document.querySelectorAll('.testimonial__circle');
let currentCarousel = 0;

function scrollSlider(){
    const slideStyle = getComputedStyle(carouselSlides[0]);
    let slideMarginRight = parseFloat(slideStyle.marginRight);
    let slideMarginLeft = parseFloat(slideStyle.marginLeft);
    let slideWidth = carouselSlides[0].offsetWidth;
    const fullSlideWidth = slideWidth + slideMarginRight + slideMarginLeft;
    carouselBody.style.left = -fullSlideWidth * currentCarousel + 'px';
}
 scrollSlider();

function carouselNext(){
	currentCarousel++;
	activeSlide(currentCarousel);
}

function carouselPrev(){
	currentCarousel--;
	activeSlide(currentCarousel);
}

function activeSlide(index){
	carouselDots.forEach(item => item.classList.remove('testimonial__circle_active'));
	carouselDots[index].classList.toggle('testimonial__circle_active');
}

carouselDots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		currentCarousel = index;
		activeSlide(currentCarousel);
		scrollSlider();
	});
});