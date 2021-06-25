let letters = {
	א: 1,
	ב: 2,
	ג: 3,
	ד: 4,
	ה: 5,
	ו: 6,
	ז: 7,
	ח: 8,
	ט: 9,
	י: 10,
	כ: 20,
	ך: 20,
	ל: 30,
	מ: 40,
	ם: 40,
	נ: 50,
	ן: 50,
	ס: 60,
	ע: 70,
	פ: 80,
	ף: 80,
	צ: 90,
	ץ: 90,
	ק: 100,
	ר: 200,
	ש: 300,
	ת: 400,
};
// Get user sentence
const checkGematria = event => {
	event.preventDefault();

	let totalSum = 0;
	// Get user input
	userInput = document.getElementById('input_user').value;

	// Unicode for hebre letters א - ת
	const hebrewChars = new RegExp('^[\u05D0-\u05EA ]+$');

	// Only If the text have Hebrew chars or space or no input entered, this statment will give true.
	if (userInput.search(hebrewChars) != -1 || userInput.length == 0) {
		for (const character of userInput) {
			if (character === ' ') { // Space continue without do nothing.
				continue;
			}
			totalSum += letters[character];
		}
		document.getElementById('totalResult').textContent = totalSum; // Print the total sum.
	} else {
		// If have any forbidden character reset result and give alert error
		document.getElementById('totalResult').textContent = 0; // 
		alert('רק אותיות בעברית ורוחים מותרת')
	}
};