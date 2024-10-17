export function pagePageTemplate(resource: string) {
  return `
import { NothingSelected } from 'adease';

export default function Page() {
  return <NothingSelected title='${capitalize(resource)}' />;
}
`.trim();
}

export function createPageTemplate(resource: string) {
  return `
import { Box } from '@mantine/core';
import Form from '../Form';
import { create${capitalize(resource)} } from '../actions';

export default async function Create${capitalize(resource)}Page() {
  return (
    <Box p={'lg'}>
      <Form onSubmit={create${capitalize(resource)}} />
    </Box>
  );
}
`.trim();
}

function capitalize(resource: string) {
  return resource.charAt(0).toUpperCase() + resource.slice(1);
}
