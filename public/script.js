$(document).ready(function() {
    var key = 0;
    $("#notification").click(function() {
        if (key == 1) {
            document.getElementById("notification").style.color = "tomato";
            document.getElementById("hidden_notification").checked = false;
            key = 0;
        } else if (key == 0) {
            document.getElementById("notification").style.color = "green";
            document.getElementById("hidden_notification").checked = true;
            key = 1;
        }
    });

    var socket = io.connect();
    var username = prompt("Kullanıcı Adınızı Belirleyin Lütfen", "");
    $("#message").keypress(function() {
        var key = event.keycode || event.which;
        if (key == 13) {
            var message = $("#message").val();
            if (message != "") {
                socket.emit("send", {
                    "username": username,
                    "message": message
                });
            }
        }
    });
    socket.on("getMessage", function(data) {
        var status = document.getElementById("hidden_notification").checked;
        if (status == true) {
            var audio = new Audio("https://notificationsounds.com/soundfiles/1728efbda81692282ba642aafd57be3a/file-sounds-1101-plucky.mp3");
            audio.play();
        }
        $(".messages").append("<li class='message left appeared'><div class='avatar'></div><div class='text_wrapper'><div class='text'>" + data.username + "<br>" + data.message + "</div></div></li>");
        $("#message").val("");
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    });
});
