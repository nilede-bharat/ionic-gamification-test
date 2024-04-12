let config = {};
import AES256 from 'aes-everywhere';
import base64 from 'base-64';


const renderHtml = async (finalUrl) => {
    const dynamicContent = `
                <div onclick="customClickHandler('gamification_${config.id}')" 
                id="frame_close_${config.id}" 
                style="height: 36px; width: 33px;
                 position: absolute; right: 7px; top: 25px;z-index: 99999"></div>
                  <iframe
                id="frame_gamification_${config.id}" src="${finalUrl}"
                style="height:${config?.style?.height ?? '100vh'};width:100%;border:none;background: #f1f1f1"/>
        `;
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = dynamicContent;
    tempContainer.style.height = config?.style?.height ?? '100vh';
    tempContainer.style.width = config?.style?.width ?? '100%';
    tempContainer.style.zIndex = config?.style?.zIndex ?? '99999';
    tempContainer.style.top = config?.style?.top ?? '0px';
    tempContainer.style.left = config?.style?.left ?? '0px';
    tempContainer.style.position = 'absolute';
    tempContainer.style.backgroundColor = '#f1f1f1';
    tempContainer.id = `gamification_${config.id}`;

    // Append the content inside the first div
    const renderedContent = document.getElementById(config.appId);
    renderedContent.appendChild(tempContainer);
    // Append the entire structure to the body
    document.body.appendChild(renderedContent);

    const scriptElement = document.createElement('script');


    scriptElement.innerHTML = `
    function customClickHandler(id) {
        const dynamicDiv = document.getElementById(id);
        if (dynamicDiv) {
            dynamicDiv.parentNode.removeChild(dynamicDiv);
        }
    }
    
    
    document.addEventListener("DOMContentLoaded", function() {
    alert('ok')
    var myFrame = document.getElementById("frame_gamification_${config.id}");
    console.log(myFrame);
    myFrame.addEventListener("load", function() {
        var iframeDoc = myFrame.contentDocument || myFrame.contentWindow.document;
        var divElements = iframeDoc.getElementsByTagName("div");
        for (var i = 0; i < divElements.length; i++) {
            divElements[i].addEventListener("click", function() {
                alert("clicked");
            });
        }
    });
});

`;
    document.body.appendChild(scriptElement);
}

const closeApp = async () => {
    const dynamicDiv = document.getElementById(`gamification_${config.id}`);
    if (dynamicDiv) {
        dynamicDiv.parentNode.removeChild(dynamicDiv);
    }
}
const Gamification = {
    init: (data = {
        baseUrl: "https://thelogicalbanya.com/popupdemo/dashboard.php",
        clientID: "demo",
        key: "demo",
        userID: "100031",
        username: "TheLogicalBanya",
        keyString: "bR5z6*r$00p#Eno__odrEgeW",
        utm_param1: "",
        utm_param2: "",
        utm_param3: "",
        utm_param4: "",
        appId: 'root',
        style: {height: '100vh'}
    }) => {

        config = data;
        if (config.id) {
            config.id = config.id + 1;
        } else {
            config.id = 1;
        }
        return Gamification;
    },
    run: async () => {
        const newConfig = {
            clientID: config.clientID,
            key: config.key,
            userID: config.userID,
            username: config.username,
            utm_param1: config.utm_param1,
            utm_param2: config.utm_param2,
            utm_param3: config.utm_param3,
            utm_param4: config.utm_param4,
            utm_source: 'Android'
        };
        newConfig.utm_source = "Android";
        const encryptedData = AES256.encrypt(JSON.stringify(newConfig), config.keyString);
        const encode = base64.encode(encryptedData);
        const encodedData = encodeURIComponent(encode);
        const finalUrl = `${config.baseUrl}?data=${encodedData}`;
        await renderHtml(finalUrl);
        return Gamification;
    },
    close: async () => {
        await closeApp();
        return Gamification;
    }
}


export default Gamification;
