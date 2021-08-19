const container  = document.querySelector('.TODO-container');
const form = document.querySelector('.TODO-form');
const input = document.querySelector('.TODO-form-input');

function drag(evt) {
	evt.dataTransfer.setData("text", evt.target.innerText);
}

function allowDrop(evt) {
	evt.preventDefault()
}

function drop(evt) {
	evt.preventDefault();
	let data = evt.dataTransfer.getData('text');
	let newDiv = document.createElement('div');
	newDiv.innerText = data;
	newDiv.classList.add('TODO-li');
	newDiv.setAttribute('draggable', true);
	evt.target.appendChild(newDiv);
}

form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	let todoText = input.value;
	console.log(input.value);
	input.value = '';
});

container.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('TODO-li')) {
		console.log('clicked todo');
	}
});
