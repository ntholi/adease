import { ZodObject, ZodTypeAny } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { MantineProvider, Stack, StackProps } from '@mantine/core';
import React, { useState } from 'react';
import FormHeader from './FormHeader';

export type FormProps<T> = {
  children: React.ReactNode;
  action: (values: T) => Promise<void>;
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  initialValues?: T;
  title?: string;
} & StackProps;

export function Form<T extends Record<string, any>>({
  schema,
  initialValues,
  action,
  title,
  children,
  ...props
}: FormProps<T>) {
  const [pending, setPending] = useState(false);
  const form = useForm<T>({
    validate: schema && zodResolver(schema),
    initialValues,
  });

  async function handleSubmit(values: T) {
    try {
      setPending(true);
      await action(values);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'Error',
        message:
          err instanceof Error ? err.message : 'An unexpected error occurred',
        color: 'red',
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <MantineProvider>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader title={title} isLoading={pending} />
        <Stack p={'xl'} {...props}>
          {React.Children.map(children, (child) =>
            recursivelyModifyChildren(child, form)
          )}
        </Stack>
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
