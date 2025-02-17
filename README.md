# Discord Mirror
Make your account behave like a bot and mirror messages from a server to another (through webhooks).

# Showcase

> Original message (from server A):\
![](https://i.imgur.com/ogelJ23.png)\
Mirrored message (to server B):\
![](https://i.imgur.com/C42OT64.png)

# Main Features

- Replace mentions and other content before mirroring a message.
- Disguise mirrored messages as the original author or use a custom webhook profile.
- Support mirroring as many channels as you want to as many webhooks as you want.
- Prevent specific users and roles from being mirrored.

# How To Use
1. Install [NodeJS](https://nodejs.org/en/download).
2. Clone this repository.
3. Navigate to the project folder and run `npm install` to install the dependencies.
4. Run `npm run compile` to compile the bot.
5. Configure `config.yml`.
5. Run `npm start` to start the bot.

# Configuration guide
Each option in `config.yml` is either self explanatory or has a comment above describing it:
```yml
# Token of the personal Discord account that will mirror messages.
# Learn how to find your account token here: https://www.androidauthority.com/get-discord-token-3149920/
token: "insert_your_token_here"

# Status of the account that will mirror messages.
# Available options: online, offline, idle, dnd.
#
# Note that you should not be logged into the account
# when the bot starts for this option to take effect.
status: "online"

# Message sent in the console when a message is mirrored.
# You can set this to "" to disable it.
logMessage: "(%date%) Mirrored %author% message from %server%."

mirrors:
   # The following contains a mirror with its options.
   # Every option is optional and can be removed if not required.
   1:
      # You can find the id of a channel by enabling the Developer mode in your
      # Discord account settings and Right-Click -> Copy ID on a channel.
      channelIds:
         - "insert_channel_id_to_mirror_here"
      # Webhooks are used to send mirrored messages to specific channels.
      # You can create a webhook for a channel with:
      # Edit channel -> Integrations -> Webhooks -> New webook.
      webhookUrls:
         - "insert_destionation_webhook_url_here"
      ignoredUserIds:
         - "insert_user_id_not_to_mirror_here"
      ignoredRoleIds:
         - "insert_role_id_not_to_mirror_here"
      requirements:
         minEmbedsCount: 0
         minContentLength: 0
         minAttachmentsCount: 0
      options:
         useWebhookProfile: false
         removeAttachments: false
         mirrorMessagesFromBots: true
         mirrorReplyMessages: true
         mirrorMessagesOnEdit: false
      # Replacements to perform before mirroring a message.
      # The where: option is used to sepcify which part of a message
      # should be replaced. The available options are:
      #
      # everywhere, message_content, embed_author, embed_author_url,
      # embed_author_icon_url, embed_title, embed_description, embed_url,
      # embed_field_name, embed_field_value, embed_image_url, embed_thumbnail_url
      # embed_footer, embed_footer_icon_url, embed_color.
      replacements:
         1:
            replace: "insert_text_to_replace_here"
            with: "insert_replaced_text_here"
            where: "everywhere"
         # To replace mentions of @roles, @users or #channels,
         # you have to replace their ids. For example:
         # 2:
         #    replace: "insert_role_id_to_replace_here"
         #    with: "insert_replaced_role_id_here"
         #    where: "everywhere"
   # You can create as many mirrors as you want, so that different
   # channels can be mirrored to different webhooks. For example:
   # 2:
   #   channelIds:
   #     - "insert_channel_id_to_mirror_here"
   #   webhookUrls:
   #     - "insert_destionation_webhook_url_here"
```

# Disclaimer

Note that using a Discord self bot is against the Discord TOS, and i take no responsibility for any consequences that may arise from using it.