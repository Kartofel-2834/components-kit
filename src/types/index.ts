export type Dictionary<Type> = {
  [key: string]: Type;
};

export type ElementKey = string | number | symbol | undefined;

export type Item =
  | string
  | number
  | null
  | Dictionary<string | number | boolean | null>;
