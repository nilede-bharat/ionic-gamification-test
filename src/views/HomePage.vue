<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div style="padding: 10px">
        <IonButton @click="openApp" type="button" mode="md" color="primary">
          Test
        </IonButton>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonButton, IonContent, IonPage} from '@ionic/vue';
import Gamification from "ionic-gamification-test";

Gamification.init({
  baseUrl: "https://thelogicalbanya.com/popupdemo/dashboard.php",
  clientID: "demo",
  key: "demo",
  userID: "100031",
  username: "TheLogicalBanya",
  keyString: "bR5z6*r$00p#Eno__odrEgeW",
  appId: 'app' /* pass div id in used index.html like  <body> <div id="app"></div>< /body> */
});

const openApp = () => {
  Gamification.run();
}
</script>
