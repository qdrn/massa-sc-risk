/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 **/

import { create_sc, include_base64, print, call, unsafe_random, Context, Storage } from "massa-sc-std";
import { JSON } from 'json-as';
import { CellState, PlayArgs } from './helloworld'

// Create SC and initialize
function initialize(): string {
    const bytes = include_base64('./build/helloworld.wasm');
    let sc_address = create_sc(bytes);
    print("Address = " + sc_address);

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            Storage.set_data_for(sc_address, "gameState_" + x.toString() + y.toString(), "0");
        }
    }

    return sc_address
}

export function main(_args: string): string {
    const sc_address = initialize();
    print(`${JSON.parse<string[]>(Context.get_call_stack())[0]}`)

    // TODO: For testing. Remove
    // Add troops to sender
    var x = 0;
    var y = 0;
    var player_address = "sender";
    var troops = 5;
    var cell_state = JSON.stringify<CellState>({address: player_address, n: troops});
    var key = "gameState_" + x.toString() + y.toString();
    Storage.set_data_for(sc_address, key, cell_state);
    // Add troops to 2aDvGEMSQ6oL97QEExvVW9EC9dWQx8tDamgf7Ko7TM7UPirpHz
    x = 0;
    y = 1;
    player_address = "2aDvGEMSQ6oL97QEExvVW9EC9dWQx8tDamgf7Ko7TM7UPirpHz";
    troops = 3;
    cell_state = JSON.stringify<CellState>({address: player_address, n: troops});
    key = "gameState_" + x.toString() + y.toString();
    Storage.set_data_for(sc_address, key, cell_state);
    
    print(call(sc_address, "play", JSON.stringify<PlayArgs>({x0: 0, y0: 0, x1: 0, y1: 1, n: 5}), 0));

    print(Storage.get_data_for(sc_address, key));

    return "ok";
}
