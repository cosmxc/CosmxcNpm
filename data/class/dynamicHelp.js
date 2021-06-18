const { Client, Message, MessageEmbed } = require("discord.js");

/**
 * A function to create send a help embed message
 * @param {Client} client - Your Discord Client
 * @param {Message} message - The Discord Message
 * @param {string} input - The command you are looking for
 * @param {string} prefix - Your bot's prefix
 * @param {string} color - Your embed color
 * @returns {Message} Discord Message
 * @example DynamicHelp(Client, Message, "ping", "?");
 */

function dynamicHelp(client, message, input, prefix, color) {
    if (!client || !(client instanceof Client))
        throw new Error("[cosmxc] => \"client\" is a required parameter and must be a Discord Client!");

    if (!message || !(message instanceof Message))
        throw new Error("[cosmxc] => \"message\" is a required parameter and must be a Discord Message!");

    if (!prefix || typeof prefix !== "string")
        throw new Error("[cosmxc] => \"prefix\" is a required parameter and must be a String!");

    if (!client.commands)
        throw new Error("[cosmxc] => Failed to find your commands using \"client.commands\"");

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    if (!cmd) {
        const noInfo = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ No information found for \`${input.toLowerCase()}\``)
        return message.channel.send(noInfo)
    }

    let info = `**Command Name:** \`${cmd.name || 'No command name.'}\`\n`;

    if (cmd.aliases)
        info += `**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}\n`;

    if (cmd.cooldown)
        info += `**Cooldown**: ${cmd.cooldown}\n`;

    if (cmd.example)
        info += `**Example**: ${cmd.example}\n`;

    info +=
        `**Description:** \`${cmd.description || 'No description.'}\`
        **Category**: \`${cmd.category || 'No category.'}\`
        **Usage**: \`${prefix}${cmd.usage || cmd.name}\`
        **Usage Syntax**: \`<> = required, [] = optional\``;

    const helpEmbed = new MessageEmbed()
        .setColor(color)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(info)
        .setFooter(`Commands: ${client.commands.size || 'Unknown'} | Prefix: ${prefix}`, message.author.displayAvatarURL({ dynamic: true }))
    return message.channel.send(helpEmbed);
}

module.exports = dynamicHelp;
