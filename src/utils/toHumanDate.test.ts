import { toHumanDate } from "../utils/toHumanDate";

test.each([
  [new Date(2022, 0, 1), "01/01/2022"],
  [new Date(2022, 11, 31), "31/12/2022"],
  [new Date(2023, 5, 15), "15/06/2023"],
  [new Date(2023, 11, 1), "01/12/2023"],
  [new Date(2024, 2, 10), "10/03/2024"],
  [new Date(2024, 8, 30), "30/09/2024"],
  [new Date(2025, 3, 5), "05/04/2025"],
  [new Date(2025, 6, 20), "20/07/2025"],
  [new Date(2026, 9, 25), "25/10/2026"],
  [new Date(2026, 11, 31), "31/12/2026"],
])('toHumanDate(%p) should return "%s"', (date, expected) => {
  expect(toHumanDate(date)).toBe(expected);
});
