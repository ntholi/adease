import { ZodObject, ZodTypeAny } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { MantineProvider, Stack } from '@mantine/core';
import React from 'react';

export type FormProps<T> = {
  children: React.ReactNode;
  action: (values: T) => Promise<void>;
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  initialValues?: T;
};

export function Form<T extends Record<string, any>>({
  schema,
  initialValues,
  action,
  children,
}: FormProps<T>) {
  const form = useForm<T>({
    validate: schema && zodResolver(schema),
    initialValues,
  });

  async function handleSubmit(values: T) {
    try {
      await action(values);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'Error',
        message:
          err instanceof Error ? err.message : 'An unexpected error occurred',
        color: 'red',
      });
    }
  }

  return (
    <MantineProvider>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack py={50} px={70} pb={120} gap={'lg'}>
          {React.Children.map(children, (child) =>
            recursivelyModifyChildren(child, form)
          )}
        </Stack>
        <button type='submit'>Submit</button>
      </form>
    </MantineProvider>
  );
}

function recursivelyModifyChildren(
  child: React.ReactNode,
  form: any
): React.ReactNode {
  if (!React.isValidElement(child)) return child;

  const childElement = child as React.ReactElement;
  const newProps = { ...childElement.props };

  if (childElement.props.name) {
    Object.assign(newProps, form.getInputProps(childElement.props.name));
  }

  if (childElement.props.children) {
    newProps.children = React.Children.map(
      childElement.props.children,
      (grandChild) => recursivelyModifyChildren(grandChild, form)
    );
  }

  return React.cloneElement(childElement, newProps);
}
