function l(what) {return document.getElementById(what);}

Version = "2.0.0";
const versions = document.querySelectorAll("#version");

versions.forEach((e) => {
    e.innerHTML = Version;
});

Trees = 0;
TotalTrees = 0;
TreeClicks = 0;
TpS = 0;
CpS = 1;
T = 0;

StoreToRebuild = 1;
UpgradesToRebuild = 1;

AudioEnabled = 1;

Apples = 0;
Trucks = 0;
Farms = 0;
Mines = 0;
Factories = 0;
Machines = 0;
AntiMatters = 0;
LuckMakers = 0;
Tridents = 0;
StormCallers = 0;
Shipments = 0;

console.log('======== are you here to hack in trees? ========');

Beautify = function(what) {
    var str='';
	what=Math.floor(what);
	what=(what+'').split('').reverse();
	for (var i in what) {
		if (i%3==0 && i>0) str=','+str;
		str=what[i]+str;
	}
	return str;
}

BeautifyShort = function (num) {
    var suffixes = ["", "K", "M", "B", "T", "Q", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "DD", "TD", "QD", "Qa", "Qi", "Sx", "Sp", "Oc"];
    var suffixIndex = 0;

    num = Math.round(num);

    while (num >= 1000 && suffixIndex < suffixes.length - 1) {
        num /= 1000;
        suffixIndex++;
    }

    var formattedNum = num.toLocaleString() + suffixes[suffixIndex];
    return formattedNum;
}

TreeClick = function (e) {
    Trees += CpS;
    TotalTrees += CpS;
    TreeClicks++;

    if (AudioEnabled) new Audio("snd/click1.wav").play();
    new Pop("treeContainer", "+" + CpS);
}

Earn = function(amount) {
    Trees += amount;
    TotalTrees += amount;
}

Particles = [];
Particle = function (pic, x, y) {
    const particle = document.createElement("img");
    particle.setAttribute("src", "img/" + pic + ".png");
    particle.setAttribute("id", "particle");
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    document.body.appendChild(particle);
    Particles.push(particle);
}

Buyables = [];
Buyable = function (name, desc, pic, price, tps, func) {
    Buyables[name] = this;
    this.name = name;
    this.desc = desc;
    this.pic = pic;
    this.price = price;
    this.tps = tps;
    this.func = func;

    this.Buy = function () {
        if (Trees >= this.price) {
            Trees -= this.price;
            TpS += this.tps;

            this.price = Math.ceil(this.price * 1.1);
            this.func(1);

            if (AudioEnabled) new Audio("snd/buy1.wav").play();

            StoreToRebuild = 1;
        }
    };
}

new Buyable("Apple", "Grows apples", "apple", 10, 0.1, function () {
    Apples++;
});
new Buyable("Truck", "Carries trees", "truck", 100, 1, function () {
    Trucks++;
});
new Buyable("Farm", "Farms trees", "farm", 1100, 8, function () {
    Farms++;
});
new Buyable("Mine", "Mines trees", "mine", 12000, 47, function () {
    Mines++;
});
new Buyable("Factory", "Produces trees", "factory", 130000, 260, function () {
    Factories++;
});
new Buyable("Machine", "Prints trees", "machine", 1400000, 1400, function () {
    Machines++;
});
new Buyable(
    "Trident",
    "Scathers the sea for trees",
    "trident",
    20000000,
    7800,
    function () {
        Tridents++;
    }
);
new Buyable(
    "Storm Caller",
    "Storms plants trees",
    "stormcaller",
    330000000,
    44000,
    function () {
        StormCallers++;
    }
);
new Buyable(
    "Shipment",
    "Gets trees from other planets",
    "shipment",
    5100000000,
    260000,
    function () {
        Shipments++;
    }
);
new Buyable(
    "Anti Matter",
    "Turns Anti Matter into Trees",
    "antimatter",
    170000000000000,
    430000000 ,
    function () {
        AntiMatters++;
    }
);

RebuildStore = function () {
    var str = "";
    for (var i in Buyables) {
        var amount = 0;
        if (Buyables[i].name == "Apple") amount = Apples;
        if (Buyables[i].name == "Truck") amount = Trucks;
        if (Buyables[i].name == "Farm") amount = Farms;
        if (Buyables[i].name == "Mine") amount = Mines;
        if (Buyables[i].name == "Factory") amount = Factories;
        if (Buyables[i].name == "Machine") amount = Factories;
        if (Buyables[i].name == "Trident") amount = Tridents;
        if (Buyables[i].name == "Storm Caller") amount = StormCallers;
        if (Buyables[i].name == "Shipment") amount = Shipments;
        if (Buyables[i].name == "Anti Matter") amount = AntiMatters;
        str +=
            '<div id="buy' +
            Buyables[i].name +
            '" onclick="Buy(\'' +
            Buyables[i].name +
            '\');" style="' +
            (Buyables[i].name == "Elder Pledge" ? "display:none;" : "") +
            (Buyables[i].name == "Time machine" ? "font-size:90%;" : "") +
            "background-image:url(img/" +
            Buyables[i].pic +
            '.png);"><b>' +
            Buyables[i].name +
            " - <moni></moni> " +
            BeautifyShort(Buyables[i].price) +
            "</b><br>" +
            Buyables[i].desc +
            "" +
            (amount > 0 ? '<div class="amount">' + amount + "</div>" : "") +
            "</div>";
    }

    l("buyables").innerHTML = str;
    StoreToRebuild = 0;
}

Buy = function (what) {
    Buyables[what].Buy();
}

Upgrades = [];
Upgrade = function(name, desc, pic, price, func) {
    Upgrades[name] = this;
    this.name = name;
    this.desc = desc;
    this.pic = pic;
    this.func = func;
    this.price = price;

    this.Buy = function() {
        if (Trees >= price) {
            Trees -= price;
            
            this.func(1);
            if (AudioEnabled) new Audio("snd/buy1.wav").play();

            UpgradesToRebuild = 1;
        }
    }
}

DoubleCpSUpgrade = 100;
new Upgrade("Double CpS", "Doubles the CpS", "cursor", DoubleCpSUpgrade, function() {
    CpS *= 2;
    DoubleCpSUpgrade = Math.ceil(DoubleCpSUpgrade * 2);
    Upgrades["Double CpS"].price = DoubleCpSUpgrade;
});

IncreaseUpgrade = 100;
new Upgrade("Trees Increase", "Adds 5% to TpS", "tree", IncreaseUpgrade, function() {
    TpS += (TpS * 0.05);
    IncreaseUpgrade = Math.ceil(IncreaseUpgrade * 5);
    Upgrades["Trees Increase"].price = IncreaseUpgrade;
});

BuyUpgrade = function(what) {
    Upgrades[what].Buy();
}

RebuildUpgrades = function() {
    var str = "";
    for (var i in Upgrades) {
        str += '<div onclick="BuyUpgrade(\''+Upgrades[i].name+'\')" id="buy'+Upgrades[i].name+'" style="background-image:url(img/'+Upgrades[i].pic+'.png)" data-title="'+Upgrades[i].desc+'\nPrice: '+BeautifyShort(Upgrades[i].price)+'">' +
                '</div>'
    }

    l("upgrades").innerHTML = str;
    UpgradesToRebuild = 0;
}

ShowSettings = function() {
    l("stats").style.display = "none";
    l("info").style.display = "none";
    if (l("settings").style.display == "block") {
        l("settings").style.display = "none";
    } else {
        l("settings").style.display = "block";
    }
}

ShowStats = function() {
    l("settings").style.display = "none";
    l("info").style.display = "none";
    if (l("stats").style.display == "block") {
        l("stats").style.display = "none";
    } else {
        l("stats").style.display = "block";
    }
}

ShowInfo = function() {
    l("stats").style.display = "none";
    l("settings").style.display = "none";
    if (l("info").style.display == "block") {
        l("info").style.display = "none";
    } else {
        l("info").style.display = "block";
    }
}

ImportSave=function() {
    var save = prompt('Please paste in the text that was given to you on save export.','');
    if(save && save != "")
        ImportResponse('1|'+save);
    Save();
}

ExportSave=function() {
    var save = prompt('Copypaste this text and keep it somewhere safe! (yes, it\'s easy to edit - but remember : cheated trees taste terrible!)',MakeSaveString());
}

ImportResponse = function(response) {
    var r = response.split('|');
    if (response != '0' && response && r[0] == '1') {
        var i = 2;
        Trees = parseFloat(r[i]);i++;
        TpS = parseFloat(r[i]);i++;
        CpS = parseFloat(r[i]);i++;
        TotalTrees = parseInt(r[i]);i++;
        TreeClicks = parseInt(r[i]);i++;
        Apples = parseInt(r[i]);i++;
        Trucks = parseInt(r[i]);i++;
        Farms = parseInt(r[i]);i++;
        Mines = parseInt(r[i]);i++;
        Factories = parseInt(r[i]);i++;
        Machines = parseInt(r[i]);i++;
        AntiMatters = parseInt(r[i]);i++;
        Tridents = parseInt(r[i]);i++;
        StormCallers = parseInt(r[i]);i++;
        Shipments = parseInt(r[i]);i++;
        DoubleCpSUpgrade = parseInt(r[i]);i++;
        IncreaseUpgrade = parseInt(r[i]);

        StoreToRebuild=1;
        UpgradesToRebuild=1;
    }
}

ResetResponse=function() {
    location.reload(true);
}

MakeSaveString=function() {
    var str='';
    str+=Version+'|'+
    parseFloat(Trees)+'|'+
    parseFloat(TpS)+'|'+
    parseFloat(CpS)+"|"+
    parseInt(TotalTrees)+"|"+
    parseInt(TreeClicks)+'|'+
    parseInt(Apples)+'|'+parseInt(Buyables['Apple'].price)+'|'+
    parseInt(Trucks)+'|'+parseInt(Buyables['Truck'].price)+'|'+
    parseInt(Farms)+'|'+parseInt(Buyables['Farm'].price)+'|'+
    parseInt(Mines)+'|'+parseInt(Buyables['Mine'].price)+'|'+
    parseInt(Factories)+'|'+parseInt(Buyables['Factory'].price)+'|'+
    parseInt(Machines)+'|'+parseInt(Buyables['Machine'].price)+'|'+
    parseInt(AntiMatters)+'|'+parseInt(Buyables['Anti Matter'].price)+'|'+
    parseInt(Tridents)+'|'+parseInt(Buyables['Trident'].price)+'|'+
    parseInt(StormCallers)+'|'+parseInt(Buyables['Storm Caller'].price)+'|'+
    parseInt(Shipments)+'|'+parseInt(Buyables['Shipment'].price)+"|"+
    parseInt(DoubleCpSUpgrade)+'|'+
    parseInt(IncreaseUpgrade);
    return str;
}

LoadResponse=function(response) {
    var r = response.split('|');
    if (response != '0' && response && r[0] == '1') {
        var i = 2;
        Trees = parseInt(r[i]);i++;
        TpS = parseInt(r[i]);i++;
        CpS = parseInt(r[i]);i++;
        TotalTrees = parseInt(r[i]);i++;
        TreeClicks = parseInt(r[i]);i++;
        Apples = parseInt(r[i]);i++; Buyables["Apple"].price = parseInt(r[i]);i++; 
        Trucks = parseInt(r[i]);i++; Buyables["Truck"].price = parseInt(r[i]);i++; 
        Farms = parseInt(r[i]);i++; Buyables["Farm"].price = parseInt(r[i]);i++; 
        Mines = parseInt(r[i]);i++; Buyables["Mine"].price = parseInt(r[i]);i++; 
        Factories = parseInt(r[i]);i++; Buyables["Factory"].price = parseInt(r[i]);i++; 
        Machines = parseInt(r[i]);i++; Buyables["Machine"].price = parseInt(r[i]);i++; 
        AntiMatters = parseInt(r[i]);i++; Buyables["Anti Matter"].price = parseInt(r[i]);i++; 
        Tridents = parseInt(r[i]);i++; Buyables["Trident"].price = parseInt(r[i]);i++; 
        StormCallers = parseInt(r[i]);i++; Buyables["Storm Caller"].price = parseInt(r[i]);i++; 
        Shipments = parseInt(r[i]);i++; Buyables["Shipment"].price = parseInt(r[i]);i++;
        DoubleCpSUpgrade = parseInt(r[i]);i++;
        IncreaseUpgrade = parseInt(r[i]);

        StoreToRebuild=1;
        UpgradesToRebuild=1;
    }

    Main();
}

SaveTimer = 30 * 60;
Save = function() {
    var str=MakeSaveString();
    var now=new Date();
    now.setFullYear(now.getFullYear()+5);
    str='TreeSimulatorSave='+escape(str)+'; expires='+now.toUTCString+';';
    document.cookie=str;
    if (document.cookie.indexOf('TreeSimulatorSave') < 0)
        new Pop("floor", "Error while saving! Please export save instead.");

    SaveTimer=30*60;
    new Pop("floor", "Saved");
}

Load = function() {
    var str = "0";
    if(document.cookie.indexOf('TreeSimulatorSave') >= 0)
        str='1|'+unescape(document.cookie.split('TreeSimulatorSave=')[1]);
    
    LoadResponse(str);
    new Pop("floor", "Loaded");
}

Reset=function() {
    if(confirm('Do you REALLY want to start over?')) {
        document.cookie='TreeSimulatorSave=0; expires=Fri, 3 Aug 2001 20:47:11 UTC;';
        ResetResponse();
    }
}

Pops=[];
Pop=function(el,str) {
	this.el=el;
	this.str=str;
	this.life=0;
	this.offx=Math.floor(Math.random()*20-10);
	this.offy=Math.floor(Math.random()*20-10);
	Pops.push(this);
}

ToggleAudio = function() {
    AudioEnabled = !AudioEnabled;
    l("enableAudio").innerHTML = "Audio " + (AudioEnabled ? "ON" : "OFF");
}

Main = function () {
    if (StoreToRebuild) {
        RebuildStore();
        StoreToRebuild = 0;
    }

    if (UpgradesToRebuild) {
        RebuildUpgrades();
        UpgradesToRebuild = 0;
    }

    var str = "";
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

    for (var i in Buyables) {
        if (Trees >= Buyables[i].price) {
            l("buy" + Buyables[i].name).className = "";
        } else {
            l("buy" + Buyables[i].name).className = "grayed";
        }
    }
    for (var i in Upgrades) {
        if (Trees >= Upgrades[i].price) {
            l("buy" + Upgrades[i].name).className = "";
        } else {
            l("buy" + Upgrades[i].name).className = "grayed";
        }
    }

    l("treeClicks").innerHTML = Beautify(TreeClicks);

    l("trees").innerHTML = Beautify(Trees) + " trees";
    l("trees1").innerHTML = Beautify(Trees);
    var floater = Math.round(TpS * 10 - Math.floor(TpS) * 10);
    tps = Beautify(TpS) + (floater ? "." + floater : "");
    l("treesPerSecond").innerHTML = "per second: " + tps;
    l("treesPerSecond1").innerHTML = tps;
    l("totalTrees").innerHTML = Beautify(TotalTrees);

    if (T % 30 == 0) {
        document.title = "Tree Simulator - " + Beautify(Trees) + " trees";
        T = 0;
    }

    SaveTimer--;
    if(SaveTimer==0) Save();

    if (T % 30 == 0) Trees += TpS;
    T++;
    setTimeout(Main, 1000 / 30);
}

Load();