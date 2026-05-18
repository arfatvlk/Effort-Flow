
export enum EffortUnit {
  HOURS = 'Hours',
  DAYS = 'Days',
  WEEKS = 'Weeks',
  MONTHS = 'Months'
}

export interface Config {
  hoursPerDay: number;
  daysPerWeek: number;
  daysPerMonth: number;
}

export interface ConversionResult {
  unit: EffortUnit;
  value: number;
  label: string;
}
