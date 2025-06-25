import { setupTerminal } from './terminal';
import { connectToLittyServer } from './socket';

const { term, fitAddon } = setupTerminal();
connectToLittyServer(term, fitAddon);
