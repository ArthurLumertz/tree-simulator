function l(what) {return document.getElementById(what);}

Game=l('game');
Version='1.2.5';
l('version').innerHTML=Version;
l('running-version').title='Running Tree Simulator v.'+Version;

function Beautify(what) { //turns 9999999 into 9,999,999
	var str='';
	what=Math.floor(what);
	what=(what+'').split('').reverse();
	for (var i in what) {
		if (i%3==0 && i>0) str=','+str;
		str=what[i]+str;
	}
	return str;
}


Trees=0;

Apples=0;
Trucks=0;
Factories=0;
Machines=0;
LuckMakers=0;
AntiMatters=0;

TpS=0;

StoreToRebuild=0;
T=0;

Reset=function() {
    if(confirm('Do you REALLY want to start over?')) {
        document.cookie='CookieClickerSave=0; expires=Fri, 3 Aug 2001 20:47:11 UTC;';
        ResetResponse();
    }
}

function saveToSlot(slot) {
    // Create an object containing all the variables to be saved
    var saveObject = {
      Trees: Trees,
      Apples: Apples,
      Trucks: Trucks,
      Factories: Factories,
      Machines: Machines,
      LuckMakers: LuckMakers,
      AntiMatters: AntiMatters,
      TpS: TpS
    };
  
    // Convert the object to a JSON string and save it to local storage
    localStorage.setItem('saveSlot' + slot, JSON.stringify(saveObject));
  }
  
  // Function to load the game from a specific slot
  function loadFromSlot(slot) {
    // Get the saved JSON string from local storage
    var savedData = localStorage.getItem('saveSlot' + slot);
  
    // If no save data exists for the specified slot, return
    if (!savedData) {
      return;
    }
  
    // Parse the JSON string and update the variables with the saved values
    var saveObject = JSON.parse(savedData);
    Trees = saveObject.Trees;
    Apples = saveObject.Apples;
    Trucks = saveObject.Trucks;
    Factories = saveObject.Factories;
    Machines = saveObject.Machines;
    LuckMakers = saveObject.LuckMakers;
    AntiMatters = saveObject.AntiMatters;
    TpS = saveObject.TpS;
    StoreToRebuild=1;
}

ResetResponse=function() {
    location.reload(true);
}


ClickTree=function() {
    Trees++;
}

RebuildStore=function() {
    var str='';
    for(var i in Buyables) {
        var amount=0;
        if(Buyables[i].name=='Apple') amount=Apples;
        else if(Buyables[i].name=='Truck') amount=Trucks;
        else if(Buyables[i].name=='Factory') amount=Factories;
        else if(Buyables[i].name=='Machine') amount=Machines;
        else if(Buyables[i].name=='Luck Maker') amount=LuckMakers;
        else if(Buyables[i].name=='Anti Matter') amount=AntiMatters;
        str+='<div id="buy'+Buyables[i].name+'" onclick="Buy(\''+Buyables[i].name+'\');" style="'+(Buyables[i].name=='Elder Pledge'?'display:none;':'')+(Buyables[i].name=='Time machine'?'font-size:90%;':'')+'background-image:url(img/'+Buyables[i].pic+'.png);"><b>'+Buyables[i].name+' - <moni></moni> '+Beautify(Buyables[i].price)+'</b><br>'+Buyables[i].desc+''+(amount>0?('<div class="amount">'+amount+'</div>'):'')+'</div>';
    }
    l('store').innerHTML=str;
	StoreToRebuild=0;
}


Buyables=[];
Buyable=function(name,desc,pic,price,func) {
    this.name=name;
    this.desc=desc;
    this.pic=pic;
    this.price=price;
    this.func=func;
    Buyables[name]=this;

    this.Buy=function() {
        if(Trees>=this.price) {
            Trees-=this.price;
            this.price=Math.ceil(this.price*1.1);
            this.func(1);
            StoreToRebuild=1;

            if(this.name=='Apple') {
                TpS+=0.1;
            } else if(this.name=='Truck') {
                TpS+= 1;
            } else if(this.name=='Factory') {
                TpS+= 5;
            } else if(this.name=='Machine') {
                TpS+= 10;
            } else if(this.name=='Luck Maker') {
                TpS+= 15;
            } else if(this.name=='Anti Matter') {
                TpS+= 20;
            }
        }
    }
    StoreToRebuild=1;
}

Buy=function(what) {
    Buyables[what].Buy();
}


new Buyable('Apple','Grows trees from apple seeds.','apple',15,function(){Apples++;});
new Buyable('Truck','Collects broken trees.','truck',100,function(){Trucks++;});
new Buyable('Factory','Plants trees and breaks them.','factory',500,function(){Factories++;});
new Buyable('Machine','Prints trees from thin air.','machine',1500,function(){Machines++;});
new Buyable('Luck Maker','Grows trees from apple seeds.','luckmaker',6000,function(){LuckMakers++;});
new Buyable('Anti Matter','Turns black matter into trees.','antimatter',12000,function(){AntiMatters++;});

var appleImg = document.createElement('img');
appleImg.src = 'img/apple.png';
appleImg.style.position='absolute';
appleImg.style.zIndex="10";
appleImg.style.width='16px';
appleImg.style.height='16px';
appleImg.style.userSelect='none';
appleImg.style.webkitUserSelect='none';



spawnApple=function() {
    var apple=appleImg.cloneNode();
    apple.style.top='-50px';
    apple.style.left = Math.random()*window.innerWidth +'px'; 
    document.body.appendChild(apple);
}

var appleTimer;
function updateApples() {
  var apples = document.getElementsByTagName('img');
  for (var i = 0; i < apples.length; i++) {
    var apple = apples[i];
    var top = parseFloat(apple.style.top);
    if (top < window.innerHeight) {
      apple.style.top = top + 10 + 'px'; // update the vertical position
    } else {
      document.body.removeChild(apple); // remove the apple element when it falls off the screen
    }
  }
}

function checkTrees() {
    if (Trees>=100&&Apples>=1&&!appleTimer) {
      appleTimer = setInterval(spawnApple, Trees*2);
      setInterval(updateApples, 100); 
    } else if (Trees < 100 && appleTimer) {
      clearInterval(appleTimer);
      appleTimer = null;
      var apples = document.getElementsByTagName('img');
      for (var i = 0; i < apples.length; i++) {
        document.body.removeChild(apples[i]);
      }
    }
  }
Main=function() {
    if(StoreToRebuild) {
        RebuildStore();
        StoreToRebuild=0;
    }
    checkTrees();

    for(var i in Buyables) {
        if (Trees>=Buyables[i].price) l('buy'+Buyables[i].name).className=''; else l('buy'+Buyables[i].name).className='grayed';
        //l('buy'+Buyables[i].name).addEventListener('mouseenter', showTooltip);
    }

    if(T%30==0) Trees+=TpS;

    l('trees').innerHTML=Beautify(Trees)+' trees';

    var floater=Math.round(TpS*10-Math.floor(TpS)*10);
	tps=Beautify(TpS)+(floater?('.'+floater):'');
    l('tps').innerHTML='per second : '+tps;

    if(Trees<10000) l('treeFloor').classList.add('small');
    else if(Trees<50000) l('treeFloor').classList.add('medium');
    else l('treeFloor').classList.add('large');

    var str='';
    if(Trees<10) str='You feel like gathering trees.<br>But nobody wants them.';
    else if(Trees<15) str='You are getting some customers<br>around the neighborhood.';
    else if(Trees<50) str='People say your trees are very<br>good quality.';
    else if(Trees<100) str='Companies are interested in your<br>wood.';
    else str='It\'s time to stop playing.';
    l('comment').innerHTML=str;

    if(T%30==0) { document.title=Beautify(Trees)+' trees - Tree Simulator'; T=0; }

    T++;
    setTimeout(Main,1000/30);
}
Main();


l('othergames').addEventListener('mouseenter', showTooltip);
l('homepage').addEventListener('mouseenter', showTooltip);
l('dtthnet').addEventListener('mouseenter', showTooltip);
l('running-version').addEventListener('mouseenter', showTooltip);

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.id='tooltip';
    tooltip.innerText = event.target.title;
    document.body.appendChild(tooltip);
    tooltip.style.left = event.pageX + 'px';
    tooltip.style.top = event.pageY + 'px';
    event.target.addEventListener('mouseleave', () => tooltip.remove());

    tooltip.addEventListener('mousemove', function(event) {
        event.stopPropagation();
    });
}