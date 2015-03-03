$(document).ready(function(){
	var slowo = 'wieloryb';//slowko ustawione na sztywno na potrzebe testow
	var translates = $('#translates');
	
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		error: function() { alert('błąd przy pozyskiwaniu danych z usługi sieciowej'); },
		url: 'https://glosbe.com/gapi/translate?from=pol&dest=eng&format=json&phrase='+slowo+'&page=1&pretty=false',
		success: function(data){
			console.log('success',data);
			//generalnie tu są jakieś problemy aktualnie
			$.each(data.tuc[data.tuc.length - 1].meanings,function(i,translation){
				translates.append(translation.text);
			});
			
		}
	});
	  
	var licznik=0;
	$("#accept-button").on('click', function(){
	licznik=licznik+1;
	switch (licznik){
		case 1:	
				$("#fiszka").css({border: '10px solid #00A9E0'});
			break;
		case 2:
			$("#fiszka").css({border: '10px solid #98C73D'});
			break;
		case 3:
			$("#fiszka").css({border: '10px solid #D0DD2B'});
			break;
		default:
			$("#fiszka").css({border: '10px solid #00F'});
			break;
		}	
	});
		
		
	$("#more").on('click', function(){
	
		$("#stats").toggle(1000).css({display: "block"});
	
	});

});