<template>
  <div class="main">
    <div class="main__content">
      <div class="content__title">Добро пожаловать!</div>
      <nav class="content__nav">
        <router-link class="nav__link" to="/users">Заметки</router-link>
        <router-link class="nav__link" to="/history">История</router-link>
        <router-link class="nav__link" to="/historyAdd">История добавлений</router-link>
        <router-link class="nav__link" to="/historyDel">История удалений</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.main {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  background: url(../img/1.jpg) no-repeat center;
  height: 100%;
  width: 100%;
}
a{
  text-decoration: none;
}
.content__title{
padding-top: 100px;
  font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 62px;
line-height: 39px;
/* identical to box height */
color: aliceblue;
text-align: center;
}
.content__nav {
  margin-top: 35%;
  
  text-align: center;
}
.nav__link{
  padding: 15px;
  background-color: #474747 ;
}
.nav__link {
  width: 230px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
.nav__link {
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
}
.nav__link:after {
  position: absolute;
  content: " ";
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   background-color: #1fd1f9;
background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
  transition: all 0.3s ease;
}
.nav__link:hover {
  background: transparent;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  color: #fff;
}
.nav__link:hover:after {
  -webkit-transform: scale(2) rotate(180deg);
  transform: scale(2) rotate(180deg);
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}
</style>
