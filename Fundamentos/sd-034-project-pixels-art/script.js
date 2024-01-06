window.onload = () => {
 
  
  
  const titulo = () =>{
        const title = document.getElementById('title');
        title.innerText ="Paleta de Cores";
        
    };
    titulo();
    
    
    const squarGen =()=>{
        const pixelBoard = document.getElementById('pixel-board');
        for (let i = 0; i < 25; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixelBoard.appendChild(pixel);
            
        };
       

    };
    squarGen();
    
    const selected = () => {
        let cores = document.getElementsByClassName('color');
        
        for (let cor of cores) {
          cor.addEventListener('click', (event) => {
            let selecionado = document.querySelector('.selected');
            
            if (selecionado) {
              selecionado.classList.remove('selected');
            }
            
            event.target.classList.add('selected');
            
             
          });
        }



        
      };
      selected();
      

      const colorPixel = () => {
        const pixels = document.getElementsByClassName('pixel');
        
        for (const pixel of pixels) {
          pixel.addEventListener('click', () => {
            const selectedColor = document.querySelector('.selected');
            
            if (selectedColor) {
              const corSelecionada = window.getComputedStyle(selectedColor).backgroundColor;
              pixel.style.backgroundColor = corSelecionada;
            }
            
          });
        }
      };
      
      
      colorPixel();

      const buttonClear = () =>{
        const button = document.getElementById('clear-board');
        button.addEventListener('click', ()=>{
          const pixelCheio = document.getElementsByClassName('pixel');
          for (const pixelCor of pixelCheio) {
            pixelCor.style.backgroundColor = 'white';
           
            
          }
        })

      }
      buttonClear();

      const randomizePaletteColors = () => {
        const letters = '0123456789ABCDEF';
        const colors = document.getElementsByClassName('color');
      
        for (const color of colors) {
          let randomColor = '#';
      
          for (let i = 0; i < 6; i++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
          }
      
          color.style.backgroundColor = randomColor;
        }
      };
      
      const buttonRandom = () => {
        const button = document.getElementById('button-random-color');
        button.addEventListener('click', randomizePaletteColors);
      };
      
      buttonRandom();

      const saveColors =() =>{
        const pixelElements = document.getElementsByClassName ('pixel');
        let savedColors = [];

        for (const pixel of pixelElements) {
          
          const color = pixel.style.backgroundColor;
          
        
          savedColors.push({color});
        
        
      }
      localStorage.setItem('pixelBoard', JSON.stringify(savedColors));
      

      };
      const clickSave =()=>{

      
      const pixelElements = document.getElementsByClassName('pixel');
     
      for (const pixel of pixelElements) {
        
        pixel.addEventListener('click',saveColors)
       
        
      }
    }
    clickSave();

     
    const restorePixel = ()=> {
        const pixelElements = document.getElementsByClassName('pixel');
        if(localStorage.getItem('pixelBoard')){
        
          const savedColors  = JSON.parse(localStorage.getItem('pixelBoard'));

          for (let i = 0; i < savedColors.length; i+=1 ){
            const color = savedColors[i].color;
            pixelElements[i].style.backgroundColor = color;

          }

        }





      }
      restorePixel();
      
 


      

     
      
      
      

      

      

      
      


     
   




};