
var wolnych=100;
var ruchaktywny=1;
var koniecgry=1;
var fazaruchu=0;
var id1=0;
var id2=0;
var usuniecielinii=5;
var punkty=0;
var k=6;

function id(x,y)
{
	return "#tile"+x+"t"+y;
}

function stan_value(id)
{
	return $(id).attr('class').charAt(4);
}

function ustawstan(id,stan)
{
	
		$(id).removeAttr('class');	
		$(id).addClass('type'+stan); 
	
		$(id).css("opacity",0.1);
		$(id).animate({
	    opacity: 1},800);
}

function wylosuj()
{
	if(wolnych<1)
	{	
		return 0;
	}

	var mozna=0;
	var stan=Math.floor(Math.random()*(k)+1); 
	
	var losx=Math.floor(Math.random()*10);
	var losy=Math.floor(Math.random()*10);
	
	while(mozna==0)
	{
		if(stan_value(id(losx,losy))!=0)
		{
			losx=Math.floor(Math.random()*10);
			losy=Math.floor(Math.random()*10);
		}
		else mozna=1;		
	}

	ustawstan(id(losx,losy),stan);
	--wolnych;
	return 1;
} 

function sprawdzpoziom(x,y,max,stan)
{
	var dlugosc=1;
	while(++x<max)
	{

		if(stan_value(id(x,y))==stan) dlugosc++;
		else x=max;			
	}
	return dlugosc;
}

function sprawdzpion(x,y,max,stan)
{
	var dlugosc=1;
	while(++y<max)
	{

		if(stan_value(id(x,y))==stan) dlugosc++;
		else y=max;			
	}
	return dlugosc;
}

function sprawdzskos1(x,y,max,stan)
{
	var dlugosc=1;
	while(--y>=0 && ++x<max)
	{

		if(stan_value(id(x,y))==stan) dlugosc++;
		else {y=-1; x=max;}			
	}
	return dlugosc;
}


function sprawdzskos2(x,y,max,stan)
{
	var dlugosc=1;
	while(++y<max && ++x<max)
	{

		if(stan_value(id(x,y))==stan) dlugosc++;
		else {y=max; x=max;}			
	}
	return dlugosc;
}

function usunpoziom(x,y,dl)
{

	var i;
	if(dl>0)
	{
		for(i=0;i<dl;i++)
		{
			ustawstan(id(x+i,y),0);
		}
		punkty+=dl;
	}

}

function usunpion(x,y,dl)
{

	var i;

	if(dl>0)
	{
		for(i=0;i<dl;i++)
		{
			ustawstan(id(x,y+i),0);
		}
		punkty+=dl;
	}

}

function usunskos1(x,y,dl)
{

	var i;
	if(dl>0)
	{
		for(i=0;i<dl;i++)
		{
			ustawstan(id(x+i,y-i),0);
		}
			punkty+=dl;
	}

}

function usunskos2(x,y,dl)
{

	var i;

	if(dl>0)
	{
		for(i=0;i<dl;i++)
		{
			ustawstan(id(x+i,y+i),0);
		}
			punkty+=dl;
	}

}
function przeliczpuste()
{
	var i=0;
	var j=0;
	var max=10;
	wolnych=0;
	for(i=max-1;i>=0;i--)
	{
		for(j=max-1;j>=0;j--)
		{
			
			stanobecnego=stan_value(id(i,j));
			if(stanobecnego==0) wolnych++;
		}
	}
	$('#wolnefield').text(wolnych);
}
function sprawdzrozwiazania()
{
	var i=0;
	var j=0;
	var max=10;
	var dlug=0;
	//indeksy do usuniecia
	usun=Array();
	usun['pozx'] = -1;
	usun['pozy'] = -1;	usun['skos1x'] = -1;

	usun['pionx'] = -1;
	usun['piony'] = -1;
	usun['skos1y'] = -1;
	usun['skos2x'] = -1;
	usun['skos2y'] = -1;
	usun['pozdl']=-1;
	usun['piondl']=-1;
	usun['skos1dl']=-1;
	usun['skos2dl']=-1;	
	trigger=0;
	for(i=max-1;i>=0;i--)
	{

		for(j=max-1;j>=0;j--)
		{
			
			stanobecnego=stan_value(id(i,j));
			if(stanobecnego!=0)
			{
				dlug=sprawdzpoziom(i,j,max,stan_value(id(i,j)));
				if(dlug>=usuniecielinii)
				{
					usun['pozx']=i;
					usun['pozy']=j;
					usun['pozdl']=dlug;
					
					trigger=1;
				}
				dlug=sprawdzpion(i,j,max,stan_value(id(i,j)));
				if(dlug>=usuniecielinii)
				{

					usun['pionx']=i;
					usun['piony']=j;
					usun['piondl']=dlug;
					
					trigger=1;
				}				
				dlug=sprawdzskos1(i,j,max,stan_value(id(i,j)));
				if(dlug>=usuniecielinii)
				{
					usun['skos1x']=i;
					usun['skos1y']=j;
					usun['skos1dl']=dlug;
					
					trigger=1;
				}		
				dlug=sprawdzskos2(i,j,max,stan_value(id(i,j)));
				if(dlug>=usuniecielinii)
				{
					usun['skos2x']=i;
					usun['skos2y']=j;
					usun['skos2dl']=dlug;
					
					trigger=1;
				}
				
					

			}
			
			//if(dlug>4) alert(dlug+" dla "+i+" i "+j+".");
			dlug=0;
		}
	
	}
	if(trigger)
	{
		usunpoziom(usun['pozx'],usun['pozy'],usun['pozdl']);
		usunpion(usun['pionx'],usun['piony'],usun['piondl']);
		usunskos1(usun['skos1x'],usun['skos1y'],usun['skos1dl']);
		usunskos2(usun['skos2x'],usun['skos2y'],usun['skos2dl']);
		usun['pionx'] = -1;
		usun['piony'] = -1;
		usun['skos1x'] = -1;
		usun['skos1y'] = -1;
		usun['skos2x'] = -1;
		usun['skos2y'] = -1;
		usun['piondl']=-1;
		usun['skos1dl']=-1;
		usun['skos2dl']=-1;	
		
		$('#punktyfield').text(punkty);
	    $('#wolnefield').text(wolnych);
		//sprawdzrozwiazania();
	}
	return trigger;
}

function ruch()
{
	var ruchaktywny=1;
	var koniecgry=1;
	var fazaruchu=0;
	var id1=0;
	var id2=0;
	var usunieto=0;
		$("#overlay div").click(function(event){		

			if(koniecgry<1)
			{
				alert("Koniec gry. "+punkty+" punktów. Gratulacje!");
				initiate();
				
			}
			else if(ruchaktywny==0)
			{
				alert("ruch nieaktywny");
			}
			else if(fazaruchu==0)
			{
	
				id1="#"+$(this).attr('id');
				fazaruchu=1;
				if($(this).attr('class').charAt(4)>0)
				{
					$(this).html('<img src="css/tiles/highlight.png"/>');
				}
			}
			else if(fazaruchu==1)
			{
				
				id2="#"+$(this).attr('id');
				
				
				if(id1==id2 || (stan_value(id1)==stan_value(id2) && stan_value(id1)==0))
				{
					fazaruchu=0;
					$(id1).html('');
				}
				else if(stan_value(id1)!=0 && stan_value(id2)!=0)
				{
					$(id1).html('');
					id1="#"+$(this).attr('id');
					$(this).html('<img src="css/tiles/highlight.png"/>');
					fazaruchu=1;
				
				}
				else
				{

					var temp=stan_value(id1);
		
					ustawstan(id1,stan_value(id2));
					ustawstan(id2,temp);
					$(id2).html('');
					$(id1).html('');
					fazaruchu=2;
					if(sprawdzrozwiazania())
					{
						fazaruchu=0;
						przeliczpuste();
					}
					
				}
			
				if(fazaruchu==2)
				{
					$(id2).html('');
					$(id1).html('');
					wylosuj();
					wylosuj();
					wylosuj();
					sprawdzrozwiazania();
					fazaruchu=0;
					przeliczpuste();
					koniecgry=wolnych;
					$(id2).html('');
					$(id1).html('');

				}				
			}
		});
	
}
		
  
  
function initiate()
{

	$('#wolnefield').text(wolnych);
	$('#punktyfield').text(punkty);
	$('#overlay *').remove();

    var i;
	var j;
	for (i=0;i<10;i++)
	{
		for (j=0;j<10;j++)
		{
		$('#overlay').append('<div id="tile'+j+'t'+i+'" class="type0"></div>');	
		}
	}

	wylosuj();
	wylosuj();
	wylosuj();
	przeliczpuste();	
	ruch();
}


