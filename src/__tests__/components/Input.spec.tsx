import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText(/e-mail/i)).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    const inputField = getByPlaceholderText(/e-mail/i);
    const container = getByTestId('input-container');

    fireEvent.focus(inputField);

    await wait(() => {
      expect(container).toHaveStyle('border-color: #f99000');
      expect(container).toHaveStyle('color: #f99000');
    });

    fireEvent.blur(inputField);

    await wait(() => {
      expect(container).not.toHaveStyle('border-color: #f99000');
      expect(container).not.toHaveStyle('color: #f99000');
    });
  });

  it('should keep border highlight when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    const inputField = getByPlaceholderText(/e-mail/i);
    const container = getByTestId('input-container');

    fireEvent.change(inputField, { target: { value: 'b@b.com' } });
    fireEvent.blur(inputField);

    await wait(() => {
      expect(container).toHaveStyle('color: #f99000');
    });
  });
});
