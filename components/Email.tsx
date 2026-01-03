import { Button, Html, Text, Heading } from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  name: string;
  message: string;
}

export const Email: React.FC<EmailProps> = ({ name, message }) => (
  <Html lang="en">
    <Heading as="h1">New Message from {name}</Heading>
    <Text>{message}</Text>
    <Button
      pX={20}
      pY={12}
      href="https://example.com"
      style={{ background: '#000', color: '#fff' }}
    >
      Click me
    </Button>
  </Html>
);

export default Email;