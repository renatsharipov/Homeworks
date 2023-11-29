/*
* Нужно написать функцию, принимающую строку в качестве аргумента и возвращающую количество гласных, которые содержатся в строке.
Гласными являются «a», «e», «i», «o», «u», «y».
* */

function getVowelsCount(str) {
	const vowels = 'aeiouy'
	return str
		.toLowerCase()
		.split('')
		.filter(char => vowels.includes(char)).length
}

module.exports = getVowelsCount
