$(document).ready(function() {

    // Gestione passeggeri
    $("#a-").on("click", function() {
        var n = document.getElementById("passeggeri");
        var num_passeggeri = parseInt(n.textContent);
        if(num_passeggeri != 1) {
            num_passeggeri--;
            n.innerText = num_passeggeri;
        }
    });

    $("#aadd").on("click", function() {
        var n = document.getElementById("passeggeri");
        var num_passeggeri = parseInt(n.textContent);
        num_passeggeri++;
        n.innerText = num_passeggeri;
    });

    // Date consistenti
    $("#dataCheckin").on("change", function() {
        var checkin = document.getElementById("dataCheckin");
        var checkout = document.getElementById("dataCheckout");
        checkout.value = checkin.value;
    });

    $("#dataAndata").on("change", function() {
        var andata = document.getElementById("dataAndata");
        var ritorno = document.getElementById("dataRitorno");
        ritorno.value = andata.value;
    });

    $("#dataRitiro").on("change", function() {
        var ritiro = document.getElementById("dataRitiro");
        var consegna = document.getElementById("dataConsegna");
        consegna.value = ritiro.value;
    });

    //Ricerca voli
    $("#ricercavoli").on("click", function() {
        var cittapartenza = document.getElementById("cittaPartenza").value;
        if(cittapartenza == "none") {
            M.toast({html: "Devi selezionare la città di partenza!"});
            return false;
        }
        var cittaarrivo = document.getElementById("cittaArrivo").value;
        if(cittaarrivo == "none") {
            M.toast({html: "Devi selezionare la città di arrivo!"});
            return false;
        }
        if(cittapartenza == cittaarrivo) {
            M.toast({html: "La città di arrivo non può essere la stessa!"});
            return false;
        }
        var dataandata = document.getElementById("dataAndata").value;
        var anno = dataandata.substr(8, 2);
        var mese = dataandata.substr(3, 2);
        var giorno = dataandata.substr(0 ,2);
        dataandata = anno+mese+giorno;
        var dataritorno, rtn;
        if($("#check").is(":checked")) {
            dataritorno = document.getElementById("dataRitorno").value;
            anno = dataandata.substr(8, 2);
            mese = dataandata.substr(3, 2);
            giorno = dataandata.substr(0 ,2);
            dataritorno = anno+mese+giorno+"/";
            rtn = "1";
        }
        else {
            dataritorno = "";
            rtn = "0";
        }
        var passeggeri = document.getElementById("passeggeri").textContent;
        var link = "https://www.skyscanner.it/trasporti/voli/"+cittapartenza+"/"+cittaarrivo+"/"+dataandata+"/"+dataritorno+"?adults="+passeggeri+"&children=0&adultsv2="+passeggeri+"&childrenv2=&infants=0&cabinclass=economy&rtn="+rtn+"&preferdirects=true&outboundaltsenabled=false&inboundaltsenabled=false&ref=home#results"
        window.open(link, "_blank");
        window.focus();
    });

    //Ricerca hotel
    $("#ricercahotel").on("click", function() {
        var citta = document.getElementById("cittaHotel").value;
        if(citta == "none") {
            M.toast({html: "Devi selezionare una città!"});
            return false;
        }
        var datacheckin = document.getElementById("dataCheckin").value;
        var anno = datacheckin.substr(6, 4);
        var mese = datacheckin.substr(3, 2);
        var giorno = datacheckin.substr(0 ,2);
        datacheckin = anno+"-"+mese+"-"+giorno;
        var datacheckout = document.getElementById("dataCheckout").value;
        anno = datacheckout.substr(6, 4);
        mese = datacheckout.substr(3, 2);
        giorno = datacheckout.substr(0 ,2);
        datacheckout = anno+"-"+mese+"-"+giorno;
        var persone = document.getElementById("numeroPersoneHotel").value;
        var stanze = document.getElementById("numeroStanze").value;
		var link = "https://www.skyscanner.it/hotels/search?entity_id="+citta+"&checkin="+datacheckin+"&checkout="+datacheckout+"&adults="+persone+"&rooms="+stanze;        window.open(link, "_blank");
        window.focus();
    });

    //Ricerca auto
    $("#ricercaauto").on("click", function() {
        var cittaritiro = document.getElementById("cittaRitiro").value;
        if(cittaritiro == "none") {
            M.toast({html: "Devi selezionare una città!"});
            return false;
        }
        var cittaconsegna = document.getElementById("cittaConsegna").value;
        var dataritiro = document.getElementById("dataRitiro").value;
        var anno = dataritiro.substr(6, 4);
        var mese = dataritiro.substr(3, 2);
        var giorno = dataritiro.substr(0 ,2);
        dataritiro = anno+"-"+mese+"-"+giorno;
        var dataconsegna = document.getElementById("dataConsegna").value;
        anno = dataconsegna.substr(6, 4);
        mese = dataconsegna.substr(3, 2);
        giorno = dataconsegna.substr(0 ,2);
        dataconsegna = anno+"-"+mese+"-"+giorno;
        var oraritiro = document.getElementById("oraRitiro").value;
        var oraconsegna = document.getElementById("oraConsegna").value;
        var etaconducente = document.getElementById("etaConducente").value;
        if(isNaN(etaconducente) || Number(etaconducente) < 21 || Number(etaconducente) > 99) {
            M.toast({html: "Devi inserire un'età compresa tra 21 e 99!"});
            return false;
        }
        var link = "https://www.skyscanner.it/autonoleggio/risultati/"+cittaritiro+"/"+cittaconsegna+"/"+dataritiro+"T"+oraritiro+"/"+dataconsegna+"T"+oraconsegna+"/"+etaconducente;
        window.open(link, "_blank");
        window.focus();
    });

    //Città consegna = città ritiro
    $("#cittaRitiro").on("change", function() {
        var cittaritiro = document.getElementById("cittaRitiro");
        var cittaconsegna = document.getElementById("cittaConsegna");
        cittaconsegna.value = cittaconsegna[cittaritiro.selectedIndex].value;
    });

    //Meteo
    $("#cittaArrivo").on("change", function() {
        var id = "3169070";
        var m = '<%= OpenWeather::Current.city_id("3169070", { units: "metric", lang: "IT", APPID: Rails.application.credentials.dig(:OPEN_WEATHER_KEY) })["name"] %>'
        var n = '<%= OpenWeather::Current.city_id("3169070", { units: "metric", lang: "IT", APPID: Rails.application.credentials.dig(:OPEN_WEATHER_KEY) })["main"] %>'
        $("#nomeCitta").html(m);
        $("#meteoCitta").html(n);
    });

});



// Cambio id ricerca

function set_voli_id() {
    document.getElementById("ricercavoli").removeAttribute("style");
    document.getElementById("ricercahotel").style.display="none";
    document.getElementById("ricercaauto").style.display="none";
    return false;
}

function set_hotel_id() {
    document.getElementById("ricercavoli").style.display="none";
    document.getElementById("ricercahotel").removeAttribute("style");
    document.getElementById("ricercaauto").style.display="none";
    return false;
}

function set_auto_id() {
    document.getElementById("ricercavoli").style.display="none";
    document.getElementById("ricercahotel").style.display="none";
    document.getElementById("ricercaauto").removeAttribute("style");
    return false;
}
