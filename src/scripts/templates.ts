export function pageTemplate(resource: string) {
  return `
import { NothingSelected } from 'adease';

export default function Page() {
  return <NothingSelected title='${resource}' />;
}
`.trim();
}
