export type RatingValue = 1 | 2 | 3 | 4 | 5

export const RATING_VALUES: RatingValue[] = [1, 2, 3, 4, 5]

export const RATING_ICONS = {
  1: 'fi-rr-frown',
  2: 'fi-rr-sad',
  3: 'fi-rr-meh',
  4: 'fi-rr-smile',
  5: 'fi-rr-laugh',
} as const
