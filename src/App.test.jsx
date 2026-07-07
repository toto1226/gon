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

test('toggles between dark and light themes', async () => {
  const user = userEvent.setup();
  render(<App />);

  const themeButton = screen.getByRole('button', { name: /화이트 모드/i });
  await user.click(themeButton);

  expect(screen.getByRole('button', { name: /다크 모드/i })).toBeDefined();
});
