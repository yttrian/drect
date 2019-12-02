function DRect() {
    this.serverEl = document.getElementById('server');
    this.progressEl = document.getElementById('progress');
    this.splashEl = document.getElementById('splash');

    this.init()
}

DRect.prototype.init = function () {
    var id = this.getID();

    if (id === undefined) {
        this.serverEl.classList.add('visible');
    } else {
        this.getData(id, this.populate);
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', {scope: '/'}).then(function () {
            console.log("Service Worker Registered");
        });
    }
};

DRect.prototype.getID = function () {
    return location.hash.slice(1) || undefined;
};

DRect.prototype.getData = function (id, callback) {
    var myself = this;

    function request(url, success, failure) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                success(this);
            }
        };
        xhr.onerror = failure;
        xhr.open('GET', url, true);
        xhr.send();
    }

    var widgetUrl = 'https://discordapp.com/api/guilds/' + id.toString() + '/widget.json',
        widgetSuccess = function (widgetResult) {
            var widgetResponseJSON = JSON.parse(widgetResult.responseText);

            if (widgetResult.status === 200) {
                var inviteId = widgetResponseJSON.instant_invite.split('/').pop(),
                    inviteDataUrl = 'https://discordapp.com/api/invites/' + inviteId,
                    inviteDataSuccess = function (inviteDataResult) {
                        var inviteDataResponseJSON = JSON.parse(inviteDataResult.responseText),
                            guildId = inviteDataResponseJSON.guild.id,
                            splashId = inviteDataResponseJSON.guild.splash;
                        widgetResponseJSON.splash = 'https://cdn.discordapp.com/splashes/' +
                            guildId + '/' + splashId + '.jpg?size=1536';

                        callback.call(myself, widgetResponseJSON);
                    },
                    inviteDataFailure = function () {
                        callback.call(myself, widgetResponseJSON);
                    };

                callback.call(myself, {name: widgetResponseJSON.name});
                request(inviteDataUrl, inviteDataSuccess, inviteDataFailure);
            } else {
                callback.call(myself, {name: widgetResponseJSON.message || 'Invalid ID'})
            }
        },
        widgetFailure = function () {
            callback.call(myself, {name: "Connection Error"});
        };

    request(widgetUrl, widgetSuccess, widgetFailure)
};

/**
 * Populates the display and starts a redirect if possible
 * @param data invite data (name, invite, splash?)
 */
DRect.prototype.populate = function (data) {
    var myself = this;

    this.serverEl.innerText = data.name;
    this.serverEl.classList.add('visible');

    if (data.instant_invite) {
        if (data.splash) {
            // Make sure splash is loaded before showing it
            var img = new Image();
            img.onload = function () {
                myself.splashEl.classList.add('show');
            };
            img.src = data.splash;
            this.splashEl.style.backgroundImage = 'url(' + data.splash + ')';
            if (img.complete) img.onload(undefined);
        }

        this.progressEl.classList.add('full');

        setTimeout(function () {
            location.href = data.instant_invite;
        }, 3e3);
    }
};

drect = new DRect();