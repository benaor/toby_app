import { isFontAwesomeIcon } from "./isFontAwesomeIcon";

describe("Is FontAwesome icon ?", () => {
  it("Should render that 'link' is FontAwesome Icon", () => {
    const iconName = "link";
    const result = isFontAwesomeIcon(iconName);
    expect(result).toBeTruthy();
  });

  it("Should render that 'imnotanicon' isn't FontAwesome Icon", () => {
    const iconName = "imnotanicon";
    const result = isFontAwesomeIcon(iconName);
    expect(result).toBeFalsy();
  });
});
