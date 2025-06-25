import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

export function setupTerminal() {
    const term = new Terminal({
        fontFamily: 'monospace',
        cursorBlink: true,
        theme: {
            background: '#000000',
            foreground: '#ffffff',
        },
    })

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('terminal') as HTMLElement);
    fitAddon.fit();

    return { term, fitAddon}
}
