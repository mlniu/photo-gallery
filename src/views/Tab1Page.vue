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
      
      <ExploreContainer name="Tab 1 pages" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import router from '@/router';

//退出登录
function outLogin(){
  router.push({path: '/'})
}
</script>
