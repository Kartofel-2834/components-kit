import { mount } from "@vue/test-utils";

// Types
import { VueWrapper } from "@vue/test-utils";

// Component
import JoButton from "@/components/jo-button.vue";

describe("Events", () => {
  let button: VueWrapper;

  beforeEach(async () => {
    button = mount(JoButton);
  });

  test("Click event emits", async () => {
    await button.trigger("click");

    const events: Array<string> = Object.keys(button.emitted());

    expect(events).toContain("click");
  });

  test("Click event is not called on the disabled jo-button", async () => {
    await button.setProps({ disabled: true });
    await button.trigger("click");

    const events: Array<string> = Object.keys(button.emitted());

    expect(events).not.toContain("click");
  });
});

describe("Content", () => {
  function getIcon(element: Element) {
    return element.querySelector(":not(.jo-button__content)");
  }

  test("Icon exist if icon prop provided", async () => {
    const button: VueWrapper = mount(JoButton, {
      props: {
        icon: "material-symbols:border-color",
      },
    });

    const icon = getIcon(button.element);

    expect(icon).not.toBeFalsy();
  });

  test("Icon exist if icon slot used", async () => {
    const button: VueWrapper = mount(JoButton, {
      slots: {
        icon: "<div>+</div>",
      },
    });

    const icon = getIcon(button.element);

    expect(icon).not.toBeFalsy();
  });
});

describe("Styles", () => {
  const button: VueWrapper = mount(JoButton);

  function findClass(regex: RegExp): string | undefined {
    return button.classes().find((className: string) => regex.test(className));
  }

  test("JoButton can be made rounded", async () => {
    await button.setProps({ rounded: true });

    expect(findClass(/.+_rounded$/)).toBeTruthy();
  });

  test("JoButton can be made filled", async () => {
    await button.setProps({ filled: true });

    expect(findClass(/.+_filled$/)).toBeTruthy();
  });

  test("JoButton can be made reversed", async () => {
    await button.setProps({ reverse: true });

    expect(findClass(/.+_reverse$/)).toBeTruthy();
  });
});
