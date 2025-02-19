export interface FieldProps {
    modelValue: string;
    type?: Extract<HTMLInputElement['type'], string>;
    placeholder?: string;
}
