// VARIABLES
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z'];
var sayac=0;
var kelimeler=['izmir','helsinki','denizli','new york',"los angeles","kuala lumpur","mexico city", "stockholm"];
var random=Math.floor(Math.random()*kelimeler.length);
var maxTahmin=10;
var kelimelik=[];
var winArray=[];
var arrayChecker;
var itemBulan=[];

// WHEN PAGE LOADED THIS METHODS WILL WORK
$(window).on("load",() => {
    startGame();
   
    
$(".harfButon").on("click", (e) => {
   if(maxTahmin<1) {
    
    }
    else {
    degistirici(wtf=e.target.id);
    }
});
});
function startGame() {
    for(let i=0;i<=maxTahmin-1;i++) {
        hearts=document.createElement("i");
        $(".heartContainer").append(hearts)
        $("i").attr("class","fa-solid fa-heart");
        
}
    addButtons();
    idChanger();
    kelimeChecker();
    
    
     
}
// ADDING ALPHABET BUTTONS
function addButtons () {
    letters=document.createElement('ul');
    $("#buttons").append(letters);    
    for (let i=0; i<=alphabet.length-1;i++)
    {
        buttons=document.createElement('li');
        $("ul").append(buttons);    
    }
    
}
// CHANGING BUTTONS' ID FOR CALL IT BACK LATER
function idChanger () {
    for(let i=0; i<=alphabet.length-1;i++) 
    {
        $("li").attr("class","harfButon");
        $("li:eq("+i+")").attr("id",alphabet[i]);
        $("li:eq("+i+")").attr("value",alphabet[i]);
        $("li:eq("+i+")").html(alphabet[i].toUpperCase());
    }
}

// ADDING LABEL FOR WORD'S LETTER
function kelimeChecker() {
    for(let i=0;i<=kelimeler[random].length;i++) 
    {
        kelimeBox=document.createElement('label');
        $('label').attr("class","kelimeClass");
        $('.kelimeClass').html(" _ ");
        document.body.appendChild(kelimeBox);
    }   
    // CALLING IT FOR DIVIDE WORD TO LETTERS
    ayirYazi();
    
}

// DIVIDE THE NAMES OF ARRAY'S RANDOM ITEM AND PUSH IT ANOTHER ARRAY TO CHECK THEM
function ayirYazi() {
    for(let i=0; i<=kelimeler[random].length-1;i++) 
    {
    var yaziyiAyir=kelimeler[random].substring(i,i+1); // IT'S LOOOPING TO LENGTH OF WORD LIKE(0,1), (1,2)
    kelimelik.push(yaziyiAyir); //ADDING EVERY LETTER TO KELIMELIK ARRAY
    winArray.push(i);
    }
    var findMultiSpace=kelimelik.find(x=>x==" "); // FINDING SPACES IN ARRAY
    if(findMultiSpace) //IF WORD HAS SPACE APPEAR IT ON LABEL
        {
        var boslukBulan=kelimelik.findIndex(x=>x==" ");
        document.getElementsByClassName("kelimeClass")[boslukBulan].innerHTML="&nbsp"; 
        winArray[boslukBulan]=" ";
        }

    }
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function degistirici(z) { // FINDING BUTTON VALUE WHICH YOU HAVE CLICKED IF LETTER IS IN THE WORD SHOWS IT ON THE LABELS
    wtf=z;
    $("#"+wtf).css("visibility","hidden")
    var findMulti= kelimelik.filter(x=> x==wtf); // IF THE ARRAY HAVE MORE THAN 2 SAME CHARACTER, IT'S SHOWING ALL OF THEM.
    if(findMulti.length>0)
    {
        for(let i=0; i<=findMulti.length-1;i++)
            {
            var itemBulan=kelimelik.findIndex(element => element==wtf);
            document.getElementsByClassName("kelimeClass")[itemBulan].innerHTML=" "+wtf+" ";
            kelimelik[itemBulan]="0";
            winArray[itemBulan]=wtf;    
            arrayChecker=winArray.join("");
            win();
            }
            $('.tahminYazi2').html("You have "+maxTahmin+" Health");
            
    }
    else // IF ARRAY JUST HAVE 1 ITEM
    {
    var itemBulan=kelimelik.findIndex(element => element==wtf);
        if(kelimelik.find(element=>element==wtf)) 
        {   

            document.getElementsByClassName("kelimeClass")[itemBulan].innerHTML=" "+wtf+" ";
            winArray[itemBulan]=wtf;
            arrayChecker=winArray.join("");
            $('.tahminYazi2').html("You have "+maxTahmin+" Health");
            win();
            
        }
        else {
            health();
             }
        
    }
    
    } // END OF DEGISTIRICI FUNCTION

    //HEALTH FUNCTION
    function health() {
        
        maxTahmin--;
        var deleteHeart=$("i")[maxTahmin];
        deleteHeart.remove();
        var hangMan=document.getElementsByClassName("mans")[sayac];
        hangMan.style.setProperty("visibility","visible");
        sayac++;
        if(maxTahmin>0) {
        $('.tahminYazi2').html("You have "+maxTahmin+" Health");
        }
        else {
            $('.tahminYazi2').html("You LOST");
        }
        
        $("body").animate({backgroundColor: 'red'},"1")
                 .delay(0)
                 .animate({backgroundColor:'white'},"3")
    }

    function win() {
   
        if(arrayChecker===kelimeler[random]) 
        {
        sea=document.createElement("h1");
        document.body.appendChild(sea);

        $("h1").css("color","green");
        $("h1").html("YOU WON");
        $("body").animate( {backgroundColor:'green', color:'white'},"0")
                 .delay(0)
                 .animate({backgroundColor:'white', color:'black'},"1")
                 setTimeout(() => {
                    location.reload();
                }, 2000);
        
        }
        

    }
