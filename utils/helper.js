import * as Font from 'expo-font';

export async function loadFontAsync (){
  await Font.loadAsync({
    'UniviaPro-Black': require('../assets/fonts/UniviaPro-Black.otf'),
    'UniviaPro-Bold': require('../assets/fonts/UniviaPro-Bold.otf')
  });
}
