export type Equivalents = {
  [key: number]: string;
};

export default function formatPhone(
  data: string,
  start = "+7",
  equivalents: Equivalents = { 8: "7", 9: "79" }
): string {
  if (!data.length) return data;

  let digitsOnly = data.replace(/\D/g, "");

  for (const equivalent in equivalents) {
    if (!new RegExp(`^${equivalent}`).test(digitsOnly)) continue;

    digitsOnly = digitsOnly.replace(equivalent, equivalents[equivalent]);
  }

  digitsOnly = `+${digitsOnly}`;

  if (digitsOnly.length < start.length) return digitsOnly;

  const startCheck = new RegExp(`^\\+${start.slice(1)}`);

  if (!startCheck.test(digitsOnly)) return digitsOnly;

  const content = digitsOnly.slice(digitsOnly.indexOf(start) + start.length);
  let result = `${start}`;

  if (!content.length) return result;

  result += ` (${content.slice(0, 3)}`;

  if (content.length < 4) return result;

  result += `) ${content.slice(3, 6)}`;

  if (content.length < 7) return result;

  result += ` ${content.slice(6, 8)}`;

  if (content.length < 8) return result;

  result += `-${content.slice(8, 10)}`;

  return result;
}
