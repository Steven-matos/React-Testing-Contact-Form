import React from 'react';
import {render, fireEvent, waitForElement, getByLabelText} from '@testing-library/react';
import ContactForm from './ContactForm';

test('Contact Form renders', () => {
    const { getByLabelText } = render(<ContactForm />);
    getByLabelText(/First Name*/i);
    getByLabelText(/Last Name*/i);
    getByLabelText(/Email*/i);
    getByLabelText(/message/i);
});

test('form validation', () => {
    const {getByTestId, getByLabelText} = render(<ContactForm/>)

    fireEvent.focus(getByLabelText(/First Name*/i));
    fireEvent.blur(getByLabelText(/First Name*/i));

    fireEvent.focus(getByLabelText(/Last Name*/i));
    fireEvent.blur(getByLabelText(/Last Name*/i));

    fireEvent.focus(getByLabelText(/Email*/i));
    fireEvent.blur(getByLabelText(/Email*/i));

    waitForElement(() => getByTestId(/validation/i));
    waitForElement(() => getByTestId(/validation2/i)); 
    waitForElement(() => getByTestId(/validation3/i));
});

test('form new contact info', () => {
    const {getByLabelText } = render(<ContactForm />);

    const firstNameInput = getByLabelText(/First Name*/i);
    const lastNameInput = getByLabelText(/Last Name*/i);
    const emailInput = getByLabelText(/Email*/i);
    const messageInput = getByLabelText(/message/i);

    fireEvent.change(firstNameInput, {target: {value: 'FirstName'}});
    fireEvent.change(lastNameInput, { target: { value: 'LastName' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(messageInput, { target: { value: 'AMessage' } });

    expect(firstNameInput.value).toBe('FirstName');
    expect(lastNameInput.value).toBe('LastName');
    expect(emailInput.value).toBe('test@test.com');
    expect(messageInput.value).toBe('AMessage');
});

test('form submitting new contact info', async () => {
    const { getByLabelText, getByTestId } = render(<ContactForm />);

    const firstNameInput = getByLabelText(/First Name*/i);
    const lastNameInput = getByLabelText(/Last Name*/i);
    const emailInput = getByLabelText(/Email*/i);
    const messageInput = getByLabelText(/message/i);

    fireEvent.change(firstNameInput, { target: { value: 'FirstName' } });
    fireEvent.change(lastNameInput, { target: { value: 'LastName' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(messageInput, { target: { value: 'AMessage' } });

    expect(firstNameInput.value).toBe('FirstName');
    expect(lastNameInput.value).toBe('LastName');
    expect(emailInput.value).toBe('test@test.com');
    expect(messageInput.value).toBe('AMessage');

    fireEvent.submit(getByTestId(/submit-btn/i));

    await waitForElement(() => getByTestId(/FirstName/i));
});