"use strict";

( function(){
    const doom = {
        generateBtn: document.getElementById("generate-btn"),
        colorContainer: document.querySelectorAll(".color-container"),
        colorList: document.querySelectorAll("#color"),
        colorCodeList: document.querySelectorAll("#color-code")

    }; 

    function generateRandomColor()
    {    
        const hexNumber = "0123456789ABCDEF";
        let color = "#";
        for(let i = 0; i < 6;++i){
            let rand = Math.floor(Math.random() * 16);
            color += `${hexNumber[rand]}`;
        }  
        return color; 
    }
    function generateColors(numberOfColor){
        let colors = [];
        for(let i = 0; i < numberOfColor; ++i) {colors.push(generateRandomColor());}
        return colors;
    }

    function showCopySuccess(target){
        target.classList.remove("fa-copy");
        target.classList.add("fa-check");
        
        setTimeout(()=>{
            target.classList.remove("fa-check");
            target.classList.add("fa-copy");
        }, 1500);

    }
    function handleCopy(event){  
        const target = event.target;
        console.log(target.nextElementSibling);
        showCopySuccess(target);
    }

    function renderColors(){        
        const colors = generateColors(4);

        doom.colorList.forEach( (color, i) => { color.style.backgroundColor = colors[i]});
        doom.colorCodeList.forEach( (code ,i) => { code.textContent = colors[i]});
    }

    function events(){ 
        doom.colorContainer.forEach( container => {container.addEventListener('click', handleCopy)} );
        doom.generateBtn.addEventListener('click', renderColors);
    }

    function init(){
        renderColors();
        events();
    } 

    init();

})()

