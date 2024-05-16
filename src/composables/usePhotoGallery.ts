import { ref, onMounted, watch } from 'vue';


//capacitor原生方法
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';




import { Filesystem, Directory } from '@capacitor/filesystem';




import { Preferences } from '@capacitor/preferences';

//特定于移动端的逻辑
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

//照片库现在由一个可在 Web、Android 和 iOS 上运行的代码库组成

const photos = ref<UserPhoto[]>([]);

const PHOTO_STORAGE = 'photos';

//图片保存到文件系统中，但是我们需要快速访问那些图片，所以调用Capacitor 首选项 API 将照片数组存储在键值存储中。
const cachePhotos = () => {
  Preferences.set({
    key: PHOTO_STORAGE,
    value: JSON.stringify(photos.value),
  });
};

//监控图片变化，photos变化时触发cachePhotos
watch(photos, cachePhotos);

//从 Preferences 中检索照片数据，然后将每张照片的数据转换为 Base64 
//在移动设备上，我们可以直接指向文件系统上的每个照片文件并自动显示它们。然而，在网络上，我们必须将文件系统中的每个图片读取为 base64 格式。
const loadSaved = async () => {
  const photoList = await Preferences.get({ key: PHOTO_STORAGE });
  const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

  if (!isPlatform('hybrid')) {
    for (const photo of photosInPreferences) {
      const file = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data,
      });
      photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
    }
  }

  photos.value = photosInPreferences;
};

export const usePhotoGallery = () => {

    onMounted(loadSaved);
    const takePhoto = async () => {
        //没有特定于平台的代码（Web、iOS 或 Android）！Capacitor Camera 插件为我们抽象了这一点，只留下一个方法调用 - getPhoto() - 这将打开设备的相机并允许我们拍照。
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      const fileName = Date.now() + '.jpeg';
      const savedFileImage = await savePicture(photo, fileName);
      photos.value = [savedFileImage, ...photos.value];
    };

    //删除图片
    const deletePhoto = async (photo: UserPhoto) => {
      // Remove this photo from the Photos reference data array
      photos.value = photos.value.filter((p) => p.filepath !== photo.filepath);

      // delete photo file from filesystem
      const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
      });
    };
  
    return {
      takePhoto,
      photos,
      deletePhoto
    };
  };

  //定义照片类型数据
export interface UserPhoto{
    filepath: string;
    webviewPath?: string;
}

//文件系统 API 要求将写入磁盘的文件作为 base64 数据传入
const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  //使用 Capacitor 文件系统 API 将照片保存到文件系统。我们首先将照片转换为 base64 格式，然后将数据提供给文件系统的 writeFile 函数
const savePicture = async(photo: Photo, fileName: string): Promise<UserPhoto> => {
  let base64Data: string | Blob;
  //如果是 "hybrid"（Capacitor，原生运行时），则使用 readFile 方法将照片文件读取为 base64 格式。
  if (isPlatform('hybrid')) {
    const file = await Filesystem.readFile({
      path: photo.path!,
    });
    base64Data = file.data;
  } else {
    // 获取照片，读取为blob，然后转换为base64格式
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    base64Data = (await convertBlobToBase64(blob)) as string;
  }
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });
  if (isPlatform('hybrid')) {
    // 通过将“file://”路径重写为HTTP来显示新图像
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  } else {
    // 使用webPath显示新图像，而不是base64，因为它已加载到内存中
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }
}