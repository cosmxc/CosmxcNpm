## 🤔 Whats is this?

Just a simple dynamic help command for your Discord bot.

## 💻 Installation

```
npm install cosmxc
```

## ⚙️ Usage

Edit the code depending on your parameters and command handler.

```js
const { dynamicHelp } = require("cosmxc");

module.exports = {
    name: 'help',
    description: 'Sends all the commands or a command information',
    examples: ['help', 'help ban'],
    category: 'Utility Commands',
    usage: 'help (command)',
    execute(client, message, args) {
        dynamicHelp(client, message, args[0], "BOT_PREFIX", "EMBED_COLOR");
    }
}
```
