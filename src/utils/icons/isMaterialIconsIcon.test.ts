import { isMaterialIconsIcon } from "./isMaterialIconsIcon";

describe("Is Material Icons icon ?", () => {
  it("Should render that 'imnotanicon' isn't Material Icons Icon", () => {
    const iconName = "imnotanicon";
    const result = isMaterialIconsIcon(iconName);
    expect(result).toBeFalsy();
  });

  it("Should render that 'home' is Material Icons Icon", () => {
    const iconName = "menu";
    const result = isMaterialIconsIcon(iconName);
    expect(result).toBeTruthy();
  });
});
