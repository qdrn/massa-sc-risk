/** ***********************
 * Smart contract exporting a public function `helloworld`
 **/
import { create_sc, include_base64, print, call, Context, Storage } from "massa-sc-std";
import { JSON } from 'json-as';

// Private key: 9J7Ne64oJibd9ERZJZNmQM7PGBJnAjQPvSS5u1Xw4fcoteme4
// Public key: 6P52mt3pwjHFMyiqVeU7chXWFVXDQa7kQH9CJjGDcbrdhaDHez
// Address: 2aDvGEMSQ6oL97QEExvVW9EC9dWQx8tDamgf7Ko7TM7UPirpHz

// Private key: xYG7tGH4FABjoLURRCS1uWAsx76Zn7PXp6ZFmCv5JgBXmYt4m
// Public key: 6XS6haNwwdqH9popMVNsRZDPS2GzpimAU9n48EZHtvNF6TXCxm
// Address: 2SzG4Aceny8JZWurwgmEPbPBK4GeTwQBr4HY6PvGT2X4aCju6s

@json
export class CellState {
    address: string = "";
    n: u32 = 0;
}

@json
export class PlayArgs {
    x0: u32 = 0;
    y0: u32 = 0;
    x1: u32 = 0;
    y1: u32 = 0;
    n: u32 = 0;
}

// export function start(_args: string): void {
// }

export function play(_args: string): void {
    const args = JSON.parse<PlayArgs>(_args);
    // Check if player owns anything in (x, y)
    
    const player_address = JSON.parse<string[]>(Context.get_call_stack())[0];
    print(player_address);
    
    // Throw an error if there is no one here
    var from_cell_state = JSON.parse<CellState>(Storage.get_data("gameState_" + args.x0.toString() + args.y0.toString()));

    // Update from cell state
    const new_troops = from_cell_state.n - args.n;
    Storage.set_data("gameState_" + args.x0.toString() + args.y0.toString(), new_troops.toString());
    
    // Attacker need to attack with something and less than his total troops
    assert(args.n > 0);
    assert(args.n <= from_cell_state.n);

    var to_cell_state = Storage.get_data_or_default("gameState_" + args.x1.toString() + args.y1.toString(), "0");
    var key = "gameState_" + args.x1.toString() + args.y1.toString();
    if (to_cell_state == "0") {
        to_cell_state = JSON.stringify<CellState>({address: player_address, n: args.n});
        Storage.set_data(key, to_cell_state);
    }
    else {
        const n_attacker = args.n
        const n_defender = JSON.parse<CellState>(to_cell_state).n
        if (n_attacker > n_defender) {
            // Update to_cell_state
            to_cell_state = JSON.stringify<CellState>({address: player_address, n: n_attacker - n_defender});
            Storage.set_data(key, to_cell_state);
        }
        else {
            const defender_address = JSON.parse<CellState>(to_cell_state).address;
            to_cell_state = JSON.stringify<CellState>({address: defender_address, n: n_defender - n_attacker});
            Storage.set_data(key, to_cell_state);
        }
        // Use `unsafe_random()` to put some randomness on outcome
    }
    // Storage.set_data_for(address, "gameState_" + x.toString() + y.toString(), "0");

    // Apply operation ? Or store and resolve later ? Maybe call a async SC at a given date ?
}

function resolve(): void {

}