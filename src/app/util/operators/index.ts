import { filter } from 'rxjs/operators';

export const hasConfirmation = filter(value => !!value);
