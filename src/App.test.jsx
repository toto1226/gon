import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('creates five lotto sets when the button is clicked', async () => {
  const user = userEvent.setup();
  render(<App />);

  const button = screen.getByRole('button', { name: /로또 번호 생성/i });
  await user.click(button);

  const lottoSets = screen.getAllByTestId('lotto-set');
  expect(lottoSets).toHaveLength(5);
});
