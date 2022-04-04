
'use strict';

let port;
let reader;
let inputDone;
let outputDone;
let inputStream;
let outputStream;

const log = document.getElementById('log');
const ledCBs = document.querySelectorAll('input.led');
const divLeftBut = document.getElementById('leftBut');
const divRightBut = document.getElementById('rightBut');
const butConnect = document.getElementById('butConnect');

const GRID_HAPPY = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0];
const GRID_SAD = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1];
const GRID_OFF = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const GRID_HEART = [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0];


document.addEventListener('DOMContentLoaded', () => {
    butConnect.addEventListener('click', clickConnect);

    // CODELAB: Add feature detection here.
    const notSupported = document.getElementById('notSupported');
    notSupported.classList.toggle('hidden', 'serial' in navigator);

});


/**
 * @name connect
 * Opens a Web Serial connection to a micro:bit and sets up the input and
 * output stream.
 */
async function connect() {
    const filter = { usbVendorId: 0x10C4 };//], usbProductId: 0x86BE };

    // CODELAB: Add code to request & open port here.
    // - Request a port and open a connection.
    port = await navigator.serial.requestPort();
    // - Wait for the port to open.
    await port.open({ baudRate: 115200 });


    // CODELAB: Add code setup the output stream here.
    const encoder = new TextEncoderStream();
    outputDone = encoder.readable.pipeTo(port.writable);
    outputStream = encoder.writable;

    // CODELAB: Send CTRL-C and turn off echo on REPL
    writeToStream('@AT+++\r', 'echo(true);');
    writeToStream('@ATDSPSTOPLOGO\r', 'echo(true);');s

    // CODELAB: Add code to read the stream here.
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable
        .pipeThrough(new TransformStream(new LineBreakTransformer()));

    reader = inputStream.getReader();
    readLoop();

}


/**
 * @name disconnect
 * Closes the Web Serial connection.
 */
async function disconnect() {
    drawGrid(GRID_OFF);
    sendGrid();

    // CODELAB: Close the input stream (reader).
    if (reader) {
        await reader.cancel();
        await inputDone.catch(() => { });
        reader = null;
        inputDone = null;
    }

    // CODELAB: Close the output stream.
    if (outputStream) {
        await outputStream.getWriter().close();
        await outputDone;
        outputStream = null;
        outputDone = null;
    }

    // CODELAB: Close the port.
    await port.close();
    port = null;

}


/**
 * @name clickConnect
 * Click handler for the connect/disconnect button.
 */
async function clickConnect() {
    // CODELAB: Add disconnect code here.
    if (port) {
        await disconnect();
        toggleUIConnected(false);
        return;
    }

    // CODELAB: Add connect code here.
    await connect();

    // CODELAB: Reset the grid on connect here.

    // CODELAB: Initialize micro:bit buttons.

    toggleUIConnected(true);
}


/**
 * @name readLoop
 * Reads data from the input stream and displays it on screen.
 */
async function readLoop() {
    // CODELAB: Add read loop here.
    while (true) {
        const { value, done } = await reader.read();
        if (value) {
            log.textContent += value + '\n';
        }
        if (done) {
            console.log('[readLoop] DONE', done);
            reader.releaseLock();
            break;
        }
    }

}


/**
 * @name sendGrid
 * Iterates over the checkboxes and generates the command to set the LEDs.
 */
function sendGrid() {
    // CODELAB: Generate the grid

}


/**
 * @name writeToStream
 * Gets a writer from the output stream and send the lines to the micro:bit.
 * @param  {...string} lines lines to send to the micro:bit
 */
function writeToStream(...lines) {
    // CODELAB: Write to output stream
    const writer = outputStream.getWriter();
    lines.forEach((line) => {
        console.log('[SEND]', line);
        writer.write(line + '\n');
    });
    writer.releaseLock();

}


/**
 * @name watchButton
 * Tells the micro:bit to print a string on the console on button press.
 * @param {String} btnId Button ID (either BTN1 or BTN2)
 */
function watchButton(btnId) {
    // CODELAB: Hook up the micro:bit buttons to print a string.

}


/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.container = '';
    }

    transform(chunk, controller) {
        // CODELAB: Handle incoming chunk
        this.container += chunk;
        const lines = this.container.split('\r');
        this.container = lines.pop();
        lines.forEach(line => controller.enqueue(line));

    }

    flush(controller) {
        // CODELAB: Flush the stream.
        controller.enqueue(this.container);

    }
}


/**
 * @name JSONTransformer
 * TransformStream to parse the stream into a JSON object.
 */
class JSONTransformer {
    transform(chunk, controller) {
        // CODELAB: Attempt to parse JSON content

    }
}


/**
 * @name buttonPushed
 * Event handler called when one of the micro:bit buttons is pushed.
 * @param {Object} butEvt
 */
function buttonPushed(butEvt) {
    // CODELAB: micro:bit button press handler

}


/**
 * The code below is mostly UI code and is provided to simplify the codelab.
 */

function initCheckboxes() {
    ledCBs.forEach((cb) => {
        cb.addEventListener('change', () => {
            sendGrid();
        });
    });
}

function drawGrid(grid) {
    if (grid) {
        grid.forEach((v, i) => {
            ledCBs[i].checked = !!v;
        });
    }
}

function toggleUIConnected(connected) {
    let lbl = 'Connect';
    if (connected) {
        lbl = 'Disconnect';
    }
    butConnect.textContent = lbl;
    ledCBs.forEach((cb) => {
        if (connected) {
            cb.removeAttribute('disabled');
            return;
        }
        cb.setAttribute('disabled', true);
    });
}
