# Hello world 🌍

Hello world project for Massa's smart contracts development. This preset environment can be used to test and debug locally your smart contract before sending it to the [Massa network](https://github.com/massalabs/massa).

## Quick setup

You need `node`, `yarn` and `npx` to initialize the project!

```shell
npx massa-sc-create hello-world
```

> N.B. if you didn't initialize this project with `npx`, you can clone and customize manually this repository with the command bellow. You'll be able to change the version of `massa-sc-std` if it's not already at the latest version.
> 
> ```shell
> git clone https://github.com/massalabs/massa-sc-template
> ```


Once this repository is cloned, run the following command in the freshly created directory:

```shell
yarn install
```

> You can be sure to load the same versions as developers did with the `--frozen-lockfile` flag, or `--immutable` if you use `yarn2`

## Usage

You can run scripts described in the package.json with `yarn run {script_name}`, if you're not confident with the package.json, take a minute to look at the [yarn documentation](https://classic.yarnpkg.com/lang/en/docs/cli/run/).

I'll describe the different embedded scripts in this section and redirect to several documentations if required.

- `helloworld`: generate a `.wasm` file in a `build/` directory `src/helloworld.ts`. This is the hello world smart contract example. If you look at this command line, you can see that we use the `asc` binary, this is the AssemblyScript compiler. Here is [the documentation](https://www.assemblyscript.org/introduction.html) if you want to know more.
- `replaceIncludes`: generate a `src/createSC.m.ts`. We want to replace the `include_base64('path.wasm')` with the real binary contained in `path.wasm` before compiling `createSC`.
- `buildSC`: compile `src/createSC.m.ts`
- `cleanSC`: remove temp file `src/createSC.m.ts`
- `createSC`: run `replaceIncludes`, `buildSC` and `cleanSC`
- `buildAll`: run `helloworld` and `createSC`
- `exec`: run `buildAll` and then execute the smart contract on a mock with the `massa-sc-test` binary. Look at the mock repository [here](https://github.com/massalabs/massa-sc-tester) for more information about mocking the network.
- `buildTest`: Build `mytest.ts`
- `execTest`: Exec in the mocked network `mytest.wasm`

## Mocked ledger

To test your smart contracts locally, [download](https://github.com/massalabs/massa-sc-tester/releases) the `massa-sc-tester` release that corresponds to your environment. Unzip the downloaded file and put the executable in `./bin` directory. Make sure that the right access permissions are set with `chmod`. If everything is setup correctly the commands `exec` and `execTest` should work.

Once you ran the `exec` script, you should see a new file in the directory named `ledger.json`. This file represent the local state of the ledger for your test. You can modify it manually (obviously, carefully) to look at the state of the ledger after each execution.

> For now, the execution on the mocked ledger doesn't behave exactly like on the real massa network, in particular if the execution of a smart-contract fails. The ledger file is modified each time you run a code that writes on the ledger file and there is no backup management. It means that even if your code failed after writing in the ledger, the modifications are saved while the execution would be reverted on the real massa network.

## Report an issue

If you get an issue with `massa-sc-test` we would appreciate a report on the [dedicated repository](https://github.com/massalabs/massa-sc-tester/issues/new/choose). Use an appropriate language and explain step by step your problem with examples and screenshots.
