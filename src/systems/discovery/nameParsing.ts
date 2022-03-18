export function parseName(data: string): { name: string; variant: string } {
  if (data.indexOf("/") >= 0) {
    const [name, variant] = data.split("/");
    return { name, variant };
  }
  return { name: data, variant: "default" };
}
