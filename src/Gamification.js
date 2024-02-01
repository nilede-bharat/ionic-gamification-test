let config = {};
import AES256 from 'aes-everywhere';
import base64 from 'base-64';


const renderHtml = async (finalUrl) => {
    const dynamicContent = `
                <div onclick="customClickHandler('gamification_${config.id}')" id="frame_close_${config.id}" style="height: 36px; width: 33px;
                 position: absolute; background: 'red'; background-color: 'red'; right: 7px; top: 25px;"></div>
                  <iframe
                id="frame_gamification_${config.id}" src="${finalUrl}"
                style="height: 100vh;width:100%;border:none;"/>
        `;
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = dynamicContent;
    tempContainer.style.height = '100vh';
    tempContainer.style.width = '100%';
    tempContainer.style.zIndex = '99999';
    tempContainer.style.top = '0px';
    tempContainer.style.left = '0px';
    tempContainer.style.position = 'absolute';
    tempContainer.id = `gamification_${config.id}`
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
        appId: 'root'
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
