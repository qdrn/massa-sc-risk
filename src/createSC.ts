/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 **/

import { create_sc, include_base64, print, call, Context, Storage } from "massa-sc-std";
import { JSON } from 'json-as';

// Create SC and initialize
function initialize(_args: string): void {
    const bytes = include_base64('./build/helloworld.wasm');
    let address = create_sc(bytes);
    print("Address = " + address);

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            Storage.set_data_for(address, "gameState_" + x.toString() + y.toString(), "0");
        }
    }

    // TODO: For testing. Remove
    // var x = 0;
    // var y = 0;
    // var troops = 5;
    // var cell_state = JSON.stringify(['sender', troops])
    // Storage.set_data_for(address, "gameState_" + x.toString() + y.toString(), cell_state);
}

export function main(_args: string): string {
    // print(call(addr, "initialize", "", 0));
    print(`${JSON.parse<string[]>(Context.get_call_stack())[0]}`)
    return "ok";
}
