//version 1.8

const idx_small = 0;
const idx_big = 1;
const idx_img = 2;
const idx_loaded = 3;

const idxSmall = 0
const idxBig = 1;
const idxImg = 2;
const idxLoaded = 3;


const tbl_img = {
  img : [
  //small (gallery), big (view), obj: obj-img , bool:loaded, 
  ['small_01.png', '01.png', 0, 0],
  ['small_02.png', '02.png', 0, 0],
  ['small_03.png', '03.png', 0, 0],
  ['small_04.png', '04.png', 0, 0],
  ['small_05.png', '05.png', 0, 0],
  ['small_06.png', '06.png', 0, 0],
  ['small_07.png', '07.png', 0, 0],
  ['small_08.png', '08.png', 0, 0],
  ['small_09.png', '09.png', 0, 0],
  ['small_10.png', '10.png', 0, 0],

  ['small_11.png', '11.png', 0, 0],
  ['small_12.png', '12.png', 0, 0],
  ['small_13.png', '13.png', 0, 0],
  ['small_14.png', '14.png', 0, 0],
  ['small_15.png', '15.png', 0, 0],
  ['small_16.png', '16.png', 0, 0],
  ['small_17.png', '17.png', 0, 0],
  ['small_18.png', '18.png', 0, 0],
  ['small_19.png', '19.png', 0, 0],
  ['small_20.png', '20.png', 0, 0],
  
  ['small_21.png', '21.png', 0, 0],
  ['small_22.png', '22.png', 0, 0],
  ['small_23.png', '23.png', 0, 0],
  ['small_24.png', '24.png', 0, 0],
  ['small_25.png', '25.png', 0, 0],
  ['small_26.png', '26.png', 0, 0],
  ['small_27.png', '27.png', 0, 0],
  ['small_28.png', '28.png', 0, 0],
  ['small_29.png', '29.png', 0, 0],
  ['small_30.png', '30.png', 0, 0],
  
  ['small_31.png', '31.png', 0, 0],
  ['small_32.png', '32.png', 0, 0],
  ['small_33.png', '33.png', 0, 0],
  ['small_34.png', '34.png', 0, 0],
  ['small_35.png', '35.png', 0, 0],
  ['small_36.png', '36.png', 0, 0],
  ['small_37.png', '37.png', 0, 0],
  ['small_38.png', '38.png', 0, 0],
  ['small_39.png', '39.png', 0, 0],
  ['small_40.png', '40.png', 0, 0],

  ['small_41.png', '41.png', 0, 0],
  ['small_42.png', '42.png', 0, 0],
  ['small_43.png', '43.png', 0, 0],
  ['small_44.png', '44.png', 0, 0],
  ['small_45.png', '45.png', 0, 0],
  ['small_46.png', '46.png', 0, 0],
  ['small_47.png', '47.png', 0, 0],
  ['small_48.png', '48.png', 0, 0],
     
  ], //const tbl_img.img [small (gallery), big (view), obj: obj-img , bool:loaded]
  long_url : "https://adlap.github.io/Pielgrzymi/images/",

  loadImg: async function (idx, decoding='async') {
    this.img[idx][idxImg] = document.createElement('img');
    this.img[idx][idxImg].decoding = decoding; //'sync';
    this.img[idx][idxImg].src = this.long_url + this.img[idx][idxBig];

    const loadedImg = new Promise((resolve, reject) => {
      this.img[idx][idxImg].onload = () => {              
          console.log('loadImg: ',this);
          this.img[idx][idxLoaded] = 1;
          resolve(this.img[idx][idxImg]);       
      };
      this.img[idx][idxImg].onerror = () => {
        reject(new Error('loadImg err: nie mozna pobrac obrazka'));
      };
    });        
    return loadedImg;        
  },

  getImg: async function (idx, decoding='async') {
    const loadedImg = new Promise((resolve, reject) => {
      if( ! this.img[idx][idxLoaded]){
        if( this.img[idx][idxImg] === 0){          
          console.log('getImg: ', this);
          this.loadImg(idx, decoding)
          .then((val) => {resolve(val);})
          .catch( (err) => {
            console.log('getImg:', err);
            reject(new Error('getImg: ', idx ,'nie moge uzyskac obrazu z loadImg'));
          });
        }
        else {
          console.log('getImg err:', idx ,' img gotowy, a loaded nadal False');
          reject(new Error("getImg  err:", idx ," img gotowy, a loaded nadal False"));
        }
      }
      else {
        resolve(this.img[idx][idxImg]);
      }
    });
    printLoadedImgsTbl();    
    return loadedImg;
  },

}

const long_url = "https://adlap.github.io/Pielgrzymi/images/";



//creation of div tag for hidden images loaded in background
// const divHdIm = document.createElement.div;
// divHdIm.id = "divHiddenImages";
// divHdIm.style = '"style = "hidden; border:solid;" id="hiddenImgDiv"';
// document.appendChild(divHdIm);
// const hiddenImgDiv2 = gedElementByName("divHiddenImages");
const hiddenImgDiv = document.getElementById("obrazek_ukryty");
const listOfBufforedImg = document.getElementById("lista_zbuforowanych_obrazkow");

function printLoadedImgsTbl(){
  try{
    listOfBufforedImg.innerHTML = "";
    tbl_img.img.forEach( (el) => {
      //console.log("foreach.img: " , el[idxImg].toString());
      listOfBufforedImg.innerHTML += (el[idxImg].toString() != "0" ? "1": "0" ) + ", ";
    });
  }
  catch(err){
    console.log('img.foreach err: ', err);
  }
}

/* variable to controll preloading images */


//function: initlializing loading number images in background
async function loadImgsAsync(imgIdx, maxLeft, maxRight){
  /*
  return new Promise((resolve, reject) => {
    const stepR = 1;
    const stepL = -1;      
    resolve( () => {
      loadNextImg(currImgIdx, maxRight, stepR);
      loadNextImg(currImgIdx, maxLeft, stepL);
      return 0;
    });
    reject(new Error("loadImgsAsync err: nie moge zaladowac obrazka"));
  });
  */
  //ignorujemy zwracany niżej promise i wychodzimy bez czekania
  
  console.log("loadImgsAsync_STARTED");
  try{
    await imgs_load(imgIdx, maxLeft, maxRight);
  }
  catch(err){
    console.log('loadImgsAsync: ', {err});
  }
  console.log("loadImgsAsync_ENDED");
  
  return 0;  
}

//function: do loading images in background
async function imgs_load(currImgIdx, maxLeft, maxRight){      
  const stepR = 1;
  const stepL = -1;  
  try{
    loadNextImg(currImgIdx, maxRight, stepR);
    loadNextImg(currImgIdx, maxLeft, stepL);  
  }
  catch(err){
    console.log('imgs_load err: ', {err});    
  }
  return 0;
}

//recurrent loading number of images 
const loadNextImg = (curr, maxD, stepD) => { 
  
  if(maxD <= 0) return;

  if(stepD > 0){
    curr = (tbl_img.img.length -1) == curr ? curr = 0: curr += 1;
  }
  else 
  if(stepD < 0){
    curr = (0 == curr) ? curr = (tbl_img.img.length - 1): curr -= 1;
  }
  
  if(tbl_img.img[curr][idxLoaded] === 1) {
    loadNextImg(curr, maxD - 1, stepD)
  }
  else{
    console.log("image ", tbl_img.img[curr][idxBig], " start loading");        
    tbl_img.getImg(curr, 'sync')
    .then( (img1) => {
      //dla celow wizualizacji buforwoania - to nie jest powtarzane w getImg1(), bo tu tylko buforowanie      
      //a tam wyswietlanie w glownym obrazku
      /* (???) bardzo dziwnie zachowuje sie ten 
         hiddenImgDiv
         obrazki pojawiaja sie i znikaja, czy to znczy usuwanie z pamieci czy tylko jakis blad wyswietlania
      */
      img1.alt = tbl_img.img[curr][idx_big];
      img1.width = "100";
      img1.height = "100";
      img1.style.maxWidth = "100px"; 
      img1.style.maxHeight = "100px";    
            
      hiddenImgDiv.appendChild(img1);  
      //tbl_img.img[old_img_idx][idxImg] = hiddenImgDiv.firstChild;

      //koniec wizualizacji buforowania
      loadNextImg(curr, maxD - 1, stepD);
      console.log("image ", tbl_img.img[curr][idxBig], " loaded");
    })
    .catch((err) => {
      console.log('loadNextImg err: ', err);
      return new Error('loadNextImg err: nie moge pobrac obrazka');
    })
        
    //https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache    
  } //else  
  return 0;    
}


//import "./img_lazy_loading.js.txt.v16.js"
// obsluga testowego htmla

let img_idx = Number(document.getElementById("t_nr_obrazka").value);
let old_img_idx = null;
let obrazek = document.getElementById("obrazek");

async function getImg1(imgIdx1, decoding='async'){
  const pobranyImg = new Promise((resolve, reject) => {    
    tbl_img.getImg(imgIdx1, decoding)
    .then((img_1) => {
        img_1.alt=tbl_img.img[imgIdx1][idxBig];
        img_1.width = "100";
        img_1.height = "100";
        img_1.style.maxWidth = "100px";
        img_1.style.maxHeight = "100px";  
        resolve( img_1 );
      }
    )
    .catch((err) => {
      console.log('getImg1: ', err);
      reject(new Error('getImg1 err: nie moge pobrac obrazka'));
      }
    )     
  });
  return pobranyImg;
}

function loadImg1() {
  console.log({img_idx});
  let nazwa_obrazka = document.createElement('p');
  nazwa_obrazka.style.fontFamily = "Helvetica";
  nazwa_obrazka.style.fontSize = "small";
  nazwa_obrazka.innerHTML = tbl_img.img[img_idx][idx_big];
  obrazek.appendChild(nazwa_obrazka);

  const img2 = new Promise((resolve, reject) => {      
    getImg1(img_idx, 'sync')
    .then(
      (val) => {resolve(val);}
    ) 
    .catch( (err) => {reject(new Error('loadImg1 err: nie moge pobrac obrazka'));});
  });

  img2
  .then((val) => {
    console.log('val: ', val);
    //if(old_img_idx != null) tbl_img.img[old_img_idx][idxImg] = obrazek.firstChild;
    obrazek.appendChild(val); //TODO: !!!!! problem
    old_img_idx = img_idx;    
    return 0;
  })
  .then(
    () => {loadImgsAsync(img_idx, 2, 2)}
  )
  .catch((err) => {
    console.log('loadImg1: err');
    reject(new Error('loadImg1 err: 2 - nie moge pobrac obrazka'));
    }
  );
  console.log("loadImg1");     
}


function next(){
  img_idx = (tbl_img.img.length -1) == img_idx ? img_idx = 0: img_idx += 1;
  console.log('next: ', img_idx);
  loadNextPrev(img_idx, {leftN:0, rightN:3});
}

function prev(){  
  img_idx = (0 == img_idx) ? img_idx = (tbl_img.img.length - 1): img_idx -= 1;
  console.log('prev: ', img_idx)
  loadNextPrev(img_idx, {leftN:3, rightN:0});
}

function loadNextPrev(img_idx, {leftN, rightN}) {
  getImg1(img_idx)
  .then((img1) => {
    //if(old_img_idx != null) tbl_img.img[old_img_idx][idxImg] = obrazek.firstChild;
    obrazek.replaceChild(img1, obrazek.lastChild);
    old_img_idx = img_idx;
  })
  .catch((err) => {new Error("next: nie moge pobrac obrazka");});
  
  obrazek.firstChild.innerHTML = tbl_img.img[img_idx][idx_big];

  loadImgsAsync(img_idx, leftN, rightN);    
}

function getImgNumber(){
  let nr =  Number(document.getElementById("t_nr_obrazka").value);
  console.log('text.value: :', {nr});
  old_img_idx = img_idx;
  //if(old_img_idx != null) tbl_img.img[old_img_idx][idxImg] = obrazek.firstChild;
  img_idx = nr;
  return nr;
}