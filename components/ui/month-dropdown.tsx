import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const MonthDropdown = ({
  setValue,
  value,
}: {
  setValue: (value: string) => void;
  value: string;
}) => {
  const tEditor = useTranslations('Editor');
  const tCommonSense = useTranslations('CommonSense');

  const months = [
    tCommonSense('Month.January'),
    tCommonSense('Month.February'),
    tCommonSense('Month.March'),
    tCommonSense('Month.April'),
    tCommonSense('Month.May'),
    tCommonSense('Month.June'),
    tCommonSense('Month.July'),
    tCommonSense('Month.August'),
    tCommonSense('Month.September'),
    tCommonSense('Month.October'),
    tCommonSense('Month.November'),
    tCommonSense('Month.December'),
  ];

  const seasons = [
    tCommonSense('Season.Spring'),
    tCommonSense('Season.Summer'),
    tCommonSense('Season.Autumn'),
    tCommonSense('Season.Winter'),
  ];

  const monthCombinations: string[] = [];
  for (let i = 0; i < months.length - 1; i += 1) {
    monthCombinations.push(`${months[i]} & ${months[i + 1]}`);
  }
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select
      className='text-muted-foreground h-10 w-full rounded-md border border-gray-200 px-2 outline-none'
      id='month'
      value={value}
      onChange={handleMonthChange}
    >
      <option hidden value='' disabled>
        {tEditor('CustomCitation.WebsiteMenu.Month')}
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
