/**
 * Custom date formats for Angular Material Datepicker.
 * Displays and parses dates in the format dd.MM.yyyy (01.01.2026).
 */
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DDD',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
