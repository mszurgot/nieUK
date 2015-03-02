$(document).ready(function(){
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