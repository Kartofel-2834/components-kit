import { mount } from "@vue/test-utils";

// Types
import { VueWrapper } from "@vue/test-utils";

// Component
import JoCheckbox from "@/components/jo-checkbox.vue";

describe("Content", () => {
  test("If slot not provided label span mustn't exist", async () => {
    const checkbox: VueWrapper = mount(JoCheckbox);

    const checkboxLabel = checkbox.element.querySelector("jo-checkbox__label");

    expect(checkboxLabel).toBeFalsy();
  });
});

describe("Styles", () => {
  const checkbox: VueWrapper = mount(JoCheckbox);

  function findClass(regex: RegExp): string | undefined {
    return checkbox
      .classes()
      .find((className: string) => regex.test(className));
  }

  test("JoCheckbox must be active if value is truthy", async () => {
    await checkbox.setProps({
      value: true,
    });

    const input: HTMLInputElement | null = checkbox.element.querySelector(
      "input[type='checkbox']"
    );

    expect(input?.checked && findClass(/.+_active$/)).toBeTruthy();
  });

  test("JoCheckbox must be active if modelValue is truthy", async () => {
    await checkbox.setProps({
      modelValue: true,
    });

    const input: HTMLInputElement | null = checkbox.element.querySelector(
      "input[type='checkbox']"
    );

    expect(input?.checked && findClass(/.+_active$/)).toBeTruthy();
  });
});
