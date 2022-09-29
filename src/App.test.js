import { render, screen, fireEvent, hasInputValue } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the chatbox/i);
  expect(linkElement).toBeInTheDocument();
});

test('saves user name', async () => {
  render(<App />);
  const name = 'John'
  const input = await screen.findByPlaceholderText('Enter your name')
  fireEvent.change(input, {target: {value: name}})
  fireEvent.click(screen.getByText(/send/i, {selector: 'button'}))
  expect(screen.getByText(/John/i)).toBeInTheDocument()
})

test('message in chat box', async () => {
  render(<App />);
  const value = 'This is a random message'
  const input = await screen.findByPlaceholderText('Enter your message')
  fireEvent.change(input, {target: { value }})
  fireEvent.click(screen.getByText(/send/i, {selector: 'button'}))
  expect(screen.getByText(value)).toBeInTheDocument()
})
