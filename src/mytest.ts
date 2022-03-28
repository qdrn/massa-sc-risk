/** ***************************************************************************
 * This file show you an example of how to call a smart contract
 * 
 * Once you ran the command `yarn run-sc 
 **/

import { call, print } from "massa-sc-std";
 
export function main(_args: string): string {
    const addr = "FcRuD46Ib1A="; // Replace the address 
    const func = "helloworld"; // Replace the function
    const args = "Adrien!"; // Replace the arguments if you want
    print(call(addr, func, args, 0));
    return "0"
}
