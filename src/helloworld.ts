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
export class PlayArgs {
    x: u32 = 0;
    y: u32 = 0;
    n: u32 = 0;
}

// export function start(_args: string): void {
// }

export function play(_args: string): void {
    const args = JSON.parse<PlayArgs>(_args);
    // Check if player owns anything in (x, y)
    
    const player_address = JSON.parse<string[]>(Context.get_call_stack())[0];
    // Throw an error if there is no one here
    Storage.get_data("gameState_" + args.x.toString() + args.y.toString());
    // Storage.set_data_for(address, "gameState_" + x.toString() + y.toString(), "0");
    // Apply operation ? Or store and resolve later ?
}
