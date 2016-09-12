/**
 * Created by Hakan on 2/14/2016.
 */
init();
var defaulList;

function init() {
    var target = document.querySelector('div.float-right');

    var div = document.createElement('div');
    div.id = 'categoric_confirm';
    div.className = 'btn btn-sm categoric';
    div.text = 'Categorize all';
    div.textContent = 'Categorize all';
    div.style = 'margin-right:5px';
    div.addEventListener("click", categorize);

    var child = target.childNodes.item(1);
    target.insertBefore(div, child);
}

function createHeaders(key, notif) {

    var headerIssue = document.createElement("li");
    headerIssue.className = 'list-group-item js-notification js-navigation-item';
    var boldTextIssue = document.createElement("h3");
    boldTextIssue.text = key;
    boldTextIssue.textContent = key;
    headerIssue.appendChild(boldTextIssue);
    notif.push(headerIssue);

}

function categorize() {

    var btn = document.querySelector("div.categoric");
    if (btn.textContent == "Categorize all") {

        btn.textContent = 'Revert categories';

        Array.prototype.forEach.call(document.querySelectorAll('.notifications-list'), function (box) {

            defaulList = new Array(document.querySelectorAll('.notifications-list').length);

            Array.prototype.forEach.call(box.querySelectorAll('.notifications'), function (list, indise) {

                var issues = [], prequest = [], misc = [];
                createHeaders('Issues', issues);
                createHeaders('Pull Request', prequest);
                createHeaders('Misc', misc);

                var listCount = list.querySelectorAll('.list-group-item').length;
                defaulList[indise] = new Array(listCount);

                Array.prototype.forEach.call(list.querySelectorAll('.list-group-item'), function (unread, itemIndex) {

                    var name = unread.className;
                    if (name.contains('unread')) {
                        list.removeChild(unread);
                        if (name.contains('pull-request-notification')) {
                            prequest.push(unread);
                        }
                        else if (name.contains('issue-notification')) {
                            issues.push(unread);
                        }
                        else {
                            misc.push(unread);
                        }
                    }

                    defaulList[indise][itemIndex] = unread;
                    if ((listCount - 1)  == itemIndex) {
                        appendNotifications(list, issues)
                        appendNotifications(list, prequest)
                        appendNotifications(list, misc)

                        if (name.contains('notifications-more')) {
                            list.removeChild(unread)
                            list.appendChild(unread)
                        }
                    }
                })
            })
        })
    }
    else {
        btn.textContent = 'Categorize all';
        Array.prototype.forEach.call(document.querySelectorAll('.notifications'), function (list, index) {
            list.innerHTML = '';
            for (var inner = 0; inner < defaulList[index].length; inner++) {
                list.appendChild(defaulList[index][inner]);
            }
        })
    }

}

function appendNotifications(list, items) {
    if (items.length != 1) {
        for (var i = 0; i < items.length; i++) {
            list.appendChild(items[i]);
        }
    }
}

String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};