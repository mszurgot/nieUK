$(document).ready(function(){
	var wskaznikSlowa = 0;
	var czyWyswietlicOdpowiedz = false;
	var ileWszystkichSlowek = 1;
	var wskaznikStosu = 0;	//wartości 0-3
	var stosy = [['mysz','ryba','kot','kogut','mrówka','jastrząb'],[],[],[]];
	var wczytaneSlowa = [];
	
	$("#fiszka > h3").text(stosy[wskaznikStosu][wskaznikSlowa]);
	ladujOdpowiedzi();
	$('#alert').children().toggle(false);
	
	$("#check").on("click",function(){
		var answer = $("#answer").val();
		console.log('checkVal',answer);
		var correct = false;
		$.each(wczytaneSlowa, function(it,slowo){
			if(answer === slowo){
				correct = true;
			}
		});
		
		if(correct){
			nowyAlert("Fuckn' awesome, Man", "alert-success");
		}else{
			nowyAlert("You suck! Try again faggot", "alert-danger");
		}
		appendWczytaneSlowa(); 
	});
	
	function nowyAlert(tresc, klasa){
		$tmp = $('#alert div');
		$tmp.slideUp(100).removeClass("alert-danger alert-success").addClass("alert "+klasa);
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
			url: 'https://glosbe.com/gapi/translate?from=pol&dest=eng&format=json&phrase='+stosy[wskaznikStosu][wskaznikSlowa]+'&page=1&pretty=false',
			success: function(data){
				console.log('success',data);
				for(var j = 0; j < data.tuc.length - 2 ; j++){//tu warto kiedys zmienic aby dodawane slowka nie powtarzaly sie
					wczytaneSlowa[j]=data.tuc[j].phrase.text;
				}
				console.log("ilosc wczytanych slow",wczytaneSlowa.length);
				uaktualnijWielkosciStosow();
				
			}
		});
	}  
	
	$("#wrong-button").on('click', function(){
		//kod
	});

	$("#accept-button").on('click', function(){
		//kod
		uaktualnijWielkosciStosow();
	});
			
	$("#more").on('click', function(){
		$("#stats").toggle(1000).css({display: "block"});
	});

});