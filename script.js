document.addEventListener("DOMContentLoaded", init);

function init() {

	// lista miast w USA z GitHub z podstawowymi danymi o nich
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// zadanie: ściągnąć te dane miast i...
// ...przefiltrować wg tego co wspisze użytkownik

// pusta tablica na miasta:
const cities = [];
console.log(cities);
// nowe API w przeglądarce 'fetch':
/* gdybyśmy użyli:
const prom = fetch(endpoint);
console.log(prom); // wypisze obiekt 'Promise'
dlatego stosujemy razem z 'then()':
*/
fetch(endpoint)
	.then(blob => blob.json()) // to też pokazuje obiekt 'Promise', stąd znowu 'then()'
	.then(data => cities.push(...data)); // wrzucamy obiekt z danymi tysiąca amerykańskich miast do tablicy 'cities'
// bez operatora rozproszenia jest to jednak tablica w tablicy

// funkcja filtrująca:
function findMatches(wordToMatch, cities) {
	return cities.filter(place => {
		// jak zdeterminować by miasto spełniało konkretny warunek użytkownika
		const regex = new RegExp(wordToMatch, 'gi'); // g-lobal, i-nsensitive
		return place.city.match(regex) || place.state.match(regex);
	});
}

// funkcja wstawiająca przecinki w dużych liczbach, by odczytać tysiące i miliony
function numbersWithComas(x) { 
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
	console.log(this.value); // tu co wpisuje użytkownik
	const matchArray = findMatches(this.value, cities); // wyszukaj w tablicy miast
	const html = matchArray.map(place => { // dla każdego miejsca zwróć następujący układ:
// a dodatkowo podświetl wyszukiwaną frazę w wynikach:
		const regex = new RegExp(this.value, "gi");
		const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
		return `
			<li>	
				<span class="name">${cityName}, ${stateName}</span>
				<span class="population">${numbersWithComas(place.population)}</span>
			</li>
		`;
	}).join("");
suggestions.innerHTML = html; // wyżej zwrócony układ wstawia jako element HTML

}
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// nasłuch na zdarzenie:
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);



}











