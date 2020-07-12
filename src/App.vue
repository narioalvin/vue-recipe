<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
};
</script>

<style>
@import './styles/main.scss';

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@font-face {
  font-family: 'Pacifico';
  src: url('./assets/font/Pacifico-Regular.ttf');
  src: local('Pacifico Regular'), local('Pacifico-Regular'),
    url('./assets/font/Pacifico-Regular.ttf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./assets/font/Lato-Regular.ttf');
  src: local('Lato Regular'), local('Lato-Regular'),
    url('./assets/font/Lato-Regular.ttf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./assets/font/Lato-Bold.ttf');
  src: local('Lato Bold'), local('Lato-Bold'),
    url('./assets/font/Lato-Bold.ttf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

body {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
