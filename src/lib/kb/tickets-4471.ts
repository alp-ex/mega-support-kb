// Where each problem split out of #4471 is tracked. Issue numbers are assigned by GitHub, so they are typed.
import type { Problem } from '#lib/kb/problems';

export const TICKET_REPO = 'https://github.com/alp-ex/mega-support-kb';

export const TICKETS: Partial<Record<Problem, { issue: number; title: string }>> = {
  parser: { issue: 1, title: 'Shared parser reads day-first dates month first' },
  hint: { issue: 2, title: 'booking-v3 form tells day-first tenants to type MM/DD/YYYY' },
  shift: { issue: 3, title: 'Dates move by one day, not a month flip' },
};
