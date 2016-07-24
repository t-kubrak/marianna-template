let menu = document.querySelector('#menu'),
	main = document.querySelector('main'),
	drawer = document.querySelector('.navigation');

menu.addEventListener('click', (e) => {
	drawer.classList.toggle('open');
		e.stopPropagation();
	});
	main.addEventListener('click', () => {
	drawer.classList.remove('open');
});