
import { EffortUnit, Config } from '../types';

export const convertToHours = (value: number, unit: EffortUnit, config: Config): number => {
  switch (unit) {
    case EffortUnit.HOURS:
      return value;
    case EffortUnit.DAYS:
      return value * config.hoursPerDay;
    case EffortUnit.WEEKS:
      return value * config.daysPerWeek * config.hoursPerDay;
    case EffortUnit.MONTHS:
      return value * config.daysPerMonth * config.hoursPerDay;
    default:
      return value;
  }
};

export const convertFromHours = (hours: number, targetUnit: EffortUnit, config: Config): number => {
  switch (targetUnit) {
    case EffortUnit.HOURS:
      return hours;
    case EffortUnit.DAYS:
      return hours / config.hoursPerDay;
    case EffortUnit.WEEKS:
      return hours / (config.hoursPerDay * config.daysPerWeek);
    case EffortUnit.MONTHS:
      return hours / (config.hoursPerDay * config.daysPerMonth);
    default:
      return hours;
  }
};

export const formatValue = (val: number): string => {
  if (isNaN(val)) return '0';
  // Use up to 2 decimal places, but remove trailing zeros
  return Number(val.toFixed(2)).toString();
};
