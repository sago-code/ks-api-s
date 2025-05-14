import { App } from "./app";

async function main() {
    const app = new App(3002);
    await app.listen();
}

main();


