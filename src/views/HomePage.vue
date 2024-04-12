<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div style="padding: 10px">
        <IonButton @click="openApp" type="button" mode="md" color="primary">
          IONIC Test
        </IonButton>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonButton, IonContent, IonPage} from '@ionic/vue';
import Gamification from "ionic-gamification-test";
import {ref} from "vue";
import {ScreenOrientation} from '@capacitor/screen-orientation';

Gamification.init({
  baseUrl: "https://thelogicalbanya.com/popupdemo/dashboard.php",
  clientID: "demo",
  key: "demo",
  userID: "100031",
  username: "TheLogicalBanya",
  keyString: "bR5z6*r$00p#Eno__odrEgeW",
  appId: 'app', /* pass div id in used index.html like  <body> <div id="app"></div>< /body> */
  // style: {
  //   height: 'calc(100vh - 70px)',
  //   top: '70px',
  // }
});
const isOpen = ref(false);

const openApp = async () => {
  try {
    await ScreenOrientation.lock({orientation: 'portrait'});
  } catch (e) {
    console.error(e.message)
  }

  await Gamification.run();
  isOpen.value = true;

  // for close gamification window
  const divElement = document.querySelector('.close_btn');
  divElement.addEventListener('click', async () => {
    await Gamification.close(divElement.dataset.id);
    isOpen.value = false;
    try {
      await ScreenOrientation.unlock();
    } catch (e) {
      console.error(e.message)
    }
  });

}
</script>
