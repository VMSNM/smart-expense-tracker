export function formatDate(timestamp) {
	const date = new Date(parseInt(timestamp)); // Parse the timestamp to ensure it's an integer representing milliseconds
	const options = { day: "2-digit", month: "short", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
}

export function capitalizeWord(word) {
	const capitalized = word[0].toUpperCase() + word.slice(1);
	return capitalized;
}