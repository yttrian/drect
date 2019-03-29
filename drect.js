function DRect() {
    this.init()
}

DRect.prototype.init = function () {
    var id = this.getID();

    if (id === undefined) return;

    this.getData(id, this.populate)
};

DRect.prototype.getID = function () {
    return location.hash.slice(1) || undefined;
};

DRect.prototype.getData = function (id, callback) {
    var url = "https://discordapp.com/api/guilds/" + id.toString() + "/widget.json";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var responseJSON = JSON.parse(this.responseText);

            callback(responseJSON);
        } else {
            callback({name: "Invalid ID", instant_invite: null})
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
};

DRect.prototype.populate = function (data) {
    document.getElementById("server").innerText = data.name;

    if (data.instant_invite) {
        document.getElementById("progress").classList.add("full");
        setTimeout(function () {
            location.href = data.instant_invite;
        }, 3e3);
    }
};

drect = new DRect();