/* 
*	MIT License
*	Copyright (c) 2023-present weth, LLC
*	https://github.com/wevm/viem/blob/main/src/utils/unit/formatUnits.ts
*/

/**
 *  Divides a number by a given exponent of base 10 (10exponent), and formats it into a string representation of the number..
 *
 * - Docs: https://viem.sh/docs/utilities/formatUnits
 *
 * @example
 * import { formatUnits } from 'viem'
 *
 * formatUnits(420000000000n, 9)
 * // '420'
 */
export function formatUnits(value: bigint, decimals: number) {
	let display = value.toString()

	const negative = display.startsWith('-')
	if (negative) display = display.slice(1)

	display = display.padStart(decimals, '0')

	// eslint-disable-next-line prefer-const
	let [integer, fraction] = [
		display.slice(0, display.length - decimals),
		display.slice(display.length - decimals)
	]
	fraction = fraction.replace(/(0+)$/, '')
	return `${negative ? '-' : ''}${integer || '0'}${
		fraction ? `.${fraction}` : ''
	}`
}
