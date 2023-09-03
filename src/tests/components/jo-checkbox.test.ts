import { mount } from "@vue/test-utils";

// Types
import { VueWrapper } from "@vue/test-utils";
import WrapperLike from "@vue/test-utils/dist/interfaces/wrapperLike";

// Component
import JoCheckbox from "@/components/jo-checkbox.vue";

/* <--------- Behavior ---------> */

describe("Behavior", () => {
  let checkbox: VueWrapper;

  function getCurrentValue(): boolean {
    const input: HTMLInputElement | null = checkbox.element.querySelector(
      "input[type='checkbox']"
    );

    return !!(input && input.checked);
  }

  async function checkToggle(triggerElement?: WrapperLike): Promise<boolean> {
    const prevValue: boolean = getCurrentValue();

    await (triggerElement || checkbox).trigger("click");

    const currentValue: boolean = getCurrentValue();

    return prevValue !== currentValue;
  }

  beforeAll(() => {
    checkbox = mount(JoCheckbox);
  });

  test("Value toggles on click", async () => {
    const isToggled = await checkToggle();

    expect(isToggled).toBeTruthy();
  });

  test("Value not toggles on click, when JoCheckbox disabled", async () => {
    await checkbox.setProps({ disabled: true });

    const isToggled = await checkToggle();

    expect(isToggled).toBeFalsy();
  });

  test("Click on label must toggle value", async () => {
    checkbox = mount(JoCheckbox, {
      slots: { default: "Some label" },
    });

    const label = checkbox.find("span.jo-checkbox__label");
    const isToggled = await checkToggle(label);

    expect(isToggled).toBeTruthy;
  });
});

/* <--------- Content ---------> */

describe("Content", () => {
  test("If slot not provided label span mustn't exist", async () => {
    const checkbox: VueWrapper = mount(JoCheckbox);

    const checkboxLabel = checkbox.element.querySelector("jo-checkbox__label");

    expect(checkboxLabel).toBeFalsy();
  });
});

/* <--------- Styles ---------> */

describe("Styles", () => {
  const checkbox: VueWrapper = mount(JoCheckbox);

  function findClass(regex: RegExp): string | undefined {
    return checkbox
      .classes()
      .find((className: string) => regex.test(className));
  }

  function checkIsActive(): boolean {
    const input: HTMLInputElement | null = checkbox.element.querySelector(
      "input[type='checkbox']"
    );

    return !!(input?.checked && findClass(/.+_active$/));
  }

  test("JoCheckbox must be active if value is truthy", async () => {
    await checkbox.setProps({
      value: true,
    });

    const isActive = checkIsActive();

    expect(isActive).toBeTruthy();
  });

  test("JoCheckbox must be active if modelValue is truthy", async () => {
    await checkbox.setProps({
      modelValue: true,
    });

    const isActive = checkIsActive();

    expect(isActive).toBeTruthy();
  });
});
