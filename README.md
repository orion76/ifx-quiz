# IFX Quiz

## Описание:

Имеется форма с думя полями - StyleName:string, StyleId:number и один контрол-автокомплит PrimeNG.
Автокомплит позволяет выбирать из списка опций предоставляемого CommonService.getSuggestions.
Для отображения оцпии в выпадающем меню используется параметр Name. Автокомплит также позволяет
пользователю вводить любой текст в качестве значения.

## Задачи:

Напишите логику, которая будет устанавливать выбранное значение из выпадающего списка в поле
StyleId формы. А введенное (исправленное) пользователем текстовое значение в StyleName.
Установка одно поля должна обнулять ( === null ) второе. Таким образом, при отправке,
форма имеет только одно заполненное поле (выбор или ввод пользователя).

Напишите логику для сохранения и получения значения формы из LocalStorage.
