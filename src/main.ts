import ReactDOM from 'react-dom';

import App from './components/App';
import { parseJwtFromUrl } from './xhr/jwt';

function render(): void {
  const rootElement = document.querySelector('#root');
  ReactDOM.render(App(), rootElement);
}

async function main(): Promise<void> {
  await parseJwtFromUrl(window.location.href);
  render();
}

main();
