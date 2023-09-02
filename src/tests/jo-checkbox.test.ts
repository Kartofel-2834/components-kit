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
