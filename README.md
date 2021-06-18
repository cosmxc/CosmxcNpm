## 🤔 Whats is this?

Just a simple utility package for your Discord bot.

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
    execute(client, message, args) {
        dynamicHelp(client, message, args[0], "BOT_PREFIX", "EMBED_COLOR");
    }
}
```