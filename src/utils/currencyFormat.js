export const currencyFormat = (value = 0, currency = '$') => {
  let thousandsSeparator = '.';
  let decimalsSeparator = ',';

  value += '';
  let splitStr = value.split('.');
  let splitLeft = splitStr[0];
  let splitRight = splitStr.length > 1 ? decimalsSeparator + splitStr[1] : '';
  let regx = /(\d+)(\d{3})/;

  while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + thousandsSeparator + '$2');
  }
  return currency + ' ' + splitLeft + splitRight;
};
