function discover_keys() {
	$("#demo-form").submit();
}

function select_dataset(name) {
	$("#sel-dataset").val(name);
	$("#class-selection").show();
	$("#thr-selection").hide();
	$("#go-selection").hide();
	
	$(".classes").hide();
		
	if(name == "OAEI2010 Restaurant1")
		$("#oaei10-restaurant1").show();
	if(name == "OAEI2010 Persons1.1")
		$("#oaei10-persons11").show();
	if(name == "DBpedia 3.9")
		$("#dbp39-monument").show();
	
}

function select_class(name) {
	$("#sel-class").val(name);
	$("#thr-selection").show();
	$("#thr-slider").slider();
	$("#go-selection").show();
}


function get_keys(cname, alpha) {
	var jqxhr = $.ajax( "get_keys.php?class="+cname+"&alpha="+alpha )
	.done(function( html ) {
		$("#loadhere").html( html );
	})
	.fail(function() {
		alert( "error" );
	});
}

// ===================================================================

function carica(oggetto, page) {
	var jqxhr = $.ajax( oggetto+".php?page="+page )
	.done(function( html ) {
		$("#results").html( html );
	})
	.fail(function() {
		alert( "error" );
	});
}

function carica3(oggetto, id, page) {
	var jqxhr = $.ajax( oggetto+".php?id="+id+"&page="+page )
	.done(function( html ) {
		$("#results").html( html );
	})
	.fail(function() {
		alert( "error" );
	});
}

function registrati() {
	$("#alerts").html('<div class="alert alert-success">PolimiAdvisor &egrave; ora in versione beta limitata. Per fare richiesta, <a href="feedback.php" class="alert-link">scrivici</a>!</div>');
}

function mipiace(recens, voto) {
	jqxhr = $.ajax( "content/mi-piace.php?recens="+recens+"&voto="+voto )
	.done(function( html ) {
		if(voto == 1) {
			$("#si-"+recens).addClass("active");
			$("#no-"+recens).removeClass("active");
		} else {
			$("#no-"+recens).addClass("active");
			$("#si-"+recens).removeClass("active");
		}
		aggiorna_voti(recens);
	})
	.fail(function() {
	});
}

function aggiorna_voti(recens) {
	jqxhr = $.ajax( "content/somma-voti-recensione.php?recens="+recens )
	.done(function( html ) {
		$("#voto-"+recens).val( html );
	})
	.fail(function() {
	});
}

function valutazione(n) {
	for(i=1; i<=5; i++)
		if(i == n)
			$("#val"+i).addClass("active");
		else
			$("#val"+i).removeClass("active");
	$("#val").val(n);
}

function invia_recensione(id_corso) {
	if(!id_corso)
		return;
	titolo = $("#titolo").val();
	testo = $("#testo").val();
	val = $("#val").val();
	jqxhr = $.ajax( "content/invia-recensione.php?titolo="+encodeURIComponent(titolo)+"&testo="+encodeURIComponent(testo)+"&corso="+id_corso+"&val="+val )
	.done(function( html ) {
		$("#scrivi").html( html );
		carica3("content/recensioni-corso", id_corso, 1);
	})
	.fail(function() {
	});
}

function controlla(id_corso) {
	if($("#titolo").val() != "" && $("#testo").val() != "" && $("#val").val() != "")
		invia_recensione(id_corso);
	else
		alert("Assicurati di aver compilato tutti i campi!");
}

function attiva_utente() {
	password = $("#password").val();
	password2 = $("#password2").val();
	if(password != password2) {
		alert("Le password non coincidono!");
		return;
	}
	email = $("#email").val();
	username = $("#username").val();
	if(email == "" || username == "" || password == "") {
		alert("Compilare tutti i campi!");
		return;
	}
	jqxhr = $.ajax( "content/attiva.php?email="+encodeURIComponent(email)+"&username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password) )
	.done(function( html ) {
		if(html == "0") {
			$("#risp-attivazione").html("Ci dispiace, ma questa email non sembra far parte dei beta tester!<br>Puoi comunque fare richiesta <a href='mailto:info@polimiadvisor.it'>scrivendoci</a>.");
		}
		if(html == "1") {
			$("#puls-attivazione").html("");
			$("#risp-attivazione").html("Utente attivato! Ora inserisci i dati in alto a destra per loggarti.");
		}
		if(html == "2") {
			$("#risp-attivazione").html("Nome utente gi&agrave; in uso! Riprovare.");
		}
		if(html == "3") {
			$("#risp-attivazione").html("Nome utente non valido! Sono ammessi caratteri alfanumerici e underscore.");
		}
		if(html == "4") {
			$("#risp-attivazione").html("L'utente ci risulta essere gi&agrave; attivo! :)");
		}
	})
	.fail(function() {
		$("#risp-attivazione").html("C'&egrave; stato un problema di connessione. Se persiste, contattare il supporto.");
	});
}


