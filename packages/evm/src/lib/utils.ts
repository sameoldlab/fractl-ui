export const truncate = (string: string, digits = 4) =>
	string.substring(0, digits + 2).replace('x', '×') +
	'•••' +
	string.substring(string.length - digits)

export const isMobile = () => {
	if (!window) return
	const userAgent = navigator.userAgent

	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
		return true
	}
	if (/mobi/i.test(userAgent)) {
		return true
	}
	return false
	/* 
	console.log(window.innerWidth)
	console.log(screen.availWidth)

	return window.innerWidth < screen.availWidth */
}
