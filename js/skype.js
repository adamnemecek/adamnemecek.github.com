// Copyright &copy; 2012 Skype and Microsoft
// Version: 1.1

var Skype = new function () {

    this.name = null;
    this.element = null;
    this.participants = ["echo123"];
    this.listParticipants = "false";
    this.video = "false";
    this.topic = null;
    this.listTopic = "false";
    this.imageSize = null;
    this.imageColor = null;

    this.useDetection = "true";
    this.protocol = "skype:";

    this.ui = ui;
    this.setImageAttributes = setImageAttributes;
    this.trimString = trimString;
    this.escapeString = escapeString;
    this.createDetectionFrame = createDetectionFrame;
    this.trySkypeUri_IE9_IE8 = trySkypeUri_IE9_IE8;
    this.trySkypeUri_IOS_Safari = trySkypeUri_IOS_Safari;
    this.trySkypeUri_Android_Firefox = trySkypeUri_Android_Firefox;
    this.trySkypeUri_Generic = trySkypeUri_Generic;
    this.SkypeClientDownloadUrl = "http://www.skype.com/download";
    this.installSkypeMsg = "Please install Skype application in order to make this call or send a message.";
    this.displayNotSupportedMsg = displayNotSupportedMsg;

    this.SkypeUriAssetMap = SkypeUriAssetMap;
    this.SkypeUriAssetColorMap = SkypeUriAssetColorMap;
    this.SkypeUriNameLinks = SkypeUriNameLinks;

    this.assetPrefix = "http://cdn.dev.skype.com/uri/";
    this.assetSizeArray = [10, 12, 14, 16, 32];
    this.assetSizeDefault = 16;
    this.assetMarginMinimum = 16;
    this.assetSize = this.assetSizeDefault;
    this.assetMargin = (this.assetSize >= this.assetMarginMinimum) ? this.assetSize : this.assetMarginMinimum;

    this.assetColorPathWhite = "_trans_"
    this.assetColorFontWhite = "white";
    this.assetColorPathSkype = "_";
    this.assetColorFontSkype = "#444444";
    this.assetColorPathDefault = this.assetColorPathSkype;
    this.assetColorFontDefault = this.assetColorFontSkype;
    this.assetColor = new this.SkypeUriAssetColorMap(this.assetColorPathDefault, this.assetColorFontDefault);

    this.assetSizeMap = new Object();
    this.assetSizeMap.size10 = new this.SkypeUriAssetMap(10, -19);
    this.assetSizeMap.size12 = new this.SkypeUriAssetMap(12, -20);
    this.assetSizeMap.size14 = new this.SkypeUriAssetMap(14, -20);
    this.assetSizeMap.size16 = new this.SkypeUriAssetMap(16, -20);
    this.assetSizeMap.size32 = new this.SkypeUriAssetMap(32, -41);

    this.focusLinks = new this.SkypeUriNameLinks("", "");
    this.callLinks = new this.SkypeUriNameLinks("call", "");
    this.videoLinks = new this.SkypeUriNameLinks("call", "");
    this.chatLinks = new this.SkypeUriNameLinks("chat", "");
    this.multiChatLinks = new this.SkypeUriNameLinks("chat", "");

    this.setImageAttributes(this.assetSizeDefault, "");

    this.analyzeSkypeUriInit = null;
    this.analyzeSkypeUriAction = null;
    this.analyzeSkypeUriRedirect = null;
    this.analyzeCrumbs = [];
    this.tryAnalyzeSkypeUriInit = tryAnalyzeSkypeUriInit;
    this.tryAnalyzeSkypeUriAction = tryAnalyzeSkypeUriAction;
    this.tryAnalyzeSkypeUriRedirect = tryAnalyzeSkypeUriRedirect;

    this.detectSkypeClientFrameId = null;

    this.detectedPlatform = "unknown";
    this.detectedBrowser = "unknown";

    this.isWin7 = false;
    this.isWin8 = false;
    this.isOSX_SnowLeopard = false; // 10.6.8
    this.isOSX_MountainLion = false; // 10.8

    this.isWinPhone8 = false;
    this.isAndroid = false;
    this.isAndroid_Gingerbread = false; // 2.3
    this.isAndroid_IceCream = false; // 4.0
    this.isAndroid_JellyBean = false; // 4.1
    this.isIOS6 = false;
    this.isIOS5 = false;
    this.isIOS4 = false;

    this.isIPhone = false;
    this.isIPad = false;
    this.isIPod = false;

    this.isIE10 = false;
    this.isIE9 = false;
    this.isIE8 = false;
    this.isIE7 = false;
    this.isIE6 = false;
    this.isFF = false;
    this.isAndroidBrowser = false;
    this.isChrome = false;
    this.isSafari = false;

    if (navigator.userAgent.indexOf("Windows NT 6.1") != -1) { this.isWin7 = true; this.detectedPlatform = "Windows 7"; }
    else if (navigator.userAgent.indexOf("Windows NT 6.2") != -1) { this.isWin8 = true; this.detectedPlatform = "Windows 8"; }
    else if (navigator.userAgent.indexOf("Mac OS X 10_7") != -1) { this.isOSX_SnowLeopard = true; this.detectedPlatform = "OSX 10.7"; }
    else if (navigator.userAgent.indexOf("Mac OS X 10.8") != -1) { this.isOSX_MountainLion = true; this.detectedPlatform = "OSX 10.8"; }  // Safari UA
    else if (navigator.userAgent.indexOf("Mac OS X 10_8") != -1) { this.isOSX_MountainLion = true; this.detectedPlatform = "OSX 10.8"; }  // FF UA

    else if (navigator.userAgent.indexOf("Windows Phone 8") != -1) { this.isWinPhone8 = true; this.detectedPlatform = "Windows Phone 8"; }
    else if (navigator.userAgent.indexOf("Android") != -1) { this.isAndroid = true; this.detectedPlatform = "Android"; }
    else if (navigator.userAgent.indexOf("Android 2.3") != -1) { this.isAndroid_Gingerbread = true; this.detectedPlatform = "Android 2.3"; }
    else if (navigator.userAgent.indexOf("Android 4.0") != -1) { this.isAndroid_IceCream = true; this.detectedPlatform = "Android 4.0"; }
    else if (navigator.userAgent.indexOf("Android 4.1") != -1) { this.isAndroid_JellyBean = true; this.detectedPlatform = "Android 4.1"; }
    else if (navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i)) { this.isIOS6 = true; this.detectedPlatform = "iOS6"; }
    else if (navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i)) { this.isIOS5 = true; this.detectedPlatform = "iOS5"; }
    else if (navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i)) { this.isIOS4 = true; this.detectedPlatform = "iOS4"; }

    if (navigator.userAgent.indexOf("iPhone") != -1) { this.isIPhone = true; this.detectedPlatform = "iPhone " + this.detectedPlatform; }
    else if (navigator.userAgent.indexOf("iPad") != -1) { this.IsPad = true; this.detectedPlatform = "iPad " + this.detectedPlatform; }
    else if (navigator.userAgent.indexOf("iPod") != -1) { this.IsPod = true; this.detectedPlatform = "iPod " + this.detectedPlatform; }

    if (navigator.userAgent.indexOf("MSIE 10") != -1) { this.isIE10 = true; this.detectedBrowser = "Internet Explorer 10"; }
    else if (navigator.userAgent.indexOf("MSIE 9") != -1) { this.isIE9 = true; this.detectedBrowser = "Internet Explorer 9"; }
    else if (navigator.userAgent.indexOf("MSIE 8") != -1) { this.isIE8 = true; this.detectedBrowser = "Internet Explorer 8"; }
    else if (navigator.userAgent.indexOf("MSIE 7") != -1) { this.isIE7 = true; this.detectedBrowser = "Internet Explorer 7"; }
    else if (navigator.userAgent.indexOf("MSIE 6") != -1) { this.isIE6 = true; this.detectedBrowser = "Internet Explorer 6"; }
    else if (navigator.userAgent.indexOf("Firefox") != -1) { this.isFF = true; this.detectedBrowser = "Firefox"; }
    else if (navigator.userAgent.indexOf("Chrome") != -1) { this.isChrome = true; this.detectedBrowser = "Chrome"; } // precedes AndroidBrowser due to similar UA
    else if (navigator.userAgent.indexOf("Mobile Safari") != -1 && this.isAndroid) { this.isAndroidBrowser = true; this.detectedBrowser = "Mobile Safari"; }
    else if (navigator.userAgent.indexOf("Safari") != -1) { this.isSafari = true; this.detectedBrowser = "Safari"; }

    if (this.isAndroid) {
        this.SkypeClientDownloadUrl = "market://details?id=com.skype.raider";
    } else if (this.isIOS6 || this.isIOS5 || this.isIOS4) {
        this.SkypeClientDownloadUrl = "itms-apps://itunes.com/apps/skype";
    }

    function displayNotSupportedMsg() {
        alert("Sorry this device doesn't support Skype Buttons yet. Please add " + this.participants[0] +  " as a contact in your Skype Client to MAKE this call.");
    }

    // Check if the analyze method for uri init is loaded, run if it is
    function tryAnalyzeSkypeUriInit() {
        if (!this.analyzeSkypeUriInit && typeof analyzeSkypeUriInit == 'function') {
            this.analyzeSkypeUriInit = analyzeSkypeUriInit;
        }

        if (typeof this.analyzeSkypeUriInit == 'function') {
            this.analyzeSkypeUriInit();
        } else {
            var _t = {};
            _t.prop1 = "type: " + "init (pre script load)";
            _t.prop2 = "domain: " + document.domain;
            _t.prop3 = "image size / color: " + this.imageSize + " / " + this.imageColor;
            _t.prop4 = "video / list participants / list topic: " + this.video + " / " + this.listParticipants + " / " + this.listTopic;
            _t.prop5 = "target(s): " + this.participants;
            _t.prop6 = "user agent: " + navigator.userAgent;
            _t.prop7 = "app version: " + navigator.appVersion;
            _t.prop8 = "detected platform: " + this.detectedPlatform;
            _t.prop9 = "detected browser: " + this.detectedBrowser;
            this.analyzeCrumbs.push(_t);
        }
    }

    // Check if the analyze method for call action is loaded, run if it is
    function tryAnalyzeSkypeUriAction() {
        if (!this.analyzeSkypeUriAction && typeof analyzeSkypeUriAction == 'function') {
            this.analyzeSkypeUriAction = analyzeSkypeUriAction;
        }

        if (typeof this.analyzeSkypeUriAction == 'function') {
            this.analyzeSkypeUriAction();
        } else {
            var actionType = "call";
            if (this.name == "chat") actionType = "chat";
            var _t = {};
            _t.prop1 = "type: " + actionType + " (pre script load)";
            _t.prop2 = "domain: " + document.domain;
            _t.prop3 = "image size / color: " + this.imageSize + " / " + this.imageColor;
            _t.prop4 = "video / list participants / list topic: " + this.video + " / " + this.listParticipants + " / " + this.listTopic;
            _t.prop5 = "target(s): " + this.participants;
            _t.prop6 = "user agent: " + navigator.userAgent;
            _t.prop7 = "app version: " + navigator.appVersion;
            _t.prop8 = "detected platform: " + this.detectedPlatform;
            _t.prop9 = "detected browser: " + this.detectedBrowser;
            this.analyzeCrumbs.push(_t);
        }
    }

    // Check if the analyze method for uri redirection is loaded, run if it is
    function tryAnalyzeSkypeUriRedirect() {
        if (!this.analyzeSkypeUriRedirect && typeof analyzeSkypeUriRedirect == 'function') {
            this.analyzeSkypeUriRedirect = analyzeSkypeUriRedirect;
        }

        if (typeof this.analyzeSkypeUriRedirect == 'function') {
            this.analyzeSkypeUriRedirect();
        } else {
            var _t = {};
            _t.prop1 = "type: " + "redirect (pre script load)";
            _t.prop2 = "domain: " + document.domain;
            _t.prop3 = "image size / color: " + this.imageSize + " / " + this.imageColor;
            _t.prop4 = "video / list participants / list topic: " + this.video + " / " + this.listParticipants + " / " + this.listTopic;
            _t.prop5 = "target(s): " + this.participants;
            _t.prop6 = "user agent: " + navigator.userAgent;
            _t.prop7 = "app version: " + navigator.appVersion;
            _t.prop8 = "detected platform: " + this.detectedPlatform;
            _t.prop9 = "detected browser: " + this.detectedBrowser;
            this.analyzeCrumbs.push(_t);
        }
    }

    // Map entry associating the "call"/"chat" asset size with the vertical offset necessary to align
    // the asset with any following list of participants and/or topic string text.
    //
    // Arguments
    // =========
    // fontSize - the asset size in pixels
    // verticalOffset -- the required vertical offset (unsigned) in pixels
    //
    function SkypeUriAssetMap(size, verticalOffset) {
        this.size = size;
        this.verticalOffset = verticalOffset;
    }

    // Map entry detailing the current color values for the "call"/"chat" assets.
    //
    // Arguments
    // =========
    // path - the path component depicting the currently specified color for the asset, which must be one of the
    //        this.assetColorPathxxx values
    // font  - the font color specification (as required by style="color:...") for any following list of
    //         participants and/or topic string text, which must be one of the
    //         this.assetColorFontxxx values
    //
    function SkypeUriAssetColorMap(path, font) {
        this.path = path;
        this.font = font;
    }

    // Map entry detailing the asset path for a particular Skype URI name.
    //
    // Arguments
    // =========
    // name - the Skype URI name, for example, "call"
    // linkImage  - the associated asset path
    //
    function SkypeUriNameLinks(name, linkImage) {
        this.name = name;
        this.linkImage = linkImage;
    }

    // Based on the information in the specified Skype instance (typically JSON):
    //  1. Set the presentation attributes - size and color.
    //  2. Find the node that will contain our generated Skype URI link and
    //     associated image and/or text (element).
    //  3. Parse out the participants (participants).
    //  4. Construct the Skype URI:
    //      a. Set the scheme.
    //      b. Concatenate any targets.
    //      c. Concatenate any explicit Skype URI name (type designation), such as "call" or "chat".
    //      d. Concatenate any name-specific arguments (video, topic).
    //  5. Create an anchor element.
    //  6. Set the anchor's href attribute value to:
    //      o the generated Skype URI if "missing" Skype client detection is disabled.
    //      o "javascript:" with the generated Skype URI as part of an onclick handler
    //        if "missing" Skype client detection is disabled.
    //  7. Create the anchor's associated nodes:
    //      a. create an image element with the appropriate src, alt, and style attributes.
    //      b. Append the image element as a child of the anchor.
    //  8. Create a paragraph element to contain the link and associated image and/or text.
    //  9. Append the anchor and any image nodes to the paragraph.
    // 10. Create and append a TextNode consisting of the any participant names and/or
    //     topic to the paragraph, as requested.
    // 11. Append the paragraph containing the anchor as a child of to the specified "containing" node.
    //
    // Arguments
    // =========
    //  skypeUri:
    //     a JSON representation of a Skype URI object, which defines the type of Skype URI, its targets,
    //     name-specific arguments, and where/how to generate it on the webpage. Specifically:
    //      o name - the name of the Skype URI ("call", or "chat"), or omitted/null/the "empty" string if
    //               the Skype URI is implied (currently "focus" if no participants, and an implied
    //               "call" if at least one participant).
    //      o element - "id" attribute value of the element that will contain the generated Skype URI
    //                  link (typically a "div" tag), or omitted/null/the "empty" string to simply
    //                  generate the Skype URI with out embedding a link on the webpage, for example, to
    //                  use in a drag-and-drop context.
    //      o participants - an array of Skype Names and/or phone numbers. Omitted/null/the "empty" string
    //                       implies "focus" (implied Skype URI); cannot be empty otherwise. However, embedded
    //                       null/"empty" array members are silently skipped.
    //      o listParticipants - whether to list the participant Skype Names and/or phone numbers immediately following the
    //                           associated button. Only a value of "true" results in its being listed.
    //      o video - "true" to enable the sender's video at the start of the call; "false" or omitted otherwise.
    //                Ignored if name is not an explicit "call". Note that some Skype clients will fail the
    //                Skype URI if the sole participant is not video-capable.
    //      o topic - topic string for a conference call, GVC, or multichat. Ignored if there are fewer than
    //                two participants, it's null/the "empty" string, or "name" is not an explict "call" or "chat".
    //      o listTopic - whether to list the topic string immediately following the
    //                    associated button. Only a value of "true" results in its being listed.
    //      o imageSize - the size (in pixels) of the assets:
    //         * undefined, null, or the empty string -- use the default asset size.
    //         * a supported size -- use it.
    //         * an unsupported size -- use the default asset size, and post an alert for
    //                                  the unsupported size.
    //      o imageColor - the text color of the assets.
    //        Recognized colors are:
    //         * undefined, null, or the empty string -- use the default color assets.
    //         * "skype" -- use the Skype color assets.
    //         * "black" -- use the black assets.
    //         * "white" -- use the white assets.
    //         * an unrecognized value -- use the default color asset, and post an alert for
    //                                    the unrecognized value.
    //
    // Returns
    // =======
    //  true on success, or false if an error occurred (implies "element" was omitted or not found, or "name" was not recognized).
    //
    function ui(skypeUri) {

        if ((skypeUri.participants !== undefined) && (skypeUri.participants !== null)) {
            this.participants = skypeUri.participants;
        }
        if ((skypeUri.listParticipants !== undefined) && (skypeUri.listParticipants !== null)) {
            this.listParticipants = skypeUri.listParticipants;
        }
        if ((skypeUri.video !== undefined) && (skypeUri.video !== null)) {
            this.video = skypeUri.video;
        }
        if ((skypeUri.listTopic !== undefined) && (skypeUri.listTopic !== null)) {
            this.listTopic = skypeUri.listTopic;
        }
        if ((skypeUri.imageSize !== undefined) && (skypeUri.imageSize !== null)) {
            this.imageSize = skypeUri.imageSize;
        }
        if ((skypeUri.imageColor !== undefined) && (skypeUri.imageColor !== null)) {
            this.imageColor = skypeUri.imageColor;
        }

        var tStr;

        // We must always have an explicit element!
        // Remember, an omitted argument has a value of undefined, not a value of null.
        tStr = this.trimString(skypeUri.element);
        if (tStr.length !== 0) {
            var uriParent = document.getElementById(tStr);
            if (uriParent === null) {
                alert("Sorry! Could not find Skype URI parent element: " + tStr + " ('" + skypeUri.element + "')");
                return (false);
            } else if (((skypeUri.name !== undefined) && (skypeUri.name !== null)) && ((skypeUri.participants === undefined) || (skypeUri.participants === null))) {
                alert("Error! Required member \"participants\" omitted or specified as null");
                return (false);
            }

        }
        else {
            alert("Error! Required member \"element\" (Skype URI parent element) omitted or specified as null");
            return (false);
        }

        // Set the assets size/color to use for this request
        this.setImageAttributes(skypeUri.imageSize, this.trimString(skypeUri.imageColor));

        // Concatenate the target Skype Names with the base Skype URI string, separating each with a semi-colon.
        // The Skype URI string always starts with the Skype scheme.
        if ((skypeUri.protocol !== undefined) && (skypeUri.protocol !== null)) {
            this.protocol = skypeUri.protocol;
        }
        var uriStr = this.protocol;

        var participantsStr = "";
        var participantsIdx = 0;
        var multiParticipants = false;
        if ((skypeUri.participants !== undefined) && (skypeUri.participants !== null)) {
            while (participantsIdx < skypeUri.participants.length) {
                if (skypeUri.participants[participantsIdx] !== null) {
                    tStr = this.trimString(skypeUri.participants[participantsIdx]);
                    if (tStr.length !== 0) {
                        if (participantsIdx !== 0) {
                            uriStr += ";";
                            participantsStr += ", ";
                            multiParticipants = true;
                        }
                        uriStr += tStr;
                        participantsStr += tStr;
                    }
                }
                participantsIdx++;
            }
        }

        // Concatenate the Skype URI name (if any) with the href string, preceeding it with a "?".
        // Re-set the button image if it's an implied audio call or explicit group chat.
        var uriName = this.focusLinks.name;
        var uriLinkImage = this.focusLinks.linkImage;
        var isExplicitCall = false;

        tStr = this.trimString(skypeUri.name);
        if (tStr.length !== 0) {
            uriName = tStr;
            if (uriName === this.callLinks.name) {
                isExplicitCall = true;
                // Assume an audio call for now...
                uriLinkImage = this.callLinks.linkImage;
            }
            else if (uriName === this.chatLinks.name) {
                if (multiParticipants) {
                    uriLinkImage = this.multiChatLinks.linkImage;
                }
                else {
                    uriLinkImage = this.chatLinks.linkImage;
                }
            }
            else {
                alert("Unrecognized Skype URI name: " + uriName + " ('" + skypeUri.name + "') -- " + this.callLinks.name + "/" + this.chatLinks.name);
                return (false);
            }
            uriStr += "?" + uriName;
        }
        else if (participantsStr.length > 0) {
            uriLinkImage = this.callLinks.linkImage;
        }

        // Concatenate the argument name/value pairs (if any) with the href string, preceeding each with an "&".
        // Re-set the button image if it's a video call.
        if (isExplicitCall) {
            tStr = this.trimString(skypeUri.video);
            if (tStr === "true") {
                uriLinkImage = this.videoLinks.linkImage;
                uriStr += "&video=" + tStr;
            }
        }

        var topicStr = null;
        if ((multiParticipants) &&
            ((isExplicitCall) || (uriName === this.chatLinks.name))) {
            tStr = this.trimString(skypeUri.topic);
            if (tStr.length > 0) {
                topicStr = tStr;
                uriStr += "&topic=" + escapeString(topicStr);
            }
        }

        if (skypeUri.useDetection === "false") {
            this.useDetection = "false";
        }

        // Use the Skype URI to create the anchor's onclick attribute
        // if the Skype client detection is enabled.  Otherwise, use the 
        // Skype URI directly as the anchor's href attribute.
        var uriAnchor = document.createElement("a");

        // no detection, use a regular href link
        if (!this.useDetection || (!this.isWinPhone8 && this.isIE10) || this.isIE7 || this.isIE6) {

            uriAnchor.setAttribute("href", uriStr);
            uriAnchor.setAttribute("onclick", "Skype.tryAnalyzeSkypeUriAction();");

        // no detection and display not-supported msg
        } else if ((this.isWinPhone8 && this.isIE10) || (this.isAndroid && this.isAndroidBrowser) || (this.isAndroid && this.isChrome)) {

            uriAnchor.setAttribute("href", "javascript://");
            uriAnchor.setAttribute("onclick", "Skype.tryAnalyzeSkypeUriAction(); Skype.displayNotSupportedMsg();");

        // using detection
        } else {

            tStr = "Skype.trySkypeUri_Generic";

            if (this.isIE9 || this.isIE8) {
                tStr = "Skype.trySkypeUri_IE9_IE8";
            }
            else if ((this.isIOS6 || this.isIOS5 || this.isOS4) && this.isSafari) {
                tStr = "Skype.trySkypeUri_IOS_Safari";
            }
            else if (this.isAndroid && this.isFF) {
                tStr = "Skype.trySkypeUri_Android_Firefox";
            }

            if (this.detectSkypeClientFrameId === null) {
                this.createDetectionFrame(uriParent);
            }

            uriAnchor.setAttribute("href", "javascript://");
            uriAnchor.setAttribute("onclick", "Skype.tryAnalyzeSkypeUriAction();" + (tStr + "('" + uriStr + "', '" + this.detectSkypeClientFrameId + "'); return false;"));
        }


        var uriImage = document.createElement("img");
        // Adjust the style attribute for link borders on your image or
        // to align your image with your text, or simply eliminate it.
        uriImage.setAttribute("src", uriLinkImage);
        uriImage.setAttribute("alt", uriLinkImage);
        uriImage.setAttribute("style", ("border:0; margin:" + this.assetMargin + "px; vertical-align:" + this.assetSizeMap[("size" + this.assetSize)].verticalOffset + "px"));
        uriAnchor.appendChild(uriImage);

        var uriPara = document.createElement("p");
        uriPara.setAttribute("id", (skypeUri.element + "_paraElement"));
        uriPara.setAttribute("style", ("font-size:" + (this.assetSize - 2) + "px; color:" + this.assetColor.font));

        uriPara.appendChild(uriAnchor);

        
        // Create and append any participant names and topic as the text of
        // the enclosing paragraph, if requested.
        // Can't have a topic without participants!
        tStr = null;
        if (participantsStr.length !== 0) {
            if (this.trimString(skypeUri.listParticipants) === "true") {
                tStr = " " + participantsStr;
            }
            if ((topicStr !== null) && (this.trimString(skypeUri.listTopic) === "true")) {
                if ((tStr === null) || (tStr.length === 0)) {
                    tStr = " RE: " + topicStr
                }
                else {
                    tStr += ("; RE: " + topicStr);
                }
            }
            // Somne browsers may display null unless blanked out
            if (tStr === null) {
                tStr = "";
            }
            uriPara.appendChild(document.createTextNode(tStr));
        }

        uriParent.appendChild(uriPara);

        this.tryAnalyzeSkypeUriInit();

        return (true);
    }

    // Update the URL size and/or color of the graphical assets (buttons).
    //
    // Arguments
    // =========
    //  size:
    //     The size (in pixels) to use for the assets:
    //      o undefined, null, or the empty string -- use the default asset size.
    //      o a supported size -- use it.
    //      o an unsupported size -- silently use the default size.
    //  color:
    //     The text color to use for the assets. Recognized colors are:
    //      o undefined, null, or the empty string -- use the default asset color.
    //      o "skype" -- use the Skype color assets.
    //      o "black" -- use the black assets.
    //      o "white" -- use the white assets.
    //      o an unrecognized value -- silently use the default color.
    function setImageAttributes(size, color) {

        this.assetSize = this.assetSizeDefault;
        this.assetMargin = (this.assetSize >= this.assetMarginMinimum) ? this.assetSize : this.assetMarginMinimum;
        var i;
        var j = this.assetSizeArray.length;
        for (i = 0; i < j; i++) {
            if (size === this.assetSizeArray[i]) {
                this.assetSize = size;
                break;
            }
        }
        this.assetMargin = (this.assetSize >= this.assetMarginMinimum) ? this.assetSize : this.assetMarginMinimum;

        this.assetColor.path = this.assetColorPathDefault;
        this.assetColor.font = this.assetColorFontDefault;
        if (color.length > 0) {
            if (color === "skype") {
                this.assetColor.path = this.assetColorPathSkype;
                this.assetColor.font = this.assetColorFontSkype;
            }
            else if (color === "white") {
                this.assetColor.path = this.assetColorPathWhite;
                this.assetColor.font = this.assetColorFontWhite
            }
        }

        this.focusLinks.linkImage = this.assetPrefix + "Skypeicon" + this.assetColor.path + this.assetSize + "px.png";
        this.callLinks.linkImage = this.assetPrefix + "callbutton" + this.assetColor.path + this.assetSize + "px.png";
        this.videoLinks.linkImage = this.assetPrefix + "callbutton" + this.assetColor.path + this.assetSize + "px.png";
        this.chatLinks.linkImage = this.assetPrefix + "chatbutton" + this.assetColor.path + this.assetSize + "px.png";
        this.multiChatLinks.linkImage = this.assetPrefix + "chatbutton" + this.assetColor.path + this.assetSize + "px.png";
    }

    // Trim trailing whitespace from a string, and return the resultant string.
    // For the purposes of this function, "whitespace" is defined as
    // space, tab, carriage return, and newline.
    //
    // Arguments
    // =========
    //  stringToTrim:
    //     The target string, which might be null.
    //
    // Returns
    // =======
    //  A copy of the input string with all trailing whitespace characters removed.
    //  An input string value that is undefined, null, or composed of all
    //  whitespace characters returns the "empty" string.
    //
    function trimString(stringToTrim) {

        // Handle any undefined or null input.
        if ((stringToTrim === undefined) || (stringToTrim === null)) {
            return ("");
        }

        var strLgth = stringToTrim.length;
        var strIdx = strLgth - 1;
        var foundNonWhiteSpaceChar = false;
        while ((!foundNonWhiteSpaceChar) && (strLgth > 0)) {
            switch (stringToTrim[strIdx]) {
                case ' ':
                case '\t':
                case '\n':
                case '\r':
                    strLgth--;
                    break;
                default:
                    foundNonWhiteSpaceChar = true;
                    break;
            }
            strIdx--;
        }

        if (strLgth > 0) {
            return (stringToTrim.substr(0, strLgth));
        }

        return ("");
    }

    // Escape any URL and path characters that might confuse the Skype client
    // when processing the Skype URI, that is:
    //	-- embedded whitespace characters escaped as %20
    //	-- colons escaped as %3A
    //  -- forward slashes escaped as %2F
    //  -- backward slashes escaped as %5C
    //
    function escapeString(stringToEscape) {

        // Handle any undefined or null input.
        if ((stringToEscape === undefined) || (stringToEscape === null)) {
            return ("");
        }

        var escapedStr = stringToEscape.replace(/\s/g, "%20");

        escapedStr = escapedStr.replace(/:/g, "%3A");

        escapedStr = escapedStr.replace(/\x2F/g, "%2F");

        return (escapedStr.replace(/\x5C/g, "%5C"));
    }

    // Create frame for use in detecting "missing" Skype client
    function createDetectionFrame(parentElement) {
        var d = new Date();
        this.detectSkypeClientFrameId = "_detectSkypeClient_" + d.getTime().toString();

        var uriFrame = document.createElement("iframe");
        uriFrame.setAttribute("style", "display:none;");
        uriFrame.setAttribute("id", this.detectSkypeClientFrameId);
        parentElement.appendChild(uriFrame);
    }

    
    function trySkypeUri_IE9_IE8(skypeUriString) {

        var t__skypeExists = false;
        var t__detectionWindow = window.open('', '_blank', 'width=100, height=100');

        var uriFrame = t__detectionWindow.document.createElement("iframe");
        uriFrame.setAttribute("src", skypeUriString);
        t__detectionWindow.document.body.appendChild(uriFrame);

        setTimeout(function () {
            try {
                t__detectionWindow.location.href;
                t__skypeExists = true;
            }
            catch (e) {
                // handle exceptions...
            }

            if (t__skypeExists) {
                t__detectionWindow.setTimeout('window.close()', 10);
            }
            else {
                t__detectionWindow.close();
                alert(Skype.installSkypeMsg);
                Skype.tryAnalyzeSkypeUriRedirect();
                window.location = Skype.SkypeClientDownloadUrl;
            }
        }, 100);
    }


    function trySkypeUri_IOS_Safari(skypeUriString, frameId) {

        var t_frame = document.getElementById(frameId);
        var t_focus = true;

        window.addEventListener("pagehide", function () {
            t_focus = false;
        }, false);

        
        if (t_frame !== null) {
            t_frame.src = skypeUriString;
        }

        setTimeout(function () {
            if (t_focus) {
                alert(Skype.installSkypeMsg);
                Skype.tryAnalyzeSkypeUriRedirect();
                window.location = Skype.SkypeClientDownloadUrl;
            }
        }, 2000);

    }

    function trySkypeUri_Android_Firefox(skypeUriString, frameId) {

        var isSupported = false;
        var t_frame = document.getElementById(frameId);

        if (t_frame !== null) {
            try {
                t_frame.contentWindow.location.href = skypeUriString;
                isSupported = true;
            } catch (e) {
                isSupported = false;
            }
        }

        setTimeout(function () {
            if (!isSupported) {
                alert(Skype.installSkypeMsg);
                Skype.tryAnalyzeSkypeUriRedirect();
                window.location = Skype.SkypeClientDownloadUrl;
            }
        }, 2000);


    }

    // FF, Chrome, Desktop Safari, and Generic
    function trySkypeUri_Generic(skypeUriString, frameId) {

        var t_focus = true;
        window.onblur = function () {
            t_focus = false;
        }

        var t_frame = document.getElementById(frameId);
        if (t_frame !== null) {
            t_frame.src = skypeUriString;
        }

        setTimeout(function () {
            if (t_focus) {
                alert(Skype.installSkypeMsg);
                Skype.tryAnalyzeSkypeUriRedirect();
                window.location = Skype.SkypeClientDownloadUrl;
            }
        }, 2000);
    }

}
