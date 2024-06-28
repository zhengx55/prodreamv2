import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

export function getCountryPhonePrefixList(
  returnAsArray: boolean = false,
  excludeControversialRegions: boolean = false
): { [key: string]: string } | string[] {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const supportedRegions = phoneUtil.getSupportedRegions();
  const prefixList: { [key: string]: string } = {};
  const prefixArray: string[] = [];

  // 暂时剔除港澳台
  const controversialRegions = ['TW', 'HK', 'MO'];

  for (const region of supportedRegions) {
    if (excludeControversialRegions && controversialRegions.includes(region)) {
      continue;
    }

    const exampleNumber = phoneUtil.getExampleNumber(region);
    const formattedNumber = phoneUtil.format(
      exampleNumber,
      PhoneNumberFormat.INTERNATIONAL
    );
    const prefix = formattedNumber.split(' ')[0];
    prefixList[region] = prefix;
    prefixArray.push(prefix);
  }

  return returnAsArray ? prefixArray : prefixList;
}
