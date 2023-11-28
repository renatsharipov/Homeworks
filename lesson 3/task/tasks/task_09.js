/*
* Напишите функцию под названием multiFilter, которая принимает переменное количество функций фильтра.
* Функция должна возвращать функцию, которая получает один элемент (функция составного фильтра).
То есть, если у нас есть две функции:
* function isEven(el){
   return el % 2 === 0;
}
* и

function isGTten(el){
   return el > 10;
}
*
* [1,2,3,4,10,11,12,20,21,22].filter(multiFilter(isEven, isGTten));
*
* должно вернуться [12,20,22]
* */

function multiFilter(...filters) {
	return function (el) {
		return filters.every(filter => filter(el))
	}
}

module.exports = multiFilter
