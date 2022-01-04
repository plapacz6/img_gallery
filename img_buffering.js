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
    const loadedImg = new Promise((resolve, reject) => {
      this.img[idx][idxImg].onload = resolve(
        (console.log('loadImg: ',this),
        (this.img[idx][idxLoaded] = 1),  //comma operator
        this.img[idx][idxImg])        
      ); //.bind(this);  //bez tego this tez dobrze wskazuje
      this.img[idx][idxImg].onerror = reject; //TODO: nie wiem czy to dziala 
    });
    this.img[idx][idxImg].src = this.long_url + this.img[idx][idxBig];
    return loadedImg;        
  },

  getImg: async function (idx, decoding='async') {
    const loadedImg = new Promise((resolve, reject) => {
      if( ! this.img[idx][idxLoaded]){
        if( this.img[idx][idxImg] === 0){          
          try {
            console.log('getImg: ', this);
            resolve(this.loadImg(idx, decoding));
          }
          catch(err){
            console.log('getImg:', {err});
            reject;
          }      
        }
        else {
          console.log('ERR: get: img gotowy, aa loaded nadal False');
          reject;
        }
      }
      else {
        resolve(this.img[idx][idxImg]);
      }
    });
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

/* variable to controll preloading images */


//function: initlializing loading number images in background
async function img_load_async(imgIdx, maxLeft, maxRight){  
  //ignorujemy zwracany niżej promise i wychodzimy bez czekania
  console.log("img_load_async_STARTED");
  try{
    await imgs_load(imgIdx, maxLeft, maxRight);
  }
  catch(err){
    console.log('img_load_async: ', {err});
  }
  console.log("img_load_async_ENDED");
  return 0;
}

//function: do loading images in background
async function imgs_load(currImgIdx, maxLeft, maxRight){      
  const stepR = 1;
  const stepL = -1;  
  try{
    load_next_img(currImgIdx, maxRight, stepR);
    load_next_img(currImgIdx, maxLeft, stepL);  
  }
  catch(err){
    console.log('imgs_load: ', {err});    
  }
  return 0;
}

//recurrent loading number of images
const load_next_img = (curr, maxD, stepD) => { 
  
  if(maxD <= 0) return;

  if(stepD > 0){
    curr = (tbl_img.img.length -1) == curr ? curr = 0: curr += 1;
  }
  else 
  if(stepD < 0){
    curr = (0 == curr) ? curr = (tbl_img.img.length - 1): curr -= 1;
  }
  try{
    if(tbl_img.img[curr][idxLoaded] === 1) {
      load_next_img(curr, maxD - 1, stepD)
    }
    else{
      let next_img = document.createElement("img");
      next_img.alt = tbl_img.img[curr][idx_big];
      next_img.width = "100";
      next_img.height = "100";
      next_img.style.maxWidth = "100px"; 
      next_img.style.maxHeight = "100px"; 
      hiddenImgDiv.appendChild(next_img);
      //next_img.src= long_url + tbl_img.img[curr][idx_small];   //TODO: zastapic funkcja do tworzenia sciezki
      //https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache
      try {
        console.log("image ", tbl_img.img[curr][idxBig], " start loading");        
        next_img.onload = load_next_img(curr, maxD - 1, stepD);
      }
      catch(err){
        console.log('next_img.onload = :', {err});
      }
      next_img.src= long_url + tbl_img.img[curr][idx_small];   //TODO: zastapic funkcja do tworzenia sciezki
      tbl_img.img[curr][idxLoaded] = 1; 
      console.log("image ", tbl_img.img[curr][idxBig], " loaded");
    }
  }
  catch(err){
    console.log('load_next_img: ', {err});    
  }
  return 0;    
}


//import "./img_lazy_loading.js.txt.v16.js"
// obsluga testowego htmla

let img_idx = Number(document.getElementById("t_nr_obrazka").value);
let obrazek = document.getElementById("obrazek");

async function pobierz_img(imgIdx1, decoding='async'){
  const pobranyImg = new Promise((resolve, reject) => {
    try {
      const img_1 = tbl_img.getImg(imgIdx1, decoding);
      img_1.alt=tbl_img.img[imgIdx1][idxBig];
      img_1.width = "100";
      img_1.height = "100";
      img_1.style.maxWidth = "100px";
      img_1.style.maxHeight = "100px";  
      resolve( img_1 );
    }
    catch(err){
      console.log('pobierz_img: ', err);
      reject;
    }  
  });
  return pobierz_img;
}

function load_img() {
  console.log({img_idx});
  let nazwa_obrazka = document.createElement('p');
  nazwa_obrazka.style.fontFamily = "Helvetica";
  nazwa_obrazka.style.fontSize = "small";
  nazwa_obrazka.innerHTML = tbl_img.img[img_idx][idx_big];
  obrazek.appendChild(nazwa_obrazka);

  const img2 = new Promise((resolve, reject) => {      
    pobierz_img(img_idx, 'sync').then(
      (val) => {resolve(val);}
    );    
  });
  img2.then((val) => {
    console.log('val: ', val);
    obrazek.appendChild(val); //TODO: !!!!! problem
  })
  .then(async () => { await img_load_async(img_idx, 2, 2)} )
  .catch(console.log('loag_img: err'));
  console.log("loag_img");     
}


function next(){
  img_idx = (tbl_img.img.length -1) == img_idx ? img_idx = 0: img_idx += 1;
  console.log('next: ', img_idx)
  obrazek.replaceChild(pobierz_img(img_idx), obrazek.lastChildd);
  obrazek.firstChild.innerHTML = tbl_img.img[img_idx][idx_big];
  
  img_load_async(img_idx, 0, 38);  
  console.log("next");
}

function prev(){
  img_idx = (0 == img_idx) ? img_idx = (tbl_img.img.length - 1): img_idx -= 1;
  console.log('prev: ', img_idx)
  obrazek.replaceChild(pobierz_img(img_idx), obrazek.lastChild);
  obrazek.firstChild.innerHTML = tbl_img.img[img_idx][idx_big];

  img_load_async(img_idx, 3, 0);        
  console.log("prev");
}

function get1NrObrazka(){
  let nr =  Number(document.getElementById("t_nr_obrazka").value);
  console.log('text.value: :', {nr});
  img_idx = nr;
  return nr;
}