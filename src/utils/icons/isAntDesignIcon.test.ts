import { isAntDesignIcon } from "./isAntDesignIcon";

describe("Is AntDesign icon ?", () => {
  it("Should render that 'link' is antDesign Icon", () => {
    const iconName = "link";
    const result = isAntDesignIcon(iconName);
    expect(result).toBeTruthy();
  });

  it("Should render that 'imnotanicon' isn't antDesign Icon", () => {
    const iconName = "imnotanicon";
    const result = isAntDesignIcon(iconName);
    expect(result).toBeFalsy();
  });
});
