import type { FieldProps } from '../ClgField/types';

export type SelectProps = Omit<FieldProps, 'type'> & {
  items: Array<{
    value: unknown;
    label: string;
    id: number;
  }>;
};
