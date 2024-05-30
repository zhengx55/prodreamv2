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
  const t = useTranslations('Editor');
  const { lang } = useParams();

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
  const monthsCN = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const seasonsCN = ['春', '夏', '秋', '冬'];
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
        {t('CustomCitation.WebsiteMenu.Month')}
      </option>
      {(lang === 'en' ? months : monthsCN).map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
      {monthCombinations.map((combination) => (
        <option key={combination} value={combination}>
          {combination}
        </option>
      ))}
      {(lang === 'en' ? seasons : seasonsCN).map((season) => (
        <option key={season} value={season}>
          {season}
        </option>
      ))}
    </select>
  );
};

export default memo(MonthDropdown);
