$(document).ready(function(){
	var odpowiedziane = false;
	//var czyWyswietlicOdpowiedz = false;
	var ileWszystkichSlowek = 1;
	var wskaznikStosu = 0;	//wartości 0-3
	var stosy = [[],[],[],[]];
	var wczytaneSlowa = [];
	var ileDobrych = 0;
	var ileZlych = 0;
	var ileRazyOdpowiedziane = 0;
	//var alternatywaSessionStorage; //tablica przechowująca
	
	ladujBaze(0);
	
	$("#check").on("click",function(){
		if(odpowiedziane){
			odpowiedziane =false;
			$(this).removeClass("btn-success").addClass("btn-info").text("Check!");
			$("#alert div").slideUp(100);
			//console.log("wielkosc tablicy",stosy[wskaznikStosu].length);
			if(stosy[wskaznikStosu].length !== 0){
				wczytajSlowaZLocalStorage();
			}else {
				//wymuszone wybieranie stosu
				for(var i = 0 ; i<=3 ; i++){
					$("#btn"+i).css({"opacity":(stosy[i].length === 0)?0.3:1});
				}
				uaktualnijWielkosciStosow();
				$("#answer-input-group").slideUp(400);
				$("#przyciskiStosy").slideDown(600);
			}
		
		}else{
			var answer = $("#answer").val();
			//console.log('checkVal',answer);
			var correct = false;
			$.each(wczytaneSlowa, function(it,slowo){
				if(answer.toLowerCase().trim() === slowo.toLowerCase().trim()){
					correct = true;
				}
			});
			if(correct){
				ileDobrych++;
				nowyAlert("Fuckn' awesome, Man", "alert-success");
				if(wskaznikStosu < 3){
					stosy[wskaznikStosu+1].push(stosy[wskaznikStosu].shift());
				}else{
					var nauczone = stosy[wskaznikStosu].shift();
					nowyAlert("You've learned new word: "+nauczone+".", "alert-info");
				}
			}else{
				ileZlych++;
				nowyAlert("You suck! Try again faggot", "alert-danger");
				if(wskaznikStosu > 0){
					stosy[wskaznikStosu-1].push(stosy[wskaznikStosu].shift());
				}
			}
			localStorage.setItem("stosy",stosy);
			ileRazyOdpowiedziane++;
			$(this).removeClass("btn-info").addClass("btn-success").text("Confirm");
			odpowiedziane = true;	
			appendWczytaneSlowa();
		}
	});
	
	//te przyciski dałoby sie jakoś zapisać w pętli
	$("#btn0").on("click",function(){
		if(stosy[0].length !== 0){
			ladujNowyStos(0);
			$("#answer-input-group").slideDown(400);
			$("#przyciskiStosy").slideUp(600);
		}
	});
	$("#btn1").on("click",function(){
		if(stosy[1].length !== 0){
			ladujNowyStos(1);
			$("#answer-input-group").slideDown(400);
			$("#przyciskiStosy").slideUp(600);
		}
	});
	$("#btn2").on("click",function(){
		if(stosy[2].length !== 0){
			ladujNowyStos(2);
			$("#answer-input-group").slideDown(400);
			$("#przyciskiStosy").slideUp(600);
		}
	});
	$("#btn3").on("click",function(){
		if(stosy[3].length !== 0){
			ladujNowyStos(3);
			$("#answer-input-group").slideDown(400);
			$("#przyciskiStosy").slideUp(600);
		}
	});
	$("#animals").on("click",function(){
		ladujBaze(0);
	});
	$("#food").on("click",function(){
		ladujBaze(1);
	});
	$("#sports").on("click",function(){
		ladujBaze(2);
	});
	
	function ladujBaze(ktoraBaza){
		var baza;
		ileDobrych = 0;
		ileZlych = 0;
		ileRazyOdpowiedziane = 0;
		switch(ktoraBaza){
			case 0: {
				baza = ['mysz','ryba','kot','kogut','mrówka','jastrząb'];
				break;
				}
			case 1:{
				 baza = ['ser','pieprz','mięso','sól','ogórek'];
				 break;
			}
			case 2:{
				baza = ['koszykówka','siatkówka','kajakarstwo'];
				break;
			}
		}
		if(typeof(Storage) !== "undefined") {
			//document.getElementById("#footer").innerHTML = "<p>Code for localStorage/sessionStorage.</p>";
			pobierzDoLocalStorage(baza);
			//console.log(localStorage.getItem(stosy[0][0]));
		} else {
			//wypadaloby dodac obluge dla przegladarek nieobslugujacych session storage
		}
		if(stosy[0]!==null){
			stosy=[[],[],[],[]];
			stosy[0]=baza;
			ileWszystkichSlowek = stosy[0].length + stosy[1].length + stosy[2].length + stosy[3].length;
			ladujNowyStos(0);
			uaktualnijWielkosciStosow();
		}
	}
	
	function ladujNowyStos(numerStosu){
		wskaznikStosu = numerStosu;
		//console.log("wlazl",getKolorStosu(wskaznikStosu));
		$("#fiszka").css({"border-color":getKolorStosu(wskaznikStosu)});
		odpowiedziane = false;
		correct = false;
		stosy[wskaznikStosu]=tasuj(stosy[wskaznikStosu]);
		wczytajSlowaZLocalStorage();
	}
	
	function getKolorStosu(){
		switch(wskaznikStosu){
			case 0: return "#67CDDC";
			case 1: return "#00A9E0";
			case 2: return "#98C73D";
			case 3: return "#D0DD2B";
		}
	}
	
	function tasuj(array) {
		var counter = array.length, temp, index;
		while (counter > 0) {
			index = Math.floor(Math.random() * counter);
			counter--;
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	}
	
	function nowyAlert(tresc, klasa){
		$tmp = $('#alert div');
		$tmp.slideUp(100).removeClass().addClass("alert "+klasa);
		$("#alert div p").text(tresc);
		$tmp.slideDown(100);
	}
	  
	function uaktualnijWielkosciStosow(){
		$('#answered-3-times-badge').text(stosy[3].length);
		$('#answered-2-times-badge').text(stosy[2].length);
		$('#answered-badge').text(stosy[1].length);
		$('#unanswered-badge').text(stosy[0].length);
		$('#answered-3-times').css("width",(stosy[3].length*100/ileWszystkichSlowek)+"%");
		$('#answered-2-times').css("width",(stosy[2].length*100/ileWszystkichSlowek)+"%");
		$('#answered').css("width",(stosy[1].length*100/ileWszystkichSlowek)+"%");
		$('#unanswered').css("width",(stosy[0].length*100/ileWszystkichSlowek)+"%");
		$('#ile-dobrych').text(ileDobrych);
		$('#ile-zlych').text(ileZlych);
		$('#ile-slowek').text(ileWszystkichSlowek);
		if(ileRazyOdpowiedziane>0){$('#wydajnosc').text(Math.round(ileDobrych*100/(ileRazyOdpowiedziane),2));}
	}
	
	function appendWczytaneSlowa(){
		var translates = $('#translates');
		translates.text("");
		translates.append("<b>Translations</b>: ");
		for(var i=0 ; i < wczytaneSlowa.length ; i++){
			translates.append(wczytaneSlowa[i] + ((i < wczytaneSlowa.length-1)?", ":"."));
		}
	}

	//seria zapytań GET do API glosbe.com wczytujace do local storage pozyskane tlumaczenia dla tablicy podanych slow
	function pobierzDoLocalStorage(tablicaSlow){
		//var czyObslugujeSessionStorage = (typeof(Storage) !== "undefined")?true:false;
		$.each(tablicaSlow, function(it, slowo){
			$.ajax({
				type: 'GET',
				dataType: 'jsonp',
				crossDomain: true,
				error: function() { alert('błąd przy pozyskiwaniu danych z usługi sieciowej'); },
				url: 'https://glosbe.com/gapi/translate?from=pol&dest=eng&format=json&phrase='+slowo+'&page=1&pretty=false',
				success: function(data){
					//console.log('success',data);
					var tmp=[];
					var j=0;
					for(var i = 0; i < data.tuc.length - 2 ;i++){//tu warto kiedys zmienic aby dodawane slowka nie powtarzaly sie
						try{
						tmp[j]=data.tuc[j].phrase.text;//try catch do zrobienia!
						j++;
						}catch(err){
							//console.log(err.message);
						}
					}
					//console.log(slowo + " : "+tmp);
					//console.log("ilosc wczytanych slow",wczytaneSlowa.length);
					if(slowo){
						localStorage.setItem(slowo, tmp);
					}
				}	
			});
		});
	}	
	
	function wczytajSlowaZLocalStorage(){
		wczytaneSlowa = [];
		wczytaneSlowa = localStorage.getItem(stosy[wskaznikStosu][0]).split(",");
		$("#fiszka").toggle(400);
		$("#fiszka > h3").text(stosy[wskaznikStosu][0]);
		$("#translates").text("");
		$("#fiszka").toggle(400);
		$("#answer").val("");
		uaktualnijWielkosciStosow();
	}

	$("#more").on('click', function(){
		$("#stats").toggle(1000).css({display: "block"});
	});

});