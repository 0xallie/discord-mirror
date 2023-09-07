import { Client, Message, PartialMessage, PresenceStatusData } from "discord.js-selfbot-v13"
import { isDirectMessage, isSystemMessage, isVisibleOnlyByClient } from "./utils";
import { Config } from "./config"
import { Mirror, MirrorConfig } from "./mirror";

type ChannelId = string;

export class MirrorClient extends Client {
   private config: Config;
   private mirrorChannels: Map<ChannelId, Mirror> = new Map();

   public constructor(config: Config) {
      super({checkUpdate: false});
      this.config = config;
      this.loadMirrors();

      this.on("ready", () => this.onReady());
      this.on("raw", (data) => console.log(JSON.stringify(data)));
      this.on("messageCreate", message => this.onMessageCreate(message));
      this.on("messageUpdate", (oldMessage, newMessage) => this.onMessageUpdate(oldMessage, newMessage));
   }

   private onReady(): void {
      this.user!.setStatus(this.config.getStatus() as PresenceStatusData);
      console.log(`${this.user?.username} is now mirroring >:)!`);
   }

   private onMessageCreate(message: Message): void {
      this.mirrorMessage(message);
   }

   private onMessageUpdate(_oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): void {
      if (!newMessage.partial) {
         this.mirrorMessage(newMessage);
      }
   }

   private mirrorMessage(message: Message) {
      if (!this.isMirrorableMessage(message)) {
         return;
      }
      const mirror = this.mirrorChannels.get(message.channelId);
      if (!mirror) {
         return;
      }
      if (!mirror.messageMeetsMirrorCriteria(message)) {
         return;
      }
      if (!mirror.stripMessage(message)) {
         return;
      }
      mirror.applyReplacements(message);
      mirror.dispatchMessage(message, message => this.logMirroredMessage(message));  
   }

   private isMirrorableMessage(message: Message): boolean {
      return !isSystemMessage(message) && !isDirectMessage(message) && !isVisibleOnlyByClient(message);
   }

   private logMirroredMessage(message: Message): void {
      const logMessage = this.config.getLogMessage();
      if (!logMessage.length) {
         return;
      }
      console.log(logMessage
         .replace("%date%", new Date().toUTCString())
         .replace("%author%", message.author.username)
         .replace("%server%", message.guild!.name)
      );
   }

   private loadMirrors(): void {
      for (const mirrorConfig of this.config.getMirrors()) {
         this.loadMirror(mirrorConfig);
      }
   }

   private loadMirror(mirrorConfig: MirrorConfig): void {
      const channelIds = mirrorConfig.channelIds;
      if (!channelIds) {
         return;
      }
      const mirror = new Mirror(mirrorConfig);
      for (const channelId of channelIds) {
         this.mirrorChannels.set(channelId, mirror);
      }
   }
}