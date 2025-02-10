// This file configures Jest to add custom matchers
import "@testing-library/jest-native/extend-expect";

afterEach(() => {
  jest.restoreAllMocks();
});
