// Where each problem split out of #4471 is tracked, and what engineering did about it (update of 5 October).
// Issue numbers are assigned by GitHub, so they are typed.
import type { Problem } from '#lib/kb/problems';

export const TICKET_REPO = 'https://github.com/alp-ex/mega-support-kb';

export type Ticket = { issue: number; title: string; state: 'fixed' | "won't fix" | 'open'; why: string };

export const TICKETS: Partial<Record<Problem, Ticket>> = {
  parser: {
    issue: 1,
    title: 'Shared parser reads day-first dates month first',
    state: 'fixed',
    why: 'fix(dates): parse dd/mm for eu locales',
  },
  hint: {
    issue: 2,
    title: 'booking-v3 form tells day-first tenants to type MM/DD/YYYY',
    state: "won't fix",
    why: 'booking-v3 form retired',
  },
  shift: {
    issue: 3,
    title: 'Dates move by one day, not a month flip',
    state: 'open',
    why: 'neither change above touches it',
  },
};
