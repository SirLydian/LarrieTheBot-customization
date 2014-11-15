(function () {

    //Define our function responsible for extending the bot.
    function extend() {
        //If the bot hasn't been loaded properly, try again in 1 second(s).
        if (!window.bot) {
            return setTimeout(extend, 1 * 1000);
        }

        //Precaution to make sure it is assigned properly.
        var bot = window.bot;

        //Load custom settings set below
        bot.retrieveSettings();
        
        //bot.commands.decommanddagewiledittenCommand.rank = 'user';
        bot.commands.kickCommand.rank = 'host';
        bot.commands.lockskipCommand.command = 'randomcmd';
        
        /*
         Extend the bot here, either by calling another function or here directly.
         Model code for a bot command:

         bot.commands.commandCommand = {
         command: 'cmd',
         rank: 'user/bouncer/mod/manager',
         type: 'startsWith/exact',
         functionality: function(chat, cmd){
         if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
         if( !bot.commands.executable(this.rank, chat) ) return void (0);
         else{
         //Commands functionality goes here.
         }
         }
         }

         */
        //function DisableAudioVideo() {
          //  $("div.item.s-av").click();
       //}
        
        //Mehs to skip function
        var isRecent = false;
        var mehLimit = Infinity;
        function callback() {
            if (API.getScore().negative < mehLimit || isRecent) return;
            isRecent = true;
            API.sendChat("@" + API.getDJ().username + " This song will be skipped because it reached the meh limit of "+mehLimit+"!");
            API.moderateForceSkip();
            setTimeout(function(){
               isRecent = false;
            }, 10000);
        }
        API.on(API.VOTE_UPDATE, callback);
        API.on(API.ADVANCE, function(obj){
            var WaitlistCount = API.getWaitList().length;
            if(WaitlistCount <= 45){
                var mehSkipCount = Math.round((WaitlistCount / 3) + 2);
                if(mehSkipCount < 5){
                    mehSkipCount = 5;
                }
            }
            mehLimit = mehSkipCount;
            setTimeout(function(){
                API.sendChat("Mehs to skip: " + mehLimit);
            }, 1500);
        });
        
        function checkManagers(){
            var managerPresent = false;
            var staff = API.getStaff();
            for(var i = 0; i < staff.length; i++){
                if(staff[i].role === 3 && staff[i].id !== 5152412){
                    managerPresent = true;
                }
            }
            var newSetting = true;
            if(managerPresent){
                newSetting = false;
            }
            if(bot.settings.bouncerPlus !== newSetting){
                if(newSetting){
                    API.sendChat("Bouncer+ enabled!");
                    //als je bouncerplus aanzet
                }else{
                    API.sendChat("Bouncer+ disabled!");
                    //als uitzet
                }
                bot.settings.bouncerPlus = newSetting;
            }
        }
        
        //check manager for bouncer+
        API.on(API.USER_JOIN, checkManagers);
        API.on(API.USER_LEAVE, checkManagers);
        
        bot.commands.newLockskipCommand = {
                command: 'lockskip',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function (chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                    if (!basicBot.commands.executable(this.rank, chat)) return void (0);
                    else {
                        if (basicBot.room.skippable) {
                            var dj = API.getDJ();
                            var id = dj.id;
                            var name = dj.username;
                            var msgSend = '@' + name + ': ';
                            basicBot.room.queueable = false;

                            if (chat.message.length === cmd.length) {
                                API.sendChat(subChat(basicBot.chat.usedlockskip, {name: chat.un}));
                                //Enable DJ-Cycle
                                $("div.cycle-toggle.button.disabled").click();
                                setTimeout(function (id) {
                                    //Skips the current DJ
                                    API.moderateForceSkip();
                                    basicBot.room.skippable = false;
                                    setTimeout(function () {
                                        basicBot.room.skippable = true
                                    }, 5 * 1000);
                                    setTimeout(function (id) {
                                        //Moves to lockskipPosition
                                        basicBot.userUtilities.moveUser(id, basicBot.settings.lockskipPosition, false);
                                        basicBot.room.queueable = true;
                                        setTimeout(function () {
                                            //Disable DJ-Cycle
                                            $("div.cycle-toggle.button.enabled").click();
                                        }, 1000);
                                    }, 1500, id);
                                }, 1000, id);
                                return void (0);
                            }
                            var validReason = false;
                            var msg = chat.message;
                            var reason = msg.substring(cmd.length + 1);
                            for (var i = 0; i < basicBot.settings.lockskipReasons.length; i++) {
                                var r = basicBot.settings.lockskipReasons[i][0];
                                if (reason.indexOf(r) !== -1) {
                                    validReason = true;
                                    msgSend += basicBot.settings.lockskipReasons[i][1];
                                }
                            }
                            if (validReason) {
                                API.sendChat(subChat(basicBot.chat.usedlockskip, {name: chat.un}));
                                //Enable DJ-Cycle
                                $("div.cycle-toggle.button.disabled").click();
                                setTimeout(function (id) {
                                    //Skips current DJ
                                    API.moderateForceSkip();
                                    basicBot.room.skippable = false;
                                    setTimeout(function(){
                                        API.sendChat(msgSend);
                                    }, 2000);
                                    setTimeout(function () {
                                        basicBot.room.skippable = true
                                    }, 5 * 1000);
                                    setTimeout(function (id) {
                                        //Moves to lockskipPosition
                                        basicBot.userUtilities.moveUser(id, basicBot.settings.lockskipPosition, false);
                                        basicBot.room.queueable = true;
                                        setTimeout(function () {
                                            //disable DJ-Cycle
                                            $("div.cycle-toggle.button.disabled").click();
                                        }, 1000);
                                    }, 1500, id);
                                }, 1000, id);
                                return void (0);
                            }
                        }
                    }
                }
            }
        
        //$("div.item.s-av").click();
        setTimeout(function(){$("div.info").click();}, 2000);
        setTimeout(function(){$("div.item.settings").click();}, 2800);
        setTimeout(function(){$("div.item.s-av").click();}, 3600);
        setTimeout(function(){$("div.back").click();}, 4400);
        
                //Load the chat package again to account for any changes
        bot.loadChat();

    }

    //Change the bots default settings and make sure they are loaded on launch

    localStorage.setItem("basicBotsettings", JSON.stringify({
        botName: "Larrie The Bot",
        language: "english",
        chatLink: "https://rawgit.com/SirLydian/basicBot/master/lang/en.json",
        maximumAfk: 60,
        afkRemoval: true,
        maximumDc: 60,
        bouncerPlus: false,
        lockdownEnabled: false,
        lockGuard: false,
        maximumLocktime: 10,
        cycleGuard: true,
        maximumCycletime: 10,
        timeGuard: true,
        maximumSongLength: 7,
        autodisable: true,
        commandCooldown: 0,
        usercommandsEnabled: true,
        lockskipPosition: 2,
        lockskipReasons: [
            ["theme", "This song does not fit the room theme. "],
            ["op", "This song is on the OP list. "],
            ["history", "This song is in the history. "],
            ["sound", "The song you played had bad sound quality or no sound. "],
            ["nsfw", "The song you contained was NSFW (image or sound). "],
            ["unavailable", "The song you played was not available for some users. "]
        ],
        afkpositionCheck: 15,
        afkRankCheck: "ambassador",
        motdEnabled: false,
        motdInterval: 5,
        motd: "Temporary Message of the Day",
        filterChat: true,
        etaRestriction: false,
        welcome: false,
        opLink: "https://goo.gl/sF5Lma",
        rulesLink: "https://goo.gl/roLwJ",
        themeLink: "We only allow EDM Trap and the sub-genres of trap (such as trapstyle, Festival, neuro trap, chill-trap, future bass/beats, Jersey Club, dirty south, trill trap)!",
        fbLink: "https://www.facebook.com/OfficialTrapCity",
        youtubeLink: "http://youtube.com/trapcity",
        website: "https://trapplug.eu/",
        intervalMessages: [],
        messageInterval: 5,
        songstats: false,
        commandLiteral: "!",
        blacklists: {
            NSFW: "https://rawgit.com/SirLydian/basicBot-customization/master/blacklists/ExampleNSFWlist.json",
            OP: "https://rawgit.com/SirLydian/basicBot-customization/master/blacklists/ExampleOPlist.json"
        }
    }));
    //
    //Start the bot and extend it when it has loaded.
    $.getScript('https://rawgit.com/Yemasthui/basicBot/master/basicBot.js', extend);

}).call(this);
