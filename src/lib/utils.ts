export const truncate = (string: string, digits = 4) =>
	string.substring(0, digits + 2) +
	'...' +
	string.substring(string.length - digits)
