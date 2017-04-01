/// <reference path="../../typings/index.d.ts" />

export default pickerConfig;

/** @ngInject */
function pickerConfig(pikaday) {

  var locales = {
    de: {
      previousMonth : 'Vorheriger Monat',
      nextMonth     : 'Nächster Monat',
      months        : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      weekdays      : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      weekdaysShort : ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."]
    },
    ru: {
      previousMonth : 'Предыдущий месяц',
      nextMonth     : 'Следующий месяц',
      months        : ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      weekdays      : ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      weekdaysShort : ["Вс.", "Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Cб."]
    }
  };

  pikaday.setConfig({
    i18n: locales.ru, // sets the default language [optional]
    locales: locales, // required if setting the language using the i18n attribute
    yearRange: [1960,2016], // years range
    firstDay: 1, // not showing
  });
};