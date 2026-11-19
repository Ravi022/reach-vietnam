export const company = {
  name: 'Reach Vietnam Company Limited',
  email: 'himanshu.kumar@rashmigroup.com',
  phoneDisplay: '+91 77177 79650',
  phoneDial: '+917717779650',
  whatsapp: 'https://wa.me/917717779650',
  officeLabel: 'Hanoi, Vietnam',
} as const;

export function mailtoHref(subject: string, body: string) {
  return 'mailto:' + company.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}
