function l(what) {return document.getElementById(what);}

Game=l('game');
Version='1.2.5 pre-release';
l('version').innerHTML=Version;
l('running-version').title='Running Tree Simulator v.'+Version+'d: Apr, 27 2023';
console.log('== are you here to hack in trees? ==')

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
Mines=0;
Factories=0;
Machines=0;
AntiMatters=0;
LuckMakers=0;
Tridents=0;
Stormcallers=0;

TpS=0;
CpS=1;

StoreToRebuild=0;
UpgradesToRebuild=0;

NumbersOn=1;
FlashingOn=1;
ParticlesOn=1;

T=0;
Loaded=0;

AppleApocalypse=1;

ToggleNumbers=function() {
    if(NumbersOn) {NumbersOn=0;l('toggleNumbers').innerHTML='Numbers Off';}
    else if(!NumbersOn) {NumbersOn=1;l('toggleNumbers').innerHTML='Numbers On';}
}

ToggleFlashing=function() {
    if(FlashingOn) {FlashingOn=0;l('toggleFlashing').innerHTML='Flashing Off';}
    else if(!FlashingOn) {FlashingOn=1;l('toggleFlashing').innerHTML='Flashing On';}
}

ToggleParticles=function() {
    if(ParticlesOn) {ParticlesOn=0;l('toggleParticles').innerHTML='Particles Off';}
    else if(!ParticlesOn) {ParticlesOn=1;l('toggleParticles').innerHTML='Particles On';}
}

importSave=function() {
    var save=prompt('Please paste in the text that was given to you on save export.','');
    if(save && save!='') ImportResponse('1|'+save);
    Save();
}

exportSave=function() {
    var save=prompt('Copypaste this text and keep it somewhere safe! (yes, it\'s easy to edit - but remember : cheated trees taste terrible!)',MakeSaveString());
}

function ImportResponse(response) {
    var r = response.split('|');
    if (response != '0' && response && r[0] == '1') {
      Trees = parseInt(r[2]);
      TpS=parseInt(r[3]);
      Apples = Math.min(1000, parseInt(r[4]));Buyables['Apple'].price = parseInt(r[5]);
      Trucks = Math.min(1000, parseInt(r[6]));Buyables['Truck'].price = parseInt(r[7]);
      Mines = Math.min(1000, parseInt(r[8]));Buyables['Mine'].price = parseInt(r[9]);
      Factories = Math.min(1000, parseInt(r[10]));Buyables['Factory'].price = parseInt(r[11]);
      Machines = Math.min(1000, parseInt(r[12]));Buyables['Machine'].price = parseInt(r[13]);
      AntiMatters = Math.min(1000, parseInt(r[14]));Buyables['Anti Matter'].price = parseInt(r[15]);
      LuckMakers = Math.min(1000, parseInt(r[16]));Buyables['Luck Maker'].price = parseInt(r[17]);
      Tridents = Math.min(1000, parseInt(r[18]));Buyables['Trident'].price = parseInt(r[19]);
      Stormcallers = Math.min(1000, parseInt(r[20]));Buyables['Stormcaller'].price = parseInt(r[21]);
      StoreToRebuild = 1;
    }
    new Pop('treeFloor','Imported.');
}
  
Reset=function() {
    if(confirm('Do you REALLY want to start over?')) {
        document.cookie='TreeSimulatorSave=0; expires=Fri, 3 Aug 2001 20:47:11 UTC;';
        ResetResponse();
    }
}

ResetResponse=function() {
    location.reload(true);
}

MakeSaveString=function() {
    var str='';
    str+=Version+'|'+parseInt(Trees)+'|'+parseInt(TpS)+'|'+
    parseInt(Apples)+'|'+parseInt(Buyables['Apple'].price)+'|'+
    parseInt(Trucks)+'|'+parseInt(Buyables['Truck'].price)+'|'+
    parseInt(Mines)+'|'+parseInt(Buyables['Mine'].price)+'|'+
    parseInt(Factories)+'|'+parseInt(Buyables['Factory'].price)+'|'+
    parseInt(Machines)+'|'+parseInt(Buyables['Machine'].price)+'|'+
    parseInt(AntiMatters)+'|'+parseInt(Buyables['Anti Matter'].price)+'|'+
    parseInt(LuckMakers)+'|'+parseInt(Buyables['Luck Maker'].price)+'|'+
    parseInt(Tridents)+'|'+parseInt(Buyables['Trident'].price)+'|'+
    parseInt(Stormcallers)+'|'+parseInt(Buyables['Stormcaller'].price);
    return str;
}

SaveTimer=30*60;
Save=function() {
    var str=MakeSaveString();
    var now=new Date();
    now.setFullYear(now.getFullYear()+5);//5 years... wow
    str='TreeSimulatorSave='+escape(str)+'; expires='+now.toUTCString+';';
    document.cookie=str;
    if (document.cookie.indexOf('TreeSimulatorSave')<0) Pop('treeFloor','<span style="color:#f00;">Error while saving.<br>Export your save instead!</span>');
    else Pop('treeFloor','Saved');

    SaveTimer=30*60;
}

SaveResponse=function(response) {
    var r=response.split('|');
    if(r[0]=='1'&&parseFloat(r[1])>Version) {
        alert('New version available '+r[1]+'.<br>Please refresh to see it!')
    }
    if (r[0]=='1') new Pop('treeFloor','Saved');
	else new Pop('treeFloor','<span style="color:#f00;">Error while saving</span>');
}

Load=function() {
    var str='0';
    if(document.cookie.indexOf('TreeSimulatorSave')>=0) str='1|'+unescape(document.cookie.split('TreeSimulatorSave=')[1]);//get cookie here
    LoadResponse(str);
    l('comment').innerHTML='Loading tree...';
}

LoadResponse=function(response) {
    var r = response.split('|');
    if (response != '0' && response && r[0] == '1') {
      Trees = parseInt(r[2]);
      TpS=parseInt(r[3]);
      Apples = Math.min(1000, parseInt(r[4]));Buyables['Apple'].price = parseInt(r[5]);
      Trucks = Math.min(1000, parseInt(r[6]));Buyables['Truck'].price = parseInt(r[7]);
      Mines = Math.min(1000, parseInt(r[8]));Buyables['Mine'].price = parseInt(r[9]);
      Factories = Math.min(1000, parseInt(r[10]));Buyables['Factory'].price = parseInt(r[11]);
      Machines = Math.min(1000, parseInt(r[12]));Buyables['Machine'].price = parseInt(r[13]);
      AntiMatters = Math.min(1000, parseInt(r[14]));Buyables['Anti Matter'].price = parseInt(r[15]);
      LuckMakers = Math.min(1000, parseInt(r[16]));Buyables['Luck Maker'].price = parseInt(r[17]);
      Tridents = Math.min(1000, parseInt(r[18]));Buyables['Trident'].price = parseInt(r[19]);
      Stormcallers = Math.min(1000, parseInt(r[20]));Buyables['Stormcaller'].price = parseInt(r[21]);
      StoreToRebuild = 1;
      UpgradesToRebuild=1;
    }
    new Pop('treeFloor','Loaded.');
    Loaded=1;
    Main();
}

var treeClick;
ClickTree=function() {
    Trees+=CpS;
    if(treeClick) treeClick.remove();
    treeClick=new Audio('snd/click1.wav');
    treeClick.play();
    if (Pops.length<260 && NumbersOn) new Pop('bigTree','+'+CpS);
}

RebuildStore=function() {
    var str='';
    for(var i in Buyables) {
        var amount=0;
        if(Buyables[i].name=='Apple') amount=Apples;
        else if(Buyables[i].name=='Truck') amount=Trucks;
        else if(Buyables[i].name=='Mine') amount=Mines;
        else if(Buyables[i].name=='Factory') amount=Factories;
        else if(Buyables[i].name=='Machine') amount=Machines;
        else if(Buyables[i].name=='Anti Matter') amount=AntiMatters;
        else if(Buyables[i].name=='Luck Maker') amount=LuckMakers;
        else if(Buyables[i].name=='Trident') amount=Tridents;
        else if(Buyables[i].name='Stormcaller') amount=Stormcallers;
        str+='<div id="buy'+Buyables[i].name+'" onclick="Buy(\''+Buyables[i].name+'\');" style="'+(Buyables[i].name=='Elder Pledge'?'display:none;':'')+(Buyables[i].name=='Time machine'?'font-size:90%;':'')+'background-image:url(img/'+Buyables[i].pic+'.png);"><b>'+Buyables[i].name+' - <moni></moni> '+Beautify(Buyables[i].price)+'</b><br>'+Buyables[i].desc+''+(amount>0?('<div class="amount">'+amount+'</div>'):'')+'</div>';
    }
    l('store').innerHTML=str;
	StoreToRebuild=0;
}

RebuildUpgrades=function() {
    var str='';
    for(var i in Upgrades) {
        str+='<div class="upgrades" id="buy'+Upgrades[i].name+'" onclick="BuyUpgrade(\''+Upgrades[i].name+'\');" style="background-image:url(img/'+Upgrades[i].pic+'.png)">';
    }
    l('shop').innerHTML+=str;
    UpgradesToRebuild=0;
}

var buyClick=new Audio('snd/buy1.wav');
Buyables=[];
Buyable=function(name,desc,pic,price,tps,func) {
    this.name=name;
    this.desc=desc;
    this.pic=pic;
    this.price=price;
    this.tps=tps;
    this.func=func;
    Buyables[name]=this;

    this.Buy=function() {
        if(Trees>=this.price) {
            Trees-=this.price;
            this.price=Math.ceil(this.price*1.1);
            this.func(1);
            StoreToRebuild=1;

            buyClick.play();

            TpS+=this.tps;
        }
    }
    StoreToRebuild=1;
}

Buy=function(what) {
    Buyables[what].Buy();
}

Upgrades=[];
Upgrade=function(name,desc,pic,price) {
    this.name=name;
    this.desc=desc;
    this.pic=pic;
    this.price=price;
    Upgrades[name]=this;

    this.Buy=function() {
        if(Trees>=this.price) {
            Trees-=this.price;
            l('name').display='none';
            UpgradesToRebuild=1;
        }
    }
    UpgradesToRebuild=1;
}


new Buyable('Apple','Grows trees from apple seeds.','apple',15,0.1,function(){Apples++;});
new Buyable('Truck','Collects broken trees.','truck',100,1,function(){Trucks++;});
new Buyable('Mine','Grabs trees from the underworld.','mine',500,5,function(){Mines++;});
new Buyable('Factory','Plants trees and breaks them.','factory',1500,10,function(){Factories++;});
new Buyable('Machine','Prints trees from thin air.','machine',2500,15,function(){Machines++;});
new Buyable('Anti Matter','Turns black matter into trees.','antimatter',6000,20,function(){AntiMatters++;});
new Buyable('Luck Maker','Grows trees from apple seeds.','luckmaker',12000,30,function(){LuckMakers++;});
new Buyable('Trident','Kills tree entities lost in the sea.','trident',20000,60,function(){Tridents++;});
new Buyable('Stormcaller','Plants trees when there is a storm.','stormcaller',28000,80,function(){Stormcallers++;});

// TOOD:
//new Upgrade('1 Apple upgrade','Plants trees when there is a storm.','apple',28000);

Pops=[];
Pop=function(el,str) {
	this.el=el;
	this.str=str;
	this.life=0;
	this.offx=Math.floor(Math.random()*20-10);
	this.offy=Math.floor(Math.random()*20-10);
	Pops.push(this);
}

var appleImg = document.createElement('img');
appleImg.src = 'img/apple.png';
appleImg.style.position='absolute';
appleImg.style.zIndex="10";
appleImg.style.width='16px';
appleImg.style.height='16px';
appleImg.style.userSelect='none';
appleImg.style.webkitUserSelect='none';



spawnApple=function () {
    var apple = appleImg.cloneNode();
    apple.style.top = '-50px';
    apple.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(apple);
}
var appleTimer;
updateApples=function() {
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

checkApples=function() {
    if (Trees >= 100 && Apples >= 1 && !appleTimer) {
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

    if(UpgradesToRebuild) {
        RebuildUpgrades();
        UpgradesToRebuild=0;
    }

    if(ParticlesOn) {
        checkApples();
    } else {
        clearInterval(appleTimer);
        appleTimer = null;
        var apples = document.getElementsByTagName('img');
        for (var i = 0; i < apples.length; i++) {
            document.body.removeChild(apples[i]);
        }
    }

    for (var i in Pops) {
		var rect=l(Pops[i].el).getBoundingClientRect();
		var x=Math.floor((rect.left+rect.right)/2+Pops[i].offx)-100;
		var y=Math.floor((rect.top+rect.bottom)/2-Math.pow(Pops[i].life/100,0.5)*100+Pops[i].offy)-10;
		var opacity=1-(Math.max(Pops[i].life,80)-80)/20;
		str+='<div class="pop" style="position:absolute;left:'+x+'px;top:'+y+'px;opacity:'+opacity+';">'+Pops[i].str+'</div>';
		Pops[i].life+=2;
		if (Pops[i].life>=100) Pops.splice(i,1);
	}
	l('pops').innerHTML=str;

    for(var i in Buyables) {
        if (Trees>=Buyables[i].price) l('buy'+Buyables[i].name).className=''; else l('buy'+Buyables[i].name).className='grayed';
    }

    if(T%30==0) Trees+=TpS;


    l('trees').innerHTML=Beautify(Trees)+' trees';

    var floater=Math.round(TpS*10-Math.floor(TpS)*10);
	tps=Beautify(TpS)+(floater?('.'+floater):'');
    l('tps').innerHTML='per second : '+tps;

    if(Trees<=10000) l('treeFloor').classList.add('small');
    else if(Trees<=50000) l('treeFloor').classList.add('medium');
    else l('treeFloor').classList.add('large');

    var str='';
    if(Trees<50) str='People like the taste of<br>your apples.';
    else if(Trees<150) str='You are getting some customers<br>around the neighborhood.';
    else if(Trees<500) str='People say your trees are very<br>good quality.';
    else if(Trees<1000) str='Companies are interested in your<br>wood.';
    else if(Trees<5000) str='People from far away come to see<br>your trees.';
    else if(Trees<10000) str='News: oxygen is increased by<br>20% this year.';
    else if(Trees<20000) str='News: trucks are everywhere.<br>Even in my backyard!';
    else if(Trees<30000) str='People are complaining about<br>trees going into their houses.';
    else str='Oh gosh.<br>You gotta lot of trees!';
    l('comment').innerHTML=str;

    if(T%30==0 && Loaded) { document.title=Beautify(Trees)+' trees - Tree Simulator'; T=0; }

    SaveTimer--;
    if(SaveTimer==0 && Loaded) Save();
    T++;
    setTimeout(Main,1000/30);
}
Load();


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