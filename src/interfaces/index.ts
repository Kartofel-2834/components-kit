export interface IComponent {
  theme?: string;
}

// It's need use when generics support added to Vue

export interface IBindingComponentProps<Type> extends IComponent {
  value?: Type;
  modelValue?: Type;
}

export interface IBindingComponentEvents<Type> {
  (event: "change", value: Type): void;
  (event: "update:modelValue", value: Type): void;
}
