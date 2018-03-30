const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const Bot = new Commando.Client();

const prefix = "$";

//Bot login
Bot.on("ready", async () => {
  console.log(`[success] Logged in als ${Bot.user.username}.`);

  try{
    let link = await Bot.generateInvite(["ADMINISTRATOR"]);
    console.log(`[success] ${link}`);
  }catch(e){
    console.log(`[error] ${e.stack}`);
  }
});

//Befehle
Bot.on("message", async (message) => {
  var content = message.content;
  var author = message.member;
  if(author.id != Bot.user.id){
    if(content.toUpperCase() == `${prefix}BOT`){
      message.channel.sendMessage(`Hallo ${author}, ich bin der Bot dieses Servers.`);
    }else if(content.toUpperCase() == `${prefix}MÜNZWURF`){
      var bit = Math.floor(Math.random() * (1-0+1))+0;
      switch (bit){
        case 0:
          res = "Kopf";
          break;
        case 1:
          res = "Zahl";
          break
      }
      message.channel.sendMessage(res);
    }else if(content.toUpperCase().startsWith(`${prefix}SAY`)){
      array = content.split(" ");
      res = array.splice(1).join(" ");
      message.channel.sendMessage(res);
    }else if(content.toUpperCase() == `${prefix}CLEAR`){
      async function cls(){
        message.delete();
        const fetched = await message.channel.fetchMessages({limit: 100});
        var size = fetched.size;
        message.channel.bulkDelete(fetched);
        if(size == 1){
          message.channel.sendMessage(`${size} Nachricht wurde gelöscht.`);
          console.log(`[success] ${size} Nachricht wurde gelöscht.`);
        }else{
          message.channel.sendMessage(`${size} Nachrichten wurden gelöscht.`);
          console.log(`[success] ${size} Nachrichten wurden gelöscht.`);
        }
      }
      cls();
    }else if(content.toUpperCase() == `${prefix}USERINFO`){
      var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Userinfo")
        .addField("Ganzer Name" ,`${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Erstellt", message.author.createdAt)
        .setColor("#4595ff");
      message.channel.sendEmbed(embed);
    }else if(content.toUpperCase() == `${prefix}MUSIK`){
      var embed = new Discord.RichEmbed()
        .setAuthor("Musik Dyno Bot Steurung")
        .setDescription("Achtung: Der Musikbot ist sehr sehr laut, stelle mit einem Rechtsklick seine Lautstärke auf unter 10%!")
        .addField("Musik abspielen:", "?play")
        .addField("Musik stoppen:", "?stop")
        .addField("Lied überspringen:", "?skip")
        .addField("Playlist anzeigen:", "?queue list")
        .addField("Song hinzufügen:", "?play <Youtube-Link>")
        .addField("Playlist leeren:", "?queue clear")
        .setColor("#4595ff");
      message.channel.sendEmbed(embed);
    }else if(content.toUpperCase() == `${prefix}HELP`){
      var embed = new Discord.RichEmbed()
        .setAuthor("Übersicht Befehle")
        .setDescription("Hier sind alle Befehle aufgelistet. Groß- und Kleinschreibung ist egal, hauptsache du startest mit dem Prefix $.")
        .addField("Info zum Main Bot:", "$bot")
        .addField("Münzwurf (Kopf oder Zahl):", "$münzwurf")
        .addField("Befehle des Dyno Musikbots:", "$musik")
        .addField("Info über sich selbst:", "$userinfo")
        .addField("Die letzten 100 Chat-Nachrichten löschen:", "$clear")
        .setColor("#4595ff");
      message.channel.sendEmbed(embed);
    }
  }
});

Bot.on("voiceStateUpdate", (oldMember, newMember) => {
  var username = newMember.user.username;
  if(username != "MusikBot"){
    try{
      var oldMemberChannel = oldMember.voiceChannel.name;
      var newMemberChannel = newMember.voiceChannel.name;
    }catch(e){
      console.log("[error] oldMemberChannel und/oder newMemberChannel konnten nicht bestimmt werden.");
    }
    if(newMemberChannel == "AFK Bereich" && newMemberChannel != oldMemberChannel){
      newMember.setMute(true, "");
    }else if(newMemberChannel != "AFK Bereich" && newMemberChannel != oldMemberChannel){
      newMember.setMute(false, "");
    }
  }
});

Bot.login("process.env.BOT_TOKEN");
