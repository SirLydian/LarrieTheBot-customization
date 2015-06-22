(function () {
    
    var fork = "SirLydian";
    
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
        //bot.commands.decommanddagewiledittenCommand.rank = 'user';
        bot.commands.kickCommand.rank = 'host';
        bot.commands.rouletteCommand.rank = 'host';
        bot.commands.killCommand.rank = 'manager';
        bot.commands.pingCommand.rank = 'bouncer';
        //bot.commands.lockskipCommand.command = 'randomcmd';
        
        function autowoott(){
            $('#woot').click();
        }
        API.on(API.ADVANCE, autowoott);
        
        function deleteWords(chat) {
        var msg = chat.message.toLowerCase();
        var _array = ["nigga", "niga", "nigger", "niqa", "niqqa", "negro", "niqua", "niggga", "niggr", "niggie", "niggi", "negr0", "n3gro", "n3gr0"];
            for (var i = 0; i < _array.length; i++) {
                if (msg.indexOf(_array[i]) != -1) {
                    API.moderateDeleteChat(chat.cid);
                    return;
                }
            }
        }
        API.on(API.CHAT, deleteWords);
        /*
        bot.commands.baconCommand = {
            command: 'bacon',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'user', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    API.sendChat("/me Bacon!!!");
                }
            }
        };
        */
        
        
        function calcMaxUsers(){
            var usersNow = API.getUsers().length; //5
            if(usersNow > localStorage.getItem("LarrieMaxUsers")){
                localStorage.setItem("LarrieMaxUsers", usersNow);
                localStorage.setItem("LarrieTimeMaxUsers", +new Date);
                var nowMaxUsers = new Date(parseInt(localStorage.getItem("LarrieTimeMaxUsers")));
                //console.log("New max users record: "+localStorage.getItem("maxUsers")+"!");
                //console.log(""+nowMaxUsers);
            }
        }
        
        bot.commands.maxUserCommand = {
            command: 'maxusers',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'manager', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    if (localStorage.getItem("LarrieTimeMaxUsers") === null){
                        //item not set
                        API.sendChat("Max users ever in this room: "+localStorage.getItem("LarrieMaxUsers")+"!");
                    } else {
                        //item set
                        var nowMaxUsers = new Date(parseInt(localStorage.getItem("LarrieTimeMaxUsers")));
                        API.sendChat("Max users ever in this room: "+localStorage.getItem("LarrieMaxUsers")+"! This has set on "+nowMaxUsers);
                    }
                }
            }
        };
        
        /*
        bot.commands.tastyplugCommand = {
        command: 'tastyplug',
        rank: 'user',
        type: 'exact',
        functionality: function(chat, cmd){
        if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
             if( !bot.commands.executable(this.rank, chat) ) return void (0);
                 else{
                     API.sendChat("/me Use TastyPlug to autowoot and have custom emotes, inline images and many more features! https://fungustime.pw/tastyplug/");
                 }
             }
        }
        */
        
        function msToStr(msTime){
            var ms, msg, timeAway;
            msg = '';
            timeAway = {
                'days': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            };
            ms = {
                'day': 24 * 60 * 60 * 1000,
                'hour': 60 * 60 * 1000,
                'minute': 60 * 1000,
                'second': 1000
            };
            if (msTime > ms.day) {
                timeAway.days = Math.floor(msTime / ms.day);
                msTime = msTime % ms.day;
            }
            if (msTime > ms.hour) {
                timeAway.hours = Math.floor(msTime / ms.hour);
                msTime = msTime % ms.hour;
            }
            if (msTime > ms.minute) {
                timeAway.minutes = Math.floor(msTime / ms.minute);
                msTime = msTime % ms.minute;
            }
            if (msTime > ms.second) {
                timeAway.seconds = Math.floor(msTime / ms.second);
            }
            if (timeAway.days !== 0) {
                msg += timeAway.days.toString() + 'd';
            }
            if (timeAway.hours !== 0) {
                msg += timeAway.hours.toString() + 'h';
            }
            if (timeAway.minutes !== 0) {
                msg += timeAway.minutes.toString() + 'm';
            }
            if (timeAway.minutes < 1 && timeAway.hours < 1 && timeAway.days < 1) {
                msg += timeAway.seconds.toString() + 's';
            }
            if (msg !== '') {
                return msg;
            } else {
                return false;
            }
        }
        
        /*test*/
 
        bot.commands.eventCommand = {
            command: 'event',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'user', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    var eventTime = 1433095200000;
                    var currentTime = Date.now();
                    var timeUntil = eventTime - currentTime;
                    var time = msToStr(timeUntil);
 
                    if (eventTime > currentTime){
                        return API.sendChat("[@" + chat.un + "] Trap City Music Festival Day 2 starts in " + time);
                    }
                    else {
                        API.sendChat("[@" + chat.un + "] There is no upcoming event.");
                    }
 
                }
            }
        };
    
        
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
            var UserCount = API.getUsers().length;
            if(WaitlistCount <= 50){
                var mehSkipCount = Math.round((WaitlistCount / 3) + 2);
                if(UserCount >= 50){
                    if(mehSkipCount < 8){
                            mehSkipCount = 8;
                    }
                } else {
                    if(mehSkipCount < 6){
                            mehSkipCount = 6;
                    }
                }
            }
            mehLimit = mehSkipCount;
            setTimeout(function(){
                API.sendChat("/me Mehs to skip: " + mehLimit);
            }, 2500);
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
                    API.sendChat("/me Bouncer+ enabled!");
                    //als je bouncerplus aanzet
                }else{
                    API.sendChat("/me Bouncer+ disabled!");
                    //als uitzet
                }
                bot.settings.bouncerPlus = newSetting;
            }
        }
        
        //check manager for bouncer+
        API.on(API.USER_JOIN, checkManagers);
        API.on(API.USER_JOIN, calcMaxUsers);
        API.on(API.USER_LEAVE, checkManagers);

        //Load the chat package again to account for any changes
        bot.loadChat();

    }

    //Change the bots default settings and make sure they are loaded on launch

    localStorage.setItem("basicBotsettings", JSON.stringify({
        botName: "Larrie The Bot",
        language: "english",
        chatLink: "https://rawgit.com/SirLydian/basicBot/master/lang/en.json",
        startupCap: 1, // 1-200
        startupVolume: 0, // 0-100
        startupEmoji: false, // true or false
        autowoot: true,
        smartSkip: true,
        cmdDeletion: true,
        maximumAfk: 60,
        roomLock: true,
        afkRemoval: true,
        maximumDc: 60,
        bouncerPlus: false,
        blacklistEnabled: false,
        lockdownEnabled: false,
        lockGuard: true,
        maximumLocktime: 10,
        cycleGuard: true,
        maximumCycletime: 10,
        voteSkip: false,
        voteSkipLimit: 10,
        timeGuard: true,
        maximumSongLength: 7,
        autodisable: true,
        commandCooldown: 0,
        usercommandsEnabled: true,
        skipPosition: 3,
        skipReasons: [
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
        opLink: "http://goo.gl/0zW2yj",
        rulesLink: "https://goo.gl/roLwJ",
        themeLink: "We only allow EDM Trap and the sub-genres of trap (such as trapstyle, Festival, neuro trap, chill-trap, future bass/beats, Jersey Club, dirty south, trill trap)!",
        fbLink: "https://www.facebook.com/OfficialTrapCity",
        youtubeLink: "http://youtube.com/trapcity",
        website: null,
        intervalMessages: [],
        messageInterval: 5,
        songstats: false,
        commandLiteral: "!",
        blacklists: {
            NSFW: "https://rawgit.com/" + fork + "/LarrieTheBot-customization/master/blacklists/NSFWlist.json",
            OP: "https://rawgit.com/" + fork + "/LarrieTheBot-customization/master/blacklists/OPlist.json",
            BANNED: ""
        }
    }));

    //Start the bot and extend it when it has loaded.
    $.getScript('https://rawgit.com/Yemasthui/basicBot/master/basicBot.js', extend);

}).call(this);
