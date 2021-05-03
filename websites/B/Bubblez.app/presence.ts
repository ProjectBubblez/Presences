const presence = new Presence({
    clientId: "751981945881231430"
});
function pathIncludes(string) {
    return document.location.pathname.toLowerCase().includes(string);
}
presence.on("UpdateData", async () => {
    let detailsraw = "";
    const privacy = await presence.getSetting("privacy");
    if (!privacy) {
        detailsraw = "Login" == document.querySelector("b.user-data").textContent.replace(/[\s\n]+/gi, "") ? "Not logged in." : "Logged in as " + document.querySelector("b.user-data").textContent.replace(/[\s\n]+/gi, "") + ".";
    }else{
        detailsraw = "Privacy mode activated.";
    }
    const Data = {
        largeImageKey: "bubblez-logo",
        smallImageKey: "rebrand",
        smallImageText: "Bubblez.app | v1.0.0",
        details: detailsraw
    }, path = window.location.pathname, queryString = window.location.search, urlParams = new URLSearchParams(queryString), trimString = urlParams.toString().substring(0, urlParams.toString().length - 1);
    switch (true) {
        case pathIncludes("/home"):
            Data.state = "Reading some posts.";
            break;
        case pathIncludes("/postedit"):
            Data.state = "Editing a post.";
            break;
        case pathIncludes("/post"):
            if (!privacy) {
                Data.state = "Post by " + document.querySelector("a.post-data").textContent.replace(/[\s\n]+/gi, "") + ".";
            }else{
                Data.state = "Looking at a post."
            }
            break;
        case pathIncludes("/p"):
            if (!privacy) {
                Data.state = trimString + "'s profile.";
            }else{
                Data.state = "Viewing a profile.";
            }
            break;
        case pathIncludes("/register"):
            Data.details = "User register.";
            break;
        case pathIncludes("/login"):
            Data.details = "User login.";
            break;
        case pathIncludes("/likedby"):
            Data.state = "Looking at likes.";
            break;
        case pathIncludes("/settings/"):
            Data.state = "Looking at settings | " + path.split("/")[2] + ".";
            break;
        case pathIncludes("/following"):
            Data.state = "Reading the following list.";
            break;
        case pathIncludes("/followers"):
            Data.state = "Reading the followers list.";
            break;
        case pathIncludes("/leaderboard"):
            Data.state = "Reading leaderboards.";
            break;
        case pathIncludes("/blogs"):
            Data.state = "Reading devlogs.";
            break;
        case pathIncludes("/tos"):
            Data.state = "Reading TOS.";
            break;
        case pathIncludes("/adminpanel/"):
            Data.state = "Browsing Adminpanel";
            break;
        case pathIncludes("/secret"):
            Data.state = "Found a Secret";
            break;
        default:
            Data.state = "Error 404";
    }
    presence.setActivity(Data);
});
