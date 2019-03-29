function DRect() {
    this.serverEl = document.getElementById("server");
    this.progressEl = document.getElementById("progress");

    this.init()
}

DRect.prototype.init = function () {
    var id = this.getID();

    if (id === undefined) {
        this.serverEl.classList.add("visible");
    } else {
        this.getData(id, this.populate);
    }
};

DRect.prototype.getID = function () {
    return location.hash.slice(1) || undefined;
};

DRect.prototype.getData = function (id, callback) {
    var myself = this;

    var url = "https://discordapp.com/api/guilds/" + id.toString() + "/widget.json";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            var responseJSON = JSON.parse(this.responseText);

            if (this.status === 200) {
                callback.call(myself, responseJSON);
            } else {
                callback.call(myself, {name: responseJSON.message || "Invalid ID", instant_invite: null})
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
};

DRect.prototype.populate = function (data) {
    this.serverEl.innerText = data.name;
    this.serverEl.classList.add("visible");

    if (data.instant_invite) {
        this.progressEl.classList.add("full");
        setTimeout(function () {
            //location.href = data.instant_invite;
        }, 3e3);
    }
};

drect = new DRect();