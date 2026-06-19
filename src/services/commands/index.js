import { weatherCommand } from "./weatherCommand.js";
import { messageService } from "../message.js";

const commands = {
    weather: weatherCommand,
}

export const commandService = {
    async execute(input, { conversationId, senderId }) {
        if (!input.startsWith("/")) return false;

        const [cmd] = input.slice(1).split(" ");
        const command = commands[cmd];
        if (!command) return false;

        const result = await command.handle()
        await messageService.create({
            conversation_id: conversationId,
            sender_id: senderId,
            content: result
        })
        return true
    }
}