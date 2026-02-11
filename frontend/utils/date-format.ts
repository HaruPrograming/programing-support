export const formatDatetypeYYYYMMDDhhmm = (dateStr: string): string => {
  const d = new Date(dateStr);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので +1
  const dd = String(d.getDate()).padStart(2, "0");

  const HH = String(d.getHours()).padStart(2, "0");
  const MM = String(d.getMinutes()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd} ${HH}:${MM}`;
};
