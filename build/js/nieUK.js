$(document).ready(function(){
	var odpowiedziane = false;
	//var czyWyswietlicOdpowiedz = false;
	var ileWszystkichSlowek = 1;
	var wskaznikStosu = 0;	//wartości 0-3
	var stosy = [['mysz','ryba','kot','kogut','mrówka','jastrząb'],[],[],[]];
	var wczytaneSlowa = [];
	
	//init
	ileWszystkichSlowek = stosy[0].length + stosy[1].length + stosy[2].length + stosy[3].length;
	ladujNowyStos(0);
	
	$("#check").on("click",function(){
		if(odpowiedziane){
			odpowiedziane =false;
			$(this).removeClass("btn-success").addClass("btn-info").text("Check!");
			$("#alert div").slideUp(100);
			console.log("wielkosc tablicy",stosy[wskaznikStosu].length);
			if(stosy[wskaznikStosu].length !== 0){
				ladujOdpowiedzi();
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
				if(answer === slowo){
					correct = true;
				}
			});
			if(correct){
				nowyAlert("Fuckn' awesome, Man", "alert-success");
				if(wskaznikStosu < 3){
					stosy[wskaznikStosu+1].push(stosy[wskaznikStosu].shift());
				}else{
					var nauczone = stosy[wskaznikStosu].shift();
					nowyAlert("You've learned new word: "+nauczone+".", "alert-info");
				}
			}else{
				nowyAlert("You suck! Try again faggot", "alert-danger");
				if(wskaznikStosu > 0){
					stosy[wskaznikStosu-1].push(stosy[wskaznikStosu].shift());
				}
			}
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
	
	function ladujNowyStos(numerStosu){
		wskaznikStosu = numerStosu;
		//console.log("wlazl",getKolorStosu(wskaznikStosu));
		$("#fiszka").css({"border-color":getKolorStosu(wskaznikStosu)});
		odpowiedziane = false;
		correct = false;
		stosy[wskaznikStosu]=tasuj(stosy[wskaznikStosu]);
		ladujOdpowiedzi();

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
	}
	
	function appendWczytaneSlowa(){
		var translates = $('#translates');
		translates.text("");
		translates.append("<b>Translations</b>: ");
		for(var i=0 ; i < wczytaneSlowa.length ; i++){
			translates.append(wczytaneSlowa[i] + ((i < wczytaneSlowa.length-1)?", ":"."));
		}
	}
	
	function ladujOdpowiedzi(){
		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			crossDomain: true,
			error: function() { alert('błąd przy pozyskiwaniu danych z usługi sieciowej'); },
			url: 'https://glosbe.com/gapi/translate?from=pol&dest=eng&format=json&phrase='+stosy[wskaznikStosu][0]+'&page=1&pretty=false',
			success: function(data){
				//console.log('success',data);
				wczytaneSlowa=[];
				var j=0;
				for(var i = 0; i < data.tuc.length - 2 ;i++){//tu warto kiedys zmienic aby dodawane slowka nie powtarzaly sie
					try{
					wczytaneSlowa[j]=data.tuc[j].phrase.text;//try catch do zrobienia!
					j++;
					}catch(err){
						console.log(err.message);
					}
				}
				//console.log("ilosc wczytanych slow",wczytaneSlowa.length);
				uaktualnijWielkosciStosow();
				$("#fiszka").toggle(400);
				$("#fiszka > h3").text(stosy[wskaznikStosu][0]);
				$("#translates").text("");
				$("#fiszka").toggle(400);
				$("#answer").val("");
				
			}
		});
	}  

	$("#more").on('click', function(){
		$("#stats").toggle(1000).css({display: "block"});
	});

});