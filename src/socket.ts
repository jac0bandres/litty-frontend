import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

export function connectToLittyServer(term: Terminal, fitAddon: FitAddon) {
    const socket = new WebSocket('ws://localhost:7676/ws');
    socket.binaryType = 'arraybuffer';

    socket.onopen = () => {
        console.log("Connected to litty-server");
        term.write('\r\n[Connected to litty-server]\r\n');
        socket.send(JSON.stringify({
            type: 'init',
            data: 'Hello from litty-client!'
        }));
    };

    socket.onmessage = (event: MessageEvent) => {
        const response = JSON.parse(event.data);
        console.log("Received data from litty-server:", response);
        term.write(response.data);
    };

    socket.onclose = () => {
        term.write('\r\n[Disconnected from litty-server]\r\n');
        socket.close();
    }

    socket.onerror = () => {
            window.location.href = '/install'
    };

    window.addEventListener('resize', () => {
        fitAddon.fit();
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'resize',
                cols: term.cols,
                rows: term.rows
            }));
        }
    })

    term.onResize(() => {
        fitAddon.fit();
    })
}
