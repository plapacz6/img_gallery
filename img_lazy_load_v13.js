//version 1.3

const idx_small = 0;
const idx_big = 1;
const idx_loaded = 2;  //ones, and now in browser cache 

const tbl_img = [
  // small,  big, loaded(Ture/False)
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_01.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_02.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_03.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_04.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_05.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_06.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_07.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_08.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_09.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_10.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_11.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_12.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_13.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_14.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_15.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_16.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_17.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_18.png", 0],
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_19.png", 0],
  
  ["s_001.jpg", "https://adlap.github.io/Pielgrzymi/images/small_20.png", 0],

  ["s_009.jpg", "https://adlap.github.io/Pielgrzymi/images/small_48.png", 0],
];
const ramka_img = document.getElementById("obrazek");

//let img_idx = 0 ;
let img_idx = Number(document.getElementById("t_nr_obrazka").value);

function load_img(e) {
  img_src = tbl_img[img_idx][idx_big]; 
  obrazek.innerHTML = '<img src="' + img_src + '" alt="' + tbl_img[img_idx][idx_big] + '">';
  tbl_img[img_idx][idx_loaded] = 1;  
  /*
  tu asynchroniczne wczytywanie kolejnych obrazkow po koleii 
  gdy jeden ukocznony, nastepny  
  zaczynajac od nastepngo po zaladowanym
  */
  //img_load_async((tbl_img.length -1) == img_idx ? img_idx = 0: img_idx += 1);
  img_load_async(1, 1);
  console.log("loag_img"); 
}

function next(e){
  img_idx = (tbl_img.length -1) == img_idx ? img_idx = 0: img_idx += 1;
  img_src = tbl_img[img_idx][idx_big]; 
  obrazek.innerHTML = '<img src="' + img_src + '" alt="' + tbl_img[img_idx][idx_big] + '">';
  tbl_img[img_idx][idx_loaded] = 1;
  img_load_async(0, 4);  
  console.log("next");
}

function prev(e){
  img_idx = (0 == img_idx) ? img_idx = (tbl_img.length - 1): img_idx -= 1;
  img_src = tbl_img[img_idx][idx_big];
  obrazek.innerHTML = '<img src="' + img_src + '" alt="' + tbl_img[img_idx][idx_big] + '">';
  tbl_img[img_idx][idx_loaded] = 1;
  img_load_async(4, 1);  
  console.log("prev");
}

/* zmienna do kontrolowania indeksu kolejnego wczytywania */
let img_async_idx;
//let img_all_loaded = 0;  //w tym algorytmie nie uzywane
const obrazek_ukryty = document.getElementById("obrazek_ukryty");

//funkcja asyngroniczna
async function img_load_async(max_left, max_right){  
  console.log("img_load_async_START");
  
  let counter_right = 0
  let counter_left = 0;
  //obrazek_ukryty.innerHTML = '';  //reset bufora
  //if(1 == img_all_loaded) return 0;  //return Promise.resolve(0);   
  img_async_idx = img_idx;
  while(counter_right <= max_right){
    img_async_idx = ((tbl_img.length - 1) == img_async_idx) ? 0: img_async_idx += 1;
    counter_right++;
    if(tbl_img[img_async_idx][idx_loaded] != 1) {
      load_next_img();             
    }       
  }
  //img_all_loaded = 1;  
  console.log("img_load_async_ALL ", counter_right ," FINISHED"); 
  return 0;
}

function load_next_img(){ 
  //wczytuje jeden obrazek
  img_src = tbl_img[img_async_idx][idx_big];
/*  
    obrazek_ukryty.innerHTML.appendChild(
    document.createElement('<img src="' + img_src + '" alt="' + tbl_img[img_async_idx][idx_big] + '">')
  ); */

  //z = zamiast += tez cachuje obrazki
  //obrazek_ukryty.innerHTML = '<img src="' + img_src + '" alt="' + tbl_img[img_async_idx][idx_big] + '">';
  obrazek_ukryty.innerHTML += '<img src="' + img_src + '" alt="' + tbl_img[img_async_idx][idx_big] + '">';
  
  //ta flaga sie deaktualizuje jesli zamiast += jest = w instrukcji wyzej ^^^
  tbl_img[img_async_idx][idx_loaded] = 1; 
  console.log("obrazek", tbl_img[img_async_idx][idx_big], " loaded");
  return 0;
}



//pomocnicze
function getNrObrazka(){
  let nr =  Number(document.getElementById("t_nr_obrazka").value);
  console.log({nr});
  img_idx = nr;
  return nr;
}