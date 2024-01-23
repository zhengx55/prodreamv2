import { memo } from "react";

const MonthDropdown = ({
  setValue,
  value,
}: {
  setValue: (value: string) => void;
  value: string;
}) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const monthCombinations: string[] = [];
  for (let i = 0; i < months.length - 1; i += 1) {
    monthCombinations.push(`${months[i]} & ${months[i + 1]}`);
  }
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select
      className='text-muted-foreground h-10 w-full rounded-md border border-shadow-border px-2 outline-none'
      id='month'
      value={value}
      onChange={handleMonthChange}
    >
      <option hidden value='' disabled selected>
        Month
      </option>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
      {monthCombinations.map((combination) => (
        <option key={combination} value={combination}>
          {combination}
        </option>
      ))}
      {seasons.map((season) => (
        <option key={season} value={season}>
          {season}
        </option>
      ))}
    </select>
  );
};

export default memo(MonthDropdown);
