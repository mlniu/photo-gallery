<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1 TEST
          <ion-chip :outline="true" @click="outLogin">退出</ion-chip>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 12</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
    <IonContent>
      <ion-chip :outline="true" @click="test">Test CapacitorHttp</ion-chip>
      {{ tmp }}
    </IonContent>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import router from '@/router';
import { getAllData } from '@/httpApi';
import { ref } from 'vue'

//退出登录
function outLogin(){
  router.push({path: '/'})
}

let tmp = ref('bad');

function test(){
  getAllData().then(res => {
    console.log('res',res)
    tmp.value = res.data;
  })
}
</script>
