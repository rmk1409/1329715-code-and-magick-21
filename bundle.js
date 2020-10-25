(()=>{"use strict";window.util={getRandomInt:function(e){return Math.floor(Math.random()*Math.floor(e))},debounce:function(e){let t=null;return function(){t&&window.clearTimeout(t),t=setTimeout(e,500)}}},(()=>{const e=document.querySelector(".error-popup"),t=e.querySelector(".error-popup--msg"),n=e.querySelector(".error-popup--button");function i(){e.classList.add("error-popup--hidden"),n.removeEventListener("click",i)}window.error={onLoad:function(s){t.textContent=s,e.classList.remove("error-popup--hidden"),n.addEventListener("click",i)}}})(),(()=>{const e=["rgb(101, 137, 164)","rgb(241, 43, 107)","rgb(146, 100, 161)","rgb(56, 159, 117)","rgb(215, 210, 55)","rgb(0, 0, 0)"],t=["black","red","blue","yellow","green"],n=["#ee4830","#30a8ee","#5ce6c0","#e848d5","#e6e848"];window.colorGenerator={getRandomCoat:function(){return e[window.util.getRandomInt(e.length)]},getRandomEyes:function(){return t[window.util.getRandomInt(t.length)]},getRandomFireball:function(){return n[window.util.getRandomInt(n.length)]}}})(),(()=>{const e=document.querySelector(".setup"),t=document.querySelector(".upload");window.move={upload:t,onUploadMousedown:function(n){n.preventDefault();let i=!1;function s(t){t.preventDefault(),i=!0,e.style.top=e.offsetTop+t.movementY+"px",e.style.left=e.offsetLeft+t.movementX+"px"}document.addEventListener("mousemove",s),document.addEventListener("mouseup",(function e(){document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",e),i&&t.addEventListener("click",(function e(n){n.preventDefault(),t.removeEventListener("click",e)}))}))}}})(),(()=>{const e=document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item"),t=document.querySelector(".setup"),n=t.querySelector(".setup-similar-list"),i=t.querySelector(".setup-similar"),s=t.querySelector("input[name='coat-color']"),r=t.querySelector("input[name='eyes-color']"),o=t.querySelector("input[name='fireball-color']"),a=t.querySelector(".setup-wizard"),d=a.querySelector(".wizard-coat"),c=a.querySelector(".wizard-eyes"),l=t.querySelector(".setup-fireball-wrap"),u=window.util.debounce(v),h=window.util.debounce(v);let w="rgb(101, 137, 164)",m="black",f=[];function p(t){const n=e.cloneNode(!0);return n.querySelector(".setup-similar-label").textContent=t.name,n.querySelector(".wizard-coat").style.fill=t.colorCoat,n.querySelector(".wizard-eyes").style.fill=t.colorEyes,n}function y(e){let t=0;return t=w===e.colorCoat?t+10:t,t=m===e.colorEyes?t+1:t,t}function v(){f.sort(((e,t)=>y(t)-y(e)));const e=document.createDocumentFragment(),t=Math.min(f.length,4);for(let n=0;n<t;n++)e.appendChild(p(f[n]));n.innerHTML="",n.appendChild(e)}function g(e){e&&(f=Array.from(e),v())}function S(){const e=window.colorGenerator.getRandomCoat();d.style.fill=e,s.value=e,w=e,u()}function L(){const e=window.colorGenerator.getRandomEyes();c.style.fill=e,r.value=e,m=e,h()}function k(){const e=window.colorGenerator.getRandomFireball();l.style.backgroundColor=e,o.value=e}window.wizard={addSimilarData:function(){i.classList.remove("hidden"),window.backend.load(g,window.error.onLoad)},addListeners:function(){d.addEventListener("click",S),c.addEventListener("click",L),l.addEventListener("click",k)},removeListeners:function(){d.removeEventListener("click",S),c.removeEventListener("click",L),l.removeEventListener("click",k)}}})(),(()=>{const e=document.querySelector(".setup"),t=document.querySelector(".setup-open"),n=document.querySelector(".setup-open-icon"),i=e.querySelector(".setup-close"),s=e.querySelector(".setup-user-name"),r=e.querySelector(".setup-wizard-form");function o(){e.classList.remove("hidden"),window.addEventListener("keydown",d),i.addEventListener("keydown",c),i.addEventListener("click",l),window.wizard.addListeners(),window.move.upload.addEventListener("mousedown",window.move.onUploadMousedown),r.addEventListener("submit",u)}function a(){e.classList.add("hidden"),window.removeEventListener("keydown",d),i.removeEventListener("keydown",c),i.removeEventListener("click",l),window.wizard.removeListeners(),window.move.upload.removeEventListener("mousedown",window.move.onUploadMousedown),e.style.top="",e.style.left="",r.removeEventListener("submit",u)}function d(e){"Escape"===e.key&&document.activeElement!==s&&a()}function c(e){"Enter"===e.key&&a()}function l(){a()}function u(t){t.preventDefault(),window.backend.save(new FormData(r),(function(){e.classList.add("hidden")}),window.error.onLoad)}function h(){o()}function w(e){"Enter"===e.key&&o()}window.setup={run:function(){t.addEventListener("click",h),n.addEventListener("keydown",w)}}})(),(()=>{const e="black";function t(e,t,n,i,s,r){e.fillStyle=r,e.fillRect(t,n,i,s)}window.stat={render:function(n,i,s){!function(e){t(e,110,20,420,270,"rgba(0, 0, 0, 0.7)"),t(e,100,10,420,270,"white")}(n),function(t){t.fillStyle=e,t.textBaseline="hanging",t.font='16px "PT Mono"',t.fillText("Ура вы победили!",120,30),t.fillText("Список результатов:",120,50)}(n),function(t,n,i){const s=i.sort()[i.length-1];for(let r=0;r<n.length;r++){const o=n[r],a=i[r],d=140+90*r;t.fillStyle=e,t.fillText(o,d,250);const c=a/s*150,l=150-c+90;t.fillStyle="Вы"===o?"rgba(255, 0, 0, 1)":`hsla(240, 100%, 50%, ${Math.random()})`,t.fillRect(d,l,40,c),t.fillStyle=e,t.fillText(a.toFixed().toString(),d,l-20)}}(n,i,s)}}})(),(()=>{function e(e,t,n,i,s){const r=new XMLHttpRequest;r.timeout=1e4,"GET"===e&&(r.responseType="json"),r.addEventListener("load",(()=>function(e,t,n){const i=e.status;switch(i){case 200:t(e.response);break;default:n(`There is an error, status code is - ${i}.`)}}(r,t,n))),r.addEventListener("error",(()=>n("There is connection error"))),r.addEventListener("timeout",(()=>n("There is timeout error, passed more than 10 sec."))),r.open(e,i),s?r.send(s):r.send()}window.backend={load:function(t,n){e("GET",t,n,"https://21.javascript.pages.academy/code-and-magick/data")},save:function(t,n,i){e("POST",n,i,"https://21.javascript.pages.academy/code-and-magick",t)}}})(),window.wizard.addSimilarData(),window.setup.run(),window.GameConstants={Fireball:{size:22,speed:function(e){return e?2:5}||function(e){return e?2:5}},Wizard:{speed:3,width:70,getHeight:function(){return 93.59}||function(e){return 1.377*e},getX:function(e){return(e-70)/2}||function(e){return e/3},getY:function(e){return e/3}||function(e){return e-100}}},window.Game=function(){let e=300,t=700,n=["Кекс","Катя","Игорь"],i={},s="-reversed";i[0]={width:61,height:84,url:"img/wizard.gif"},i[0+s]={width:61,height:84,url:"img/wizard-reversed.gif"},i[1]={width:24,height:24,url:"img/fireball.gif"};let r={0:function(n,i,s){i.keysPressed.UP&&n.y>0&&(n.direction=-9&n.direction,n.direction=4|n.direction,n.y-=n.speed*s*2),i.keysPressed.UP||n.y<e-n.height&&(n.direction=-5&n.direction,n.direction=8|n.direction,n.y+=n.speed*s/3),i.keysPressed.LEFT&&(n.direction=-3&n.direction,n.direction=1|n.direction,n.x-=n.speed*s),i.keysPressed.RIGHT&&(n.direction=-2&n.direction,n.direction=2|n.direction,n.x+=n.speed*s),n.y<0&&(n.y=0),n.y>e-n.height&&(n.y=e-n.height),n.x<0&&(n.x=0),n.x>t-n.width&&(n.x=t-n.width)},1:function(e,n,i){1&e.direction&&(e.x-=e.speed*i),2&e.direction&&(e.x+=e.speed*i),(e.x<0||e.x>t)&&(e.state=1)}},o={CONTINUE:0,WIN:1,FAIL:2,PAUSE:3,INTRO:4},a={0:function(e){return e.garbage.filter((function(e){return 1===e.type})).filter((function(e){return e.x<10&&e.y>240}))[0]?o.WIN:o.CONTINUE}},d={0:function(n){return n.objects.push({direction:2,height:window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),speed:window.GameConstants.Wizard.speed,sprite:i[0],state:0,type:0,width:window.GameConstants.Wizard.width,x:window.GameConstants.Wizard.getX(t),y:window.GameConstants.Wizard.getY(e)}),n}},c=function(e){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._pauseListener=this._pauseListener.bind(this),this.setDeactivated(!1)};c.prototype={level:0,setDeactivated(e){this._deactivated!==e&&(this._deactivated=e,e?this._removeGameListeners():this._initializeGameListeners())},getInitialState:()=>({currentStatus:o.CONTINUE,garbage:[],lastUpdated:null,keysPressed:{ESC:!1,LEFT:!1,RIGHT:!1,SPACE:!1,UP:!1},levelStartTime:null,objects:[],startTime:null}),initializeLevelAndStart(e){(e=void 0===e||e)||!this.state?(this._imagesArePreloaded=void 0,this.state=this.getInitialState(),this.state=d[this.level](this.state)):this.state.currentStatus=o.CONTINUE,this.state.levelStartTime=Date.now(),this.state.startTime||(this.state.startTime=this.state.levelStartTime),this._preloadImagesForLevel(function(){this.render(),this._initializeGameListeners(),this.update()}.bind(this))},pauseLevel(e){e&&(this.state.currentStatus=e),this.state.keysPressed.ESC=!1,this.state.lastUpdated=null,this._removeGameListeners(),window.addEventListener("keydown",this._pauseListener),this._drawPauseScreen()},_pauseListener(e){if(32===e.keyCode&&!this._deactivated){e.preventDefault();let t=this.state.currentStatus===o.WIN||this.state.currentStatus===o.FAIL;this.initializeLevelAndStart(t),window.removeEventListener("keydown",this._pauseListener)}},_drawPauseScreen(){let e;switch(this.state.currentStatus){case o.WIN:if(window.stat.render){let e=this._generateStatistics(new Date-this.state.startTime),t=this._shuffleArray(Object.keys(e));return void window.stat.render(this.ctx,t,t.map((function(t){return e[t]})))}e="Вы победили Газебо!\nУра!";break;case o.FAIL:e="Вы проиграли!";break;case o.PAUSE:e="Игра на паузе!\nНажмите Пробел, чтобы продолжить";break;case o.INTRO:e="Добро пожаловать!\nНажмите Пробел для начала игры"}this._drawMessage(e)},_generateStatistics(e){let t={Вы:e};for(let i=0;i<n.length;i++){let s=e+(3e3*Math.random()-1500);s<1e3&&(s=1e3),t[n[i]]=s}return t},_shuffleArray(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}return e},_drawMessage(e){let t=this.ctx,n=function(e,n,i,s){t.beginPath(),t.moveTo(e,n),t.lineTo(e+10,n+s/2),t.lineTo(e,n+s),t.lineTo(e+i/2,n+s-10),t.lineTo(e+i,n+s),t.lineTo(e+i-10,n+s/2),t.lineTo(e+i,n),t.lineTo(e+i/2,n+10),t.lineTo(e,n),t.stroke(),t.closePath(),t.fill()};t.fillStyle="rgba(0, 0, 0, 0.7)",n(190,40,320,100),t.fillStyle="rgba(256, 256, 256, 1.0)",n(180,30,320,100),t.fillStyle="#000",t.font="16px PT Mono",e.split("\n").forEach((function(e,n){t.fillText(e,200,80+20*n)}))},_preloadImagesForLevel(e){if(void 0===this._imagesArePreloaded&&(this._imagesArePreloaded=[]),this._imagesArePreloaded[this.level])return void e();let t=Object.keys(i),n=t.length,s=this,r=function(t){let i=new Image(t.width,t.height);i.onload=function(){t.image=i,0==--n&&(s._imagesArePreloaded[s.level]=!0,e())},i.src=t.url};for(let e=0;e<t.length;e++)r(i[t[e]])},updateObjects(e){let t=this.state.objects.filter((function(e){return 0===e.type}))[0];this.state.keysPressed.SHIFT&&(this.state.objects.push({direction:t.direction,height:window.GameConstants.Fireball.size,speed:window.GameConstants.Fireball.speed(!!(1&t.direction)),sprite:i[1],type:1,width:window.GameConstants.Fireball.size,x:2&t.direction?t.x+t.width:t.x-window.GameConstants.Fireball.size,y:t.y+t.height/2}),this.state.keysPressed.SHIFT=!1),this.state.garbage=[];let n=this.state.objects.filter((function(t){return r[t.type](t,this.state,e),1!==t.state||(this.state.garbage.push(t),!1)}),this);this.state.objects=n},checkStatus(){if(this.state.currentStatus!==o.CONTINUE)return;this.commonRules||(this.commonRules=[function(e){return 1===e.objects.filter((function(e){return 0===e.type}))[0].state?o.FAIL:o.CONTINUE},function(e){return e.keysPressed.ESC?o.PAUSE:o.CONTINUE},function(e){return Date.now()-e.startTime>18e4?o.FAIL:o.CONTINUE}]);let e,t=this.commonRules.concat(a[this.level]),n=o.CONTINUE;for(;n===o.CONTINUE&&t.length;)e=t.shift(),n=e(this.state);this.state.currentStatus=n},setGameStatus(e){this.state.currentStatus!==e&&(this.state.currentStatus=e)},render(){this.ctx.clearRect(0,0,t,e),this.state.objects.forEach((function(e){if(e.sprite){let t=1&e.direction,n=i[e.type+(t?s:"")]||i[e.type];this.ctx.drawImage(n.image,e.x,e.y,e.width,e.height)}}),this)},update(){this.state.lastUpdated||(this.state.lastUpdated=Date.now());let e=(Date.now()-this.state.lastUpdated)/10;switch(this.updateObjects(e),this.checkStatus(),this.state.currentStatus){case o.CONTINUE:this.state.lastUpdated=Date.now(),this.render(),requestAnimationFrame(function(){this.update()}.bind(this));break;case o.WIN:case o.FAIL:case o.PAUSE:case o.INTRO:this.pauseLevel()}},_onKeyDown(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!0;break;case 39:this.state.keysPressed.RIGHT=!0;break;case 38:this.state.keysPressed.UP=!0;break;case 27:this.state.keysPressed.ESC=!0}e.shiftKey&&(this.state.keysPressed.SHIFT=!0)},_onKeyUp(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!1;break;case 39:this.state.keysPressed.RIGHT=!1;break;case 38:this.state.keysPressed.UP=!1;break;case 27:this.state.keysPressed.ESC=!1}e.shiftKey&&(this.state.keysPressed.SHIFT=!1)},_initializeGameListeners(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp)},_removeGameListeners(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)}},c.Verdict=o;let l=new c(document.querySelector(".demo"));return window.restartGame=function(e,t){i[0].url=e,i[0+s].url=t,l.initializeLevelAndStart(),l.setGameStatus(o.INTRO)},window.restartGame("img/wizard.gif","img/wizard-reversed.gif"),l}()})();