const delay = 300;
const min_color = "#f58634";
const up_color = "#1f4287";
const p_color = "#00818a";
const sorted_color = "#206a5d";
const ping_color = "#f0e5d8";

const container = document.querySelector(".data-container");


function generatebars(num = 20) {
              
	while(container.firstChild) {

		container.removeChild(container.firstChild);

	}
	for (let i = 0; i < num; i += 1) {

		const value = Math.floor(Math.random() * 100) + 1;
		
		const bar = document.createElement("div");
		bar.classList.add("bar");
		bar.style.height = `${value * 3}px`;
		bar.style.transform = `translateX(${i * 30}px)`;
		
		const barLabel = document.createElement("label");
		barLabel.classList.add("bar_id");
		barLabel.innerHTML = value;
		
		bar.appendChild(barLabel);
		container.appendChild(bar);
	}
}


function swap(bars, min_idx, i){

	var temp1 = bars[min_idx].style.height;
	var temp2 = bars[min_idx].childNodes[0].innerText;

	bars[min_idx].style.height = bars[i].style.height;
	bars[i].style.height = temp1;
	bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
	bars[i].childNodes[0].innerText = temp2;

}


async function SelectionSort() {

	let bars = document.querySelectorAll(".bar");
	
	var min_idx = 0;

	for (var i = 0; i < bars.length; i += 1) {

		min_idx = i;//starting index

		bars[min_idx].style.backgroundColor = min_color;

		for (var j = i + 1; j < bars.length; j += 1) {
				

			bars[j].style.backgroundColor = ping_color;
			await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));
			bars[j].style.backgroundColor = up_color;

			var val1 = parseInt(bars[j].childNodes[0].innerHTML);
			var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);
				
			if(val1 < val2){

				bars[min_idx].style.backgroundColor = up_color;
				min_idx = j;
				bars[min_idx].style.backgroundColor = min_color;

			}
		}

		swap(bars, min_idx, i);
		
		await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));

		bars[min_idx].style.backgroundColor = up_color;
		bars[i].style.backgroundColor = p_color;
	}

	for (var i = 0; i < bars.length; i += 1) {
		await new Promise((resolve) =>setTimeout(() => {resolve();}, 50));
		bars[i].style.backgroundColor = sorted_color;
	}


	enable_btns();

}


async function InsertionSort() {

	let bars = document.querySelectorAll(".bar");

	let i, j, key;

	for (i = 1; i < bars.length; i += 1) {

		key = parseInt(bars[i].childNodes[0].innerHTML);

		j = i-1;

		while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {

			bars[j+1].childNodes[0].innerHTML = bars[j].childNodes[0].innerHTML;
			bars[j+1].style.height = bars[j].style.height;

			bars[j+1].style.backgroundColor = ping_color;
			await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));
			bars[j+1].style.backgroundColor = p_color;

			j = j-1;

		}

		bars[j+1].childNodes[0].innerHTML = key;
		bars[j+1].style.height = `${key * 3}px`;

		bars[j+1].style.backgroundColor = ping_color;
		await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));
		bars[j+1].style.backgroundColor = p_color;

	}

	for (let i = 0; i < bars.length; i += 1) {
		await new Promise((resolve) =>setTimeout(() => {resolve();}, 50));
		bars[i].style.backgroundColor = sorted_color;
	}


	enable_btns();

}


async function BubbleSort() {

	let bars = document.querySelectorAll(".bar");

	for (var i = 0; i < bars.length; i += 1) {

		for (var j = 0; j < bars.length-i-1; j += 1) {

			bars[j].style.backgroundColor = ping_color;
			bars[j+1].style.backgroundColor = ping_color;	
			await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));
			bars[j].style.backgroundColor = up_color;
			bars[j+1].style.backgroundColor = up_color;

			var val1 = parseInt(bars[j].childNodes[0].innerHTML);
			var val2 = parseInt(bars[j+1].childNodes[0].innerHTML);
				
			if (val1 > val2) {
				
				swap(bars, j, j+1);

			}
		}

		await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));

		bars[bars.length-i-1].style.backgroundColor = p_color;

	}
	for (var i = 0; i < bars.length; i += 1) {
		await new Promise((resolve) =>setTimeout(() => {resolve();}, 50));
		bars[i].style.backgroundColor = sorted_color;
	}

	enable_btns();

}


async function MergeSort(){

	let bars = document.querySelectorAll(".bar");

	await mergeSort(bars, 0, bars.length - 1);

	for (var i = 0; i < bars.length; i += 1) {
		await new Promise((resolve) =>setTimeout(() => {resolve();}, 50));
		bars[i].style.backgroundColor = sorted_color;
	}

	enable_btns();

}


async function mergeSort(bars, low, high){

	if( low >= high ){ 
		
		return; 

	}

	const mid = Math.floor((low + high) / 2);
	// console.log(low+" -> "+mid+"and "+(mid+1)+" -> "+high);

	await mergeSort(bars, low, mid);
	await mergeSort(bars, mid+1, high);

	await merge(bars, low, mid, high);

}


async function merge(bars, low, mid, high){


	let left = low, right = mid+1;
	let temp = [];
	let val1, val2;
	while((left <= mid) && (right <= high)){

		// console.log("left: "+left+" and right: "+right);

		val1 = parseInt(bars[left].childNodes[0].innerHTML);
		val2 = parseInt(bars[right].childNodes[0].innerHTML);

		
		bars[left].style.backgroundColor = ping_color;
		bars[right].style.backgroundColor = ping_color;

		await new Promise((resolve) =>setTimeout(() => {resolve();}, delay));

		bars[left].style.backgroundColor = up_color;
		bars[right].style.backgroundColor = up_color;



		if(val1 < val2){
			temp.push(val1);
			left += 1;
		}else{
			temp.push(val2);
			right += 1;
		}

	}

	while(right <= high){
		val2 = parseInt(bars[right].childNodes[0].innerHTML);
		temp.push(val2);
		right += 1;
	}
	while(left <= mid){
		val1 = parseInt(bars[left].childNodes[0].innerHTML);
		temp.push(val1);
		left += 1;
	}
	// console.log(temp);

	for(var i = low; i <= high; i += 1){
		bars[i].childNodes[0].innerText = temp[i-low];
		await new Promise((resolve) =>setTimeout(() => {resolve();}, 50));
		bars[i].style.height = `${temp[i-low] * 3}px`;
		bars[i].style.backgroundColor = p_color;
	}

}


function generate(){

	generatebars();

}


function disable_btns(){

	document.getElementById("Button1").disabled = true;
	document.getElementById("Button2").disabled = true;
	document.getElementById("Button3").disabled = true;
	document.getElementById("Button4").disabled = true;
	document.getElementById("Button5").disabled = true;

}


function enable_btns(){
	
	document.getElementById("Button1").disabled = false;
	document.getElementById("Button2").disabled = false;
	document.getElementById("Button3").disabled = false;
	document.getElementById("Button4").disabled = false;
	document.getElementById("Button5").disabled = false;

}


generatebars();