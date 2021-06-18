const { Client, Message, MessageEmbed } = require("discord.js");

/**
 * @param {Client} client - The Discord Client
 * @param {Message} message - The Discord Message
 * @param {string} input - The Bot Command
 * @param {string} prefix - The Bot's Prefix
 * @param {string} color - The Embed Color
 */

function dynamicHelp(client, message, input, prefix, color) {
    if (!client || !(client instanceof Client))
        throw new Error("Cosmxc Error: \"client\" is a required parameter and must be a Discord Client!");

    if (!message || !(message instanceof Message))
        throw new Error("Cosmxc Error: \"message\" is a required parameter and must be a Discord Message!");

    if (!prefix || typeof prefix !== "string")
        throw new Error("Cosmxc Error: \"prefix\" is a required parameter and must be a String!");

    if (!client.commands)
        throw new Error("Cosmxc Error: Failed to find your commands using \"client.commands\"");

    if (!input) {
        const { commands, owners } = client;
        const categories = new Set();
        const fields = [];

        commands.forEach((cmd) => {
            if (cmd.ownerOnly && !owners.includes(message.author.id)) return;
            const cmdCategory = cmd.category || "Misc";
            categories.add(cmdCategory);
        });

        Array.from(categories).sort()
        categories.forEach((cat) => {
            const field = [];
            commands.forEach((cmd) => {
                if (cmd.ownerOnly && !owners.includes(message.author.id)) return;
                if (!cmd.category && cat == "Misc")
                    field.push(cmd);
                if (cmd.category == cat) field.push(cmd);
            });

            let fieldName = `${nicerString(cat)} Commands [${field.length}]`
            if (cat.toLowerCase().includes('command')) fieldName = `${nicerString(cat)} [${field.length}]`

            fields.push({
                name: fieldName,
                value: field.map((cmd) => `\`${cmd.name}\``).join(" "),
                inline: false,
            });
        });

        const embed = new MessageEmbed()
            .setAuthor(`${client.user?.username} Commands List`, client.user?.displayAvatarURL())
            .setDescription(`Use \`${prefix}help <command>\` to get more info on a command.`)
            .addFields(fields)
            .setFooter(`Bot Prefix: ${prefix}`)
            .setTimestamp()
            .setColor(color)
        return message.channel.send(embed);
    }

    try {
        const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

        if (!cmd) {
            const noInfo = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ No information found for \`${nicerString(input)}\``)
            return message.channel.send(noInfo)
        }

        let info = `**Description:** \`${cmd.description || 'No description.'}\`\n`;

        if (cmd.aliases)
            info += `**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}\n`;

        if (cmd.cooldown)
            info += `**Cooldown**: \`${cmd.cooldown}\`\n`;

        if (cmd.example)
            info += `**Example**: \`${cmd.example}\`\n`;

        info +=
            `**Category**: \`${cmd.category || 'No category.'}\`
            **Usage**: \`${prefix}${cmd.usage || cmd.name}\``;

        const helpEmbed = new MessageEmbed()
            .setColor(color)
            .setTitle(`${nicerString(cmd.name)} Command Info`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(info)
            .setFooter(`Bot Prefix: ${prefix}`)
            .setTimestamp()
        return message.channel.send(helpEmbed);
    } catch {
        const noInfo = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ No information found for \`${nicerString(input)}\``)
        return message.channel.send(noInfo)
    }
}

function nicerString(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
}

module.exports = dynamicHelp;


