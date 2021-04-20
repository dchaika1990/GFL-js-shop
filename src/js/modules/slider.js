import Splide from '@splidejs/splide';

const slider = (selectMain, selectSecondary) => {
	const mainSlider = new Splide(selectMain, {
		type: 'fade',
		pagination: false,
		arrows: false,
		cover: true,
		perPage: 1,
		heightRatio: 0.5,
		fixedHeight: 400,
		autoplay: true
	});

	const secondarySlider = new Splide(selectSecondary, {
		rewind: true,
		fixedHeight: 120,
		isNavigation: true,
		arrows: false,
		gap: 20,
		pagination: false,
		cover: true,
		perPage: 6,
		breakpoints: {
			'991': {
				perPage: 4,
			},
			'767': {
				perPage: 3,
			},
			'565': {
				perPage: 2,
			},
		}
	}).mount();

	mainSlider.sync(secondarySlider).mount()
}

export default slider;