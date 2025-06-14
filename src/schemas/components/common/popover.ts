export type PopoverProps = {
  visible: boolean;
  event: MouseEvent | null;
};

export interface PopoverEmits {
  "update:visible": [visible: boolean];
}
