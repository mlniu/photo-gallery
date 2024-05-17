<template>
    <IonPage>
    <IonHeader>
        <IonToolbar>
            <IonTitle>登录</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
       
            <IonRow>
                <IonCol>
                    <IonList>
                        <IonItem>
                            <IonInput label="用户名" label-placement="stacked" name="username" type="text" v-model="userData.username" required></IonInput>
                        </IonItem>
                        <IonItem>  
                            <IonInput label="密码" label-placement="stacked" name="password" type="password" v-model="userData.password" required></IonInput>
                        </IonItem>
                    </IonList>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonButton expand="block" type="submit" @click="login">登录</IonButton>
                </IonCol>
            </IonRow>
       
    </IonContent>
</IonPage>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonLabel, IonInput, IonItem, IonButton, IonCol, IonList, IonRow, toastController
 } from '@ionic/vue';
 import { reactive, ref } from 'vue'
 import router from '@/router';
 import { loginTabs } from '@/api/index';

 const userData = ref<any>({
    username: '',
    password: ''
 });

 async function presentToast(msg: string){
    const toast = await toastController.create({
          message: msg,
          duration: 1500,
          position: 'top',
          color: 'light'
        });

        await toast.present();
 }

 function login(){
    console.log('data',userData.value)
    loginTabs(userData.value).then(res => {
        console.log('res',res)
        if(res){
            userData.value = {username: '',password: ''}
            router.push({path: '/tabs'})
            
        }
    }).catch(e => {
        presentToast(e);
    })
 }


</script>