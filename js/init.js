

 $(document).ready(function(){
 
$('#new_game').click(function(){
	var zgoda=confirm("Czy na pewno chcesz porzucić obecną grę i rozpocząć nową?");
    if(zgoda) initiate();
});

$('#o_autorze').click(function(){
	alert('autor: Konrad Zdanowicz\nmail: zdanowicz.konrad@gmail.com\n\nKopiowanie zabronione');

});
	initiate();



 

 });