$(document).ready(function(){
  $("#frmloading").hide();
  $("#tabelinput").hide();
  findclick();
  $('.resize').each(growTextarea);
});

function enterfind(event){
  if(event.keyCode==13){
    findclick();
  }else{
    return ;
  }
};

function findclick(){
  var n = $(".txtfield").length;
  var txtfield = '';
  var txtparameter = '';
  var txtdata = '';
  var data = '';
  
  if(n > 1){
    $(".txtfield").each(function () {
      txtfield += $(this).val()+"|";
    });
    
    $(".txtparameter").each(function () {
      txtparameter += $(this).val()+"|";
    });
        
    $(".txtdata").each(function () {
      txtdata += $(this).val()+"|";
    });
            
    data = "txtpage="+$("#txtpage").val()+
         "&txtperpage="+$("#txtperpage").val()+
         "&txtfield="+txtfield+
         "&txtparameter="+txtparameter+
         "&txtdata="+txtdata+
         "";   
  }
  else{
    data = "txtpage="+$("#txtpage").val()+
         "&txtperpage="+$("#txtperpage").val()+
         "&txtfield="+$(".txtfield").val()+
         "&txtparameter="+$(".txtparameter").val()+
         "&txtdata="+$(".txtdata").val()+
         "";
  }
               
  $("#frmbody").slideUp('slow',function(){
    $("#frmloading").slideDown('slow',function(){
      $.ajax({
        url: "frmview.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (html) {
                $("#frmcontent").html(html);
                $("#frmbody").slideDown('slow',function(){
                $("#frmloading").slideUp('slow');
                // console.log('find click');
          });
          }
      });
    });
  });
};

function addnewclick(){
  showinput();
  clearinput();
  $("#intxtmode").val('add');
  $("#mode").text('Add New');
  $("#innomc").val('~AUTO~');
  $("#tabelview").fadeOut("slow",function(){
    $("#tabelinput").fadeIn("slow");
    getDate('intglmp');
    hide('detail');
    hide('editinput');
    disabled("detail");
    $("#areabutton").hide();
    $("#areacopy").show();
  });
};

function showinput(){
  $.ajax({
    url: "frminput.php",
    cache: false,
    success: function(html) {
      $("#areainput").html(html);
    },
    complete: function(){
      $('.resize').each(growTextarea);
    }
  });
}

function showinput_detail(xid){
  var data = "innompx="+xid+"";
  $.ajax({
    url: "frminput.php",
    type: "POST",
    data: data,
    cache: false,
    beforeSend: function() {
      $("#areainput").fadeOut("slow");
      $("#frmloading_copy").show();
    },
    success: function(html) {
      $("#areainput").html(html);
    },
    complete: function(){
      $("#areainput").fadeIn("slow");
      $("#frmloading_copy").fadeOut("slow");
      autoresize();
      $('.resize').each(growTextarea);
      hide('detail');
    }
  });
}

function showinput_detailcopy(hxid,hkdtiket){
  var data = "hxid="+hxid+"&hkdtiket="+hkdtiket+"";
  $.ajax({
    url: "frminput_detail.php",
    type: "POST",
    data: data,
    cache: false,
    beforeSend: function() {
      $("#areainput").fadeOut("slow");
      $("#frmloading_copy").show();
    },
    success: function(html) {
      $("#areainput").html(html);
      getDate('intglmp');
      hide('editinput');
      $("#tabelfrmgambar").show();
    },
    complete: function(){
      $("#areainput").fadeIn("slow");
      $("#frmloading_copy").fadeOut("slow");
      autoresize();
      $('.resize').each(growTextarea);
      hide('detail');
    }
  });
}

function showdetail(mpno){
  $("#tabelview").fadeOut("slow",function(){
    $("#tabelinput").fadeIn("slow");
    $("#mode").text('Detail MP');
    var data = "inmpno="+mpno+"";
    $.ajax({
      url: "frmview_detail.php",
      type: "POST",
      data: data,
      cache: false,
      beforeSend: function() {
      $("#areainput").fadeOut("slow");
      $("#frmloading_copy").show();
      },
      success: function(html) {
        $("#areainput").html(html);
        $("#areabutton").show();
        $("#areacopy").hide();
      },
      complete: function(html){
        $("#areainput").fadeIn("slow");
        $("#frmloading_copy").fadeOut("slow");
      }
      // success: function(html) {
      //   $("#areainput").html(html);
      //   $("#areabutton").show();
      //   $("#areacopy").hide();
      // }
    });
  });
}

function deleteclick(){
  var n = $("input:checked").length;
  if(n==0){
    alert('Pilih Data !');
  }
  else{  
    if (confirm("Delete Data ?")){
      $("input:checked").each(function () {
          $("#intxtmode").val('delete');
          var result = ($(this).val()).split(",");
          var data = "intxtmode=delete&innomp="+result[0]+"&innomc="+result[1]+"&innoso="+result[2]+"";
          $.ajax({
           url: "actfrm.php",
           type: "POST",
           data: data,
           cache: false,
           success: function(data) {
            alert(data);
          }
        });
      });
      findclick();
    }
  }
};

function editclick(){
  showinput_detail($("#innompx").val());
  // clearinput();
  $("#intxtmode").val('edit');
  $("#mode").text('Edit');
  var data = "intxtmode=getedit&innomp="+$("#innompx").val()+"";
  $.ajax({
  	url: "actfrm.php",
  	type: "POST",
  	data: data,
  	cache: false,
  	success: function(data) {
      $("#areaedit").html(data);
      $("#tabelview").fadeOut("slow",function(){
        $("#tabelinput").fadeIn("slow");
        $("#areabutton").show();
        $("#areacopy").hide();
        setinput();
        // getDate('intglmp');
        checking('customer');
        checking('brand');
        setnama();
        add('salesorder');
        hide('areabutton');
        hide('header');
        hide('detail');
        disabled('header');
        disabled('detail');
        $("#tabelfrmgambar").show();
        $("#inkdbrand").attr('disabled',true);
        $("#innmbrand").attr('disabled',true);
        var kdcust = $("#inkdcust").val();
        var artprod = $("#inartprod").val();
        var url = "gambar/"+kdcust+"-"+artprod+".jpg";
        displayPicture(url,'');
        // displayPicture(url,'modal');
        // alert(url);
      });
    },
    complete: function(data){
      checkso();
    }
  });
}

function copydata(nomp){
  showinput_detail(nomp);
  // clearinput();
  $("#intxtmode").val('edit');
  $("#mode").text('Edit');
  var data = "intxtmode=getedit&innomp="+nomp+"";
  $.ajax({
    url: "actfrm.php",
    type: "POST",
    data: data,
    cache: false,
    success: function(data) {
      $("#areaedit").html(data);
      $("#tabelview").fadeOut("slow",function(){
        $("#tabelinput").fadeIn("slow");
        $("#areabutton").show();
        setinput();
        getDate('intglmp');
        checking('customer');
        checking('brand');
        setnama();
        $("#innomp").val('');
        $("#innomc").val('~AUTO~');
        $("#intglissuedmp").val('');
        add('salesorder');
        hide('areabutton');
        hide('editinput');
        $("#tabelfrmgambar").show();
        $("#inkdbrand").attr('disabled',true);
        $("#innmbrand").attr('disabled',true);
        var kdcust = $("#inkdcust").val();
        var artprod = $("#inartprod").val();
        var url = "gambar/"+kdcust+"-"+artprod+".jpg";

        if(imageExists(url) == true){
          displayPicture(url,'');
          // displayPicture(url,'modal');
        }
        clearinput('backorder');
        clearinput('ambil');
      });
    }
  });
}

function edit(id){
  if (id == "header") {
    if ($("#instatusdetail").val() == 1) {
      alert("Selesaikan Proses Edit Detail Dahulu!");
    }
    else {
      enabled('header');
      $("#innomp").attr('disabled',true);
      $("#innomc").attr('disabled',true);
      $("#inkdbrand").attr('disabled',false);
      $("#innmbrand").attr('disabled',false);
      unhide('header');
      $("#instatusheader").val(1);
    }
  }
  else if (id == "detail") {
    if ($("#instatusheader").val() == 1) {
      alert("Selesaikan Proses Edit Header Dahulu!");
    }
    else {
      enabled('detail');
      unhide('detail');
      $("#instatusdetail").val(1);
    }
  }
}

function exportclick(){
  var randomnumber=Math.floor(Math.random()*11)
  var exptype = $("#exporttype").val();
  switch (exptype)
  {
    case 'grd':
    $("#formexport").attr('action', 'frmviewgrid.php');
    $("#formexport").submit();
    break;
    case 'pdf':
    $("#formexport").attr('action', 'frmviewpdf2.php');
    $("#formexport").submit();
    break;
    // case 'pdf2':
    // $("#formexport").attr('action', 'frmviewpdf2.php');
    // $("#formexport").submit();
    // break;
    case 'xls':
    $("#formexport").attr('action', 'frmviewxls.php');
    $("#formexport").submit();
    break;
    case 'csv':
    $("#formexport").attr('action', 'frmviewcsv.php');
    $("#formexport").submit();
    break;
    case 'txt':
    $("#formexport").attr('action', 'frmviewtxt.php');
    $("#formexport").submit();
    break;
    default:
    alert('Unidentyfication Type');
  }
};

function setinput(){
  $("#innomp").val($("#getmpno").text());
  $("#innomc").val($("#getrnomc").text());
  $("#intglissuedmp").val($("#getdateiss").text());
  $("#inkdcust").val($("#getcust").text());
  $("#inkdbrand").val($("#getrkdbrand").text());
  $("#inartprod").val($("#getrartprod").text());
  $("#inartcust").val($("#getrartcust").text());
  $("#inwarna").val($("#getcolour").text());
  $("#inshoeheel").val($("#getmcheel").text());
  $("#inshoelast").val($("#getlast").text());
  $("#innoso").val($("#getnoso").text());
  $("#inkdassort").val($("#getkdassort").text());
  $("#inkdbrg").val($("#getkdbrg").text());
  $("#inrspecial").val($("#getrspecial").text());
  $("#inrket").val($("#getrket").text());
  $("#insku").val($("#getsku").text());
  $("#inskux").val($("#getsku").text());
  $("#intglmp").val($("#getrtglmp").text());
  $('.resize').each(growTextarea);
  // $("#innopo").val($("#get").text());
  // $("#intglpo").val($("#get").text());
  // $("#indord33").val($("#get").text());
  // $("#indord34").val($("#get").text());
  // $("#indord35").val($("#get").text());
  // $("#indord36").val($("#get").text());
  // $("#indord37").val($("#get").text());
  // $("#indord38").val($("#get").text());
  // $("#indord39").val($("#get").text());
  // $("#indord40").val($("#get").text());
  // $("#indord41").val($("#get").text());
  // $("#indord42").val($("#get").text());
  // $("#indord43").val($("#get").text());
  // $("#indord44").val($("#get").text());
  // $("#indord33s").val($("#get").text());
  // $("#indord34s").val($("#get").text());
  // $("#indord35s").val($("#get").text());
  // $("#indord36s").val($("#get").text());
  // $("#indord37s").val($("#get").text());
  // $("#indord38s").val($("#get").text());
  // $("#indord39s").val($("#get").text());
  // $("#indord40s").val($("#get").text());
  // $("#indord41s").val($("#get").text());
  // $("#indord42s").val($("#get").text());
  // $("#indord43s").val($("#get").text());
  // $("#indord44s").val($("#get").text());
  // $("#intotord").val($("#get").text());
  // $("#inkdjenis").val($("#get").text());
  // $("#incategory").val($("#get").text());
  // $("#intglkirim").val($("#get").text());
  // $("#innmbrg").val($("#get").text());
};

function clearinput(id){
  if (id == "salesorder") {
    $("#innoso").val("");
    $("#inkdassort").val("");
    $("#innmassort").text("");
    $("#inkdbrg").val("");
    $("#innopo").val("");
    $("#intglpo").val("");
    $("#indord33").val("");
    $("#indord34").val("");
    $("#indord35").val("");
    $("#indord36").val("");
    $("#indord37").val("");
    $("#indord38").val("");
    $("#indord39").val("");
    $("#indord40").val("");
    $("#indord41").val("");
    $("#indord42").val("");
    $("#indord43").val("");
    $("#indord44").val("");
    $("#indord33s").val("");
    $("#indord34s").val("");
    $("#indord35s").val("");
    $("#indord36s").val("");
    $("#indord37s").val("");
    $("#indord38s").val("");
    $("#indord39s").val("");
    $("#indord40s").val("");
    $("#indord41s").val("");
    $("#indord42s").val("");
    $("#indord43s").val("");
    $("#indord44s").val("");
    $("#intotord").val("");
    $("#inkdjenis").val("");
    $("#incategory").val("");
    $("#intglkirim").val("");
    $("#innmbrg").val("");
  }
  else if (id == "sku") {
    if ($("#insku").val() != ""){
      $("#inskux").val($("#insku").val());
      $("#insku").val('');
    }
  }
  else if (id == "backorder") {
    $(".back_order_1").val("0.0000");
    $(".back_order_2").val("0.0000");
    $(".back_order_3").val("0.0000");
    $(".back_order_4").val("0.0000");
    $(".back_order_5").val("0.0000");
  }
  else if (id == "ambil") {
    $(".ambil_1").val("0.0000");
    $(".ambil_2").val("0.0000");
    $(".ambil_3").val("0.0000");
    $(".ambil_4").val("0.0000");
    $(".ambil_5").val("0.0000");
  }
}

function disabled(id){
  if (id == "header"){
    $("#innomp").attr('disabled',true);
    $("#intglmp").attr('disabled',true);
    $("#innomc").attr('disabled',true);
    $("#intglissuedmp").attr('disabled',true);
    $("#inkdcust").attr('disabled',true);
    $("#innmcust").attr('disabled',true);
    $("#inkdbrand").attr('disabled',true);
    $("#innmbrand").attr('disabled',true);
    $("#inartprod").attr('disabled',true);
    $("#inartcust").attr('disabled',true);
    $("#inwarna").attr('disabled',true);
    $("#inshoeheel").attr('disabled',true);
    $("#inshoelast").attr('disabled',true);
    $("#innoso").attr('disabled',true);
    $("#inkdassort").attr('disabled',true);
    $("#inkdbrg").attr('disabled',true);
    $("#cmdFindKdbrg").attr('disabled',true);
    $("#cmdAddKdbrg").attr('disabled',true);
    $("#cmdRemoveSO").attr('disabled',true);
    $("#innopo").attr('disabled',true);
    $("#intglpo").attr('disabled',true);
    $("#indord33").attr('disabled',true);
    $("#indord34").attr('disabled',true);
    $("#indord35").attr('disabled',true);
    $("#indord36").attr('disabled',true);
    $("#indord37").attr('disabled',true);
    $("#indord38").attr('disabled',true);
    $("#indord39").attr('disabled',true);
    $("#indord40").attr('disabled',true);
    $("#indord41").attr('disabled',true);
    $("#indord42").attr('disabled',true);
    $("#indord43").attr('disabled',true);
    $("#indord44").attr('disabled',true);
    $("#indord33s").attr('disabled',true);
    $("#indord34s").attr('disabled',true);
    $("#indord35s").attr('disabled',true);
    $("#indord36s").attr('disabled',true);
    $("#indord37s").attr('disabled',true);
    $("#indord38s").attr('disabled',true);
    $("#indord39s").attr('disabled',true);
    $("#indord40s").attr('disabled',true);
    $("#indord41s").attr('disabled',true);
    $("#indord42s").attr('disabled',true);
    $("#indord43s").attr('disabled',true);
    $("#indord44s").attr('disabled',true);
    $("#intotord").attr('disabled',true);
    $("#inkdjenis").attr('disabled',true);
    $("#incategory").attr('disabled',true);
    $("#intglkirim").attr('disabled',true);
    $("#innmbrg").attr('disabled',true);
    $("#insku").attr('disabled',true);
    $(".deletesku").hide();
    $(".addsku").hide();
  }
  else if (id == "detail") {
    for (var i = 1; i <= 5; i++) {
      $(".component_"+i).attr('disabled',true);
      $(".material_"+i).attr('disabled',true);
      $(".supplier_"+i).attr('disabled',true);
      $(".calc_tkt_"+i).attr('disabled',true);
      $(".calc_mp_"+i).attr('disabled',true);
      $(".qty_"+i).attr('disabled',true);
      $(".unit_"+i).attr('disabled',true);
      $(".ambil_"+i).attr('disabled',true);
      $(".back_order_"+i).attr('disabled',true);
      $(".pkj_"+i).hide();
    }

    $(".addRow").hide();
    $(".cmd_detail_order").hide();
    $(".openDialog").hide();
    // $(".removeRow").hide();
    $("#inrspecial").attr('disabled',true);
    $("#inrket").attr('disabled',true);
  }
}

function enabled(id){
  if (id == "header"){
    $("#innomp").attr('disabled',false);
    $("#intglmp").attr('disabled',false);
    $("#innomc").attr('disabled',false);
    $("#intglissuedmp").attr('disabled',false);
    $("#inkdcust").attr('disabled',false);
    $("#innmcust").attr('disabled',false);
    $("#inkdbrand").attr('disabled',false);
    $("#innmbrand").attr('disabled',false);
    $("#inartprod").attr('disabled',false);
    $("#inartcust").attr('disabled',false);
    $("#inwarna").attr('disabled',false);
    $("#inshoeheel").attr('disabled',false);
    $("#inshoelast").attr('disabled',false);
    $("#innoso").attr('disabled',false);
    $("#inkdassort").attr('disabled',false);
    $("#inkdbrg").attr('disabled',false);
    $("#cmdFindKdbrg").attr('disabled',false);
    $("#cmdAddKdbrg").attr('disabled',false);
    $("#cmdRemoveSO").attr('disabled',false);
    $("#innopo").attr('disabled',false);
    $("#intglpo").attr('disabled',false);
    $("#indord33").attr('disabled',false);
    $("#indord34").attr('disabled',false);
    $("#indord35").attr('disabled',false);
    $("#indord36").attr('disabled',false);
    $("#indord37").attr('disabled',false);
    $("#indord38").attr('disabled',false);
    $("#indord39").attr('disabled',false);
    $("#indord40").attr('disabled',false);
    $("#indord41").attr('disabled',false);
    $("#indord42").attr('disabled',false);
    $("#indord43").attr('disabled',false);
    $("#indord44").attr('disabled',false);
    $("#indord33s").attr('disabled',false);
    $("#indord34s").attr('disabled',false);
    $("#indord35s").attr('disabled',false);
    $("#indord36s").attr('disabled',false);
    $("#indord37s").attr('disabled',false);
    $("#indord38s").attr('disabled',false);
    $("#indord39s").attr('disabled',false);
    $("#indord40s").attr('disabled',false);
    $("#indord41s").attr('disabled',false);
    $("#indord42s").attr('disabled',false);
    $("#indord43s").attr('disabled',false);
    $("#indord44s").attr('disabled',false);
    $("#intotord").attr('disabled',false);
    $("#inkdjenis").attr('disabled',false);
    $("#incategory").attr('disabled',false);
    $("#intglkirim").attr('disabled',false);
    $("#innmbrg").attr('disabled',false);
    $("#insku").attr('disabled',false);
    $(".addsku").show();
    $(".deletesku").show();
  }
  else if (id == "detail") {
    for (var i = 1; i <= 5; i++) {
      $(".component_"+i).attr('disabled',false);
      $(".material_"+i).attr('disabled',false);
      $(".supplier_"+i).attr('disabled',false);
      $(".calc_tkt_"+i).attr('disabled',false);
      $(".calc_mp_"+i).attr('disabled',false);
      $(".qty_"+i).attr('disabled',false);
      $(".unit_"+i).attr('disabled',false);
      $(".ambil_"+i).attr('disabled',false);
      $(".back_order_"+i).attr('disabled',false);
      $(".pkj_"+i).show();
    }
    
    $(".addRow").show();
    $(".cmd_detail_order").show();
    $(".openDialog").show();
    // $(".removeRow").show();
    $("#inrspecial").attr('disabled',false);
    $("#inrket").attr('disabled',false);
    $('.resize').each(growTextarea);
  }
}

function hide(id){
  if (id == "header") {
    $("#cmdSaveHeader").hide();
    $("#cmdCancelHeader").hide();
  }
  else if (id == "detail") {
    $("#cmdSaveDetail").hide();
    $("#cmdCancelDetail").hide();
  }
  else if (id == "areabutton") {
    $("#cmdedit").hide();
    $("#cmdexport").hide();
    $("#exporttype").hide();
  }
  else if (id = "editinput") {
    $("#cmdeditheader").hide();
    $("#cmdeditdetail").hide();
    $("#cmdeditdetail_1").hide();
  }
  else if (id = "areacopy") {
    $("#areacopy").hide();
  }
}

function unhide(id){
  if (id == "header") {
    $("#cmdSaveHeader").show();
    $("#cmdCancelHeader").show();
  }
  else if (id == "detail") {
    $("#cmdSaveDetail").show();
    $("#cmdCancelDetail").show();
  }
  else if (id == "areabutton") {
    $("#cmdedit").show();
    $("#cmdexport").show();
    $("#exporttype").show();
  }
  else if (id = "editinput") {
    $("#cmdeditheader").show();
    $("#cmdeditdetail").show();
    $("#cmdeditdetail_1").show();
  }
  else if (id = "areacopy") {
    $("#areacopy").show();
  }
}



function saveclick(id){
  if (id == "header") {
    if ($("#innomp").val() == "") {
      alert("Input No MP kosong!");
    }
    else if ($("#inkdcust").val() == "") {
      alert("Input Kode Customer kosong!");
    }
    else if ($("#inartprod").val() == "") {
      alert("Input Artikel Produksi kosong!");
    }
    else if ($("#inartcust").val() == "") {
      alert("Input Artikel Customer kosong!");
    }
    else if (confirm("Simpan Data ?")){
      $("#cmdSaveHeader").attr('disabed','disabled');

      var data = "intxtmode="+$("#intxtmode").val()+
      "&innomp="+encodeURIComponent($("#innomp").val())+
      "&intglmp="+encodeURIComponent($("#intglmp").val())+
      "&innomc="+encodeURIComponent($("#innomc").val())+
      "&intglissuedmp="+encodeURIComponent($("#intglissuedmp").val())+
      "&inkdcust="+encodeURIComponent($("#inkdcust").val())+
      "&inkdbrand="+encodeURIComponent($("#inkdbrand").val())+
      "&inartprod="+encodeURIComponent($("#inartprod").val())+
      "&inartcust="+encodeURIComponent($("#inartcust").val())+
      "&inwarna="+encodeURIComponent($("#inwarna").val())+
      "&inshoeheel="+encodeURIComponent($("#inshoeheel").val())+
      "&inshoelast="+encodeURIComponent($("#inshoelast").val())+
      "&innoso="+encodeURIComponent($("#innoso").val())+
      "&inkdassort="+encodeURIComponent($("#inkdassort").val())+
      "&inkdbrg="+encodeURIComponent($("#inkdbrg").val())+
      "&innopo="+encodeURIComponent($("#innopo").val())+
      "&intglpo="+encodeURIComponent($("#intglpo").val())+
      "&indord33="+encodeURIComponent($("#indord33").val())+
      "&indord34="+encodeURIComponent($("#indord34").val())+
      "&indord35="+encodeURIComponent($("#indord35").val())+
      "&indord36="+encodeURIComponent($("#indord36").val())+
      "&indord37="+encodeURIComponent($("#indord37").val())+
      "&indord38="+encodeURIComponent($("#indord38").val())+
      "&indord39="+encodeURIComponent($("#indord39").val())+
      "&indord40="+encodeURIComponent($("#indord40").val())+
      "&indord41="+encodeURIComponent($("#indord41").val())+
      "&indord42="+encodeURIComponent($("#indord42").val())+
      "&indord43="+encodeURIComponent($("#indord43").val())+
      "&indord44="+encodeURIComponent($("#indord44").val())+
      "&indord33s="+encodeURIComponent($("#indord33s").val())+
      "&indord34s="+encodeURIComponent($("#indord34s").val())+
      "&indord35s="+encodeURIComponent($("#indord35s").val())+
      "&indord36s="+encodeURIComponent($("#indord36s").val())+
      "&indord37s="+encodeURIComponent($("#indord37s").val())+
      "&indord38s="+encodeURIComponent($("#indord38s").val())+
      "&indord39s="+encodeURIComponent($("#indord39s").val())+
      "&indord40s="+encodeURIComponent($("#indord40s").val())+
      "&indord41s="+encodeURIComponent($("#indord41s").val())+
      "&indord42s="+encodeURIComponent($("#indord42s").val())+
      "&indord43s="+encodeURIComponent($("#indord43s").val())+
      "&indord44s="+encodeURIComponent($("#indord44s").val())+
      "&intotord="+encodeURIComponent($("#intotord").val())+
      "&incategory="+encodeURIComponent($("#inkdjenis").val())+
      "&intglkirim="+encodeURIComponent($("#intglkirim").val())+
      "&inkodetiket="+encodeURIComponent($("#inkodetiket").val())+
      "&insku="+encodeURIComponent($("#insku").val())+
      "&inskux="+encodeURIComponent($("#inskux").val())+
      "";
      //alert(data);
      $.ajax({
        url: "actfrm.php",
        type: "POST",
        data: data,
        cache: false,
        success: function(data) {
          if ($("#intxtmode").val()=='edit'){
            if (data == 1) {
              alert("Data Berhasil di Update");
              openDialog("gambar");
              hide('header');
              disabled('header');
              $("#instatusheader").val(0);
            }
          }
          else{
            var result = data.split('|');
            if (result[0] == 1) {
              alert("Data Berhasil Disimpan");
              openDialog("gambar");
              $("#tabelfrmgambar").show();
              disabled("header");
              enabled("detail");
              hide("header");
              unhide("detail");
              $("#innomc").val(result[1]);
              $("#instatusheader").val(0);
              $("#cmdFindTicket").attr('disabled',true);
              $("#cmdCopyMp").attr('disabled',true);
            }
            else if (result[0] == 0) {
              alert("No MP Tersebut Sudah Ada !");
            }
            else{
              alert(result[0]);
            }
          }
          $("#cmdSaveHeader").attr('disabed','');
        }
      })
    }
  }
  else if (id == "detail") {
    $("#cmdSaveDetail").attr('disabed','disabled');
    var inpkj = "";
    var insubpkj = "";
    var inidcomponent = "";
    var incomponent = "";
    var inmaterial = "";
    var insupplier = "";
    // var incalctkt = "";
    var incalcmp = "";
    var inqty = "";
    var inunit = "";
    var inambil = "";
    var inbackorder = "";

    for (var i = 1; i <= 5; i++) {
      if($(".id_component_"+i).length > 0){
        $(".id_component_"+i).each(function(){
          // if($(this).val().trim() != ''){
            inidcomponent += $(this).val()+"|";
            inpkj += i+"|";
          // }
        })
      }

      if($(".component_"+i).length > 0){
        $(".component_"+i).each(function(){
          // if($(this).val().trim() != ''){
            incomponent += $(this).val()+"|";
          // }
        })
      }

      if($(".subpkj_"+i).length > 0){
        $(".subpkj_"+i).each(function(){
          // if($(this).val().trim() != ''){
            insubpkj += $(this).val()+"|";
          // }
        })
      }

      if($(".id_material_"+i).length > 0){
        $(".id_material_"+i).each(function(){
          // if($(this).val().trim() != ''){
            inmaterial += $(this).val()+"|";
          // }
        })
      }

      if($(".id_supplier_"+i).length > 0){
        $(".id_supplier_"+i).each(function(){
          // if($(this).val().trim() != ''){
            insupplier += $(this).val()+"|";
          // }
        })
      }

      // if($(".calc_tkt_"+i).length > 0){
      //   $(".calc_tkt_"+i).each(function(){
      //     if($(this).val().trim() != ''){
      //       incalctkt += $(this).val()+"|";
      //     }
      //   })
      // }

      if($(".calc_mp_"+i).length > 0){
        $(".calc_mp_"+i).each(function(){
          // if($(this).val().trim() != ''){
            incalcmp += $(this).val()+"|";
          // }
        })
      }

      if($(".qty_"+i).length > 0){
        $(".qty_"+i).each(function(){
          // if($(this).val().trim() != ''){
            inqty += $(this).val()+"|";
          // }
        })
      }

      if($(".unit_"+i).length > 0){
        $(".unit_"+i).each(function(){
          // if($(this).val().trim() != ''){
            inunit += $(this).val()+"|";
          // }
        })
      }

      if($(".ambil_"+i).length > 0){
        $(".ambil_"+i).each(function(){
          // if($(this).val().trim() != ''){
            inambil += $(this).val()+"|";
          // }
        })
      }

      if($(".back_order_"+i).length > 0){
        $(".back_order_"+i).each(function(){
          // if($(this).val().trim() != ''){
            inbackorder += $(this).val()+"|";
          // }
        })
      }
    }

    var mode = "";
    if ($("#intxtmode").val()=='edit') {
      mode = "editdetail";
    }
    else{
      mode = "adddetail"; 
    }

    var data = "intxtmode="+mode+"&inpkj="+inpkj+
               "&insubpkj="+insubpkj+
               "&innomp="+$("#innomp").val()+
               "&innomc="+$("#innomc").val()+
               "&innoso="+$("#innoso").val()+
               "&inidcomponent="+encodeURIComponent(inidcomponent)+
               "&incomponent="+encodeURIComponent(incomponent)+
               "&inmaterial="+encodeURIComponent(inmaterial)+
               "&insupplier="+encodeURIComponent(insupplier)+
               // "&incalctkt="+incalctkt+
               "&incalcmp="+incalcmp+
               "&inqty="+inqty+
               "&inunit="+inunit+
               "&inambil="+inambil+
               "&inbackorder="+inbackorder+
               "&inrspecial="+encodeURIComponent($("#inrspecial").val())+ 
               "&inrket="+encodeURIComponent($("#inrket").val())+
               "&indeletedetail="+encodeURIComponent($("#deletedetail").val())+ 
               "";
    $.ajax({
      url: "actfrm.php",
      type: "POST",
      data: data,
      cache: false,
      success: function (data) {
        if ($("#intxtmode").val()=='edit'){
          if (data == 1) {
            alert("Data Berhasil di Update");
            $("#instatusdetail").val(0);
            hide('detail');
            disabled('detail');
          }
          else {
            alert(data);
          }
        }
        else {
          if (data == 1) {
            alert("Data Berhasil Disimpan");
            disabled("detail");
            hide("detail");
            $("#instatusdetail").val(0);
          }
          else {
            alert(data);
          }
        }
      $("#cmdSaveDetail").attr('disabed','');
      $("#deletedetail").val('');
      }
    })
  }
}

function cancelclick(){
  if (confirm("Close Data ?")) {
    clearinput();
    $("#intxtmode").val('');
    $("#mode").text('');
    $("#tabelinput").fadeOut("slow",function(){
      $("#tabelview").fadeIn("slow",findclick());
      unhide('areabutton');
      $("#inkodetiket").val('');
      $("#cmdFindTicket").attr('disabled',false);
      $("#cmdCopyMp").attr('disabled',false);
    });
  }
};

function lock(id){
  if (id == "header"){
    $("#instatusheader").val(0);
    hide('header');
    disabled('header');
  }
  else if (id == "detail"){
    $("#instatusdetail").val(0);
    hide('detail');
    disabled('detail');
  }
}

function searchclick(){
  if ($("#areasearch").is(":hidden")) {
    $("#areasearch").slideDown("slow");
  } else {
    $("#areasearch").slideUp("slow");
  }
};

function openDialog(id,xid) {
  if (id == "detailmp") {
    var data = "inmpno=" +xid+ "";
    $.ajax({
      url: "frmview_detail_mp.php",
      data: data, 
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 85 / 100;
        var tinggi = height * 70 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View Detail MP",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    })
  }
  else if (id == "kdbrg") {
    if ($("#innoso").val() == "") {
      alert("No Sales Order Kosong!");
      $("#innoso").val('');
    }
    else if ($("#inkdassort").val() == "") {
      alert("Assortment Kosong!");
      $("#inkdassort").val('');
    }
    else{
      var data = "innoso="+$("#innoso").val()+"&inkdassort="+$("#inkdassort").val()+"&inid="+id+"";
      $.ajax({
        url: "frmModal.php",
        data: data, 
        type: "POST",
        cache: false,
        success: function(html) {
          $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 85 / 100;
          var tinggi = height * 70 / 100;

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "View Kode Barang Jadi",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
            }
          });
        }
      })
    }
  }
  else if (id == "gambar") {
    if ($("#intxtmode").val() == "edit" && $("#instatusheader").val() == 0) {
      alert("Click Edit Header");
    }
    else {
      var data = "inkdcust="+$("#inkdcust").val()+"&inartprod="+$("#inartprod").val()+"&inxgambar_1="+$("#inxgambar_1").val()+"";
      $.ajax({
        url: "frmModal_1.php",
        data: data, 
        type: "POST",
        cache: false,
        success: function(html) {
          $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 30 / 100;
          var tinggi = height * 30 / 100;

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "Input Gambar",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
            }
          });
        }
      })
    }
  }
  else  if (id == 'customer'){
    var data ="inkdcust="+$("#inkdcust").val()+"&inid="+id+"";
    $.ajax({
      url: "frmModal_2.php",
      data: data,
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 60 / 100;
        var tinggi = height * 60 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View Customer",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    });
  }
  else  if (id == 'brand'){
    if ($("#inkdcust").val() == "") {
      alert("Kode Customer Kosong");
      $("#inkdcust").val('');
      $("#innmcust").val('');
      $("#inkdbrand").val('');
      $("#innmbrand").val('');
    }
    else{
    var data ="inkdcust="+$("#inkdcust").val()+"&inkdbrand="+$("#inkdbrand").val()+"&inid="+id+"";
    $.ajax({
      url: "frmModal_3.php",
      data: data,
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 60 / 100;
        var tinggi = height * 60 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View Brand",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    });
    }
  }
  else  if (id == 'shoeheel'){
    var data ="inid="+id+"";
    $.ajax({
      url: "frmModal_4.php",
      data: data,
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 60 / 100;
        var tinggi = height * 40 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View Heel",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    });
  }
  else  if (id == 'shoelast'){
    var data ="inid="+id+"";
    $.ajax({
      url: "frmModal_5.php",
      data: data,
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 60 / 100;
        var tinggi = height * 40 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View Last",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    });
  }
  else if (id == "ticket") {
    var data = "inid="+id+"";
    $.ajax({
      url: "frmModal_9.php",
      data: data, 
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 85 / 100;
        var tinggi = height * 70 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View Ticket",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    })
  }
  else if (id == "copymp") {
    var data = "inid="+id+"";
    $.ajax({
      url: "frmModal_10.php",
      data: data, 
      type: "POST",
      cache: false,
      success: function(html) {
        $("#frmbody").slideDown("slow");
        $("#dialog-open").html(html);

        var width = screen.width;
        var height = screen.height;
        var lebar = width * 85 / 100;
        var tinggi = height * 70 / 100;

        $("#dialog-open").dialog({
          autoOpen: true,
          modal: true,
          height: tinggi,
          width: lebar,
          title: "View MP",
          close: function(event) {
            $("#dialog-open").hide();
            $("#dialog-open").html("");
          }
        });
      }
    })
  }
  else if (id == "sku") {
    // alert((($("#inkdcust").val()).trim()));
    if($("#inkdcust").val() == ""){
      alert("Input Kode Customer Kosong !");
    }
    else{
      var data = "inid="+id+"";
      $.ajax({
        url: "frmModal_11.php",
        data: data, 
        type: "POST",
        cache: false,
        success: function(html) {
          $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 85 / 100;
          var tinggi = height * 70 / 100;

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "View SKU",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
            }
          });
        }
      })
    }
  }
  else if (id == "history") {
    var n = $("input:checked").length;
    if (n>1){
      alert('Maks. pilih 1 data');
    }else if(n==0){
      alert('Pilih Data !');
    }else{
      var innomp = ($("input:checked").val()).split(",")
      var data = "innomp="+innomp[0]+"";
      $.ajax({
        url: "frmModal_12.php",
        data: data, 
        type: "POST",
        cache: false,
        success: function(html) {
          $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 60 / 100;
          var tinggi = height * 50 / 100;

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "View History Data MP",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
            }
          });
        }
      })
    }
  }
  else{
    var idx = id.split("_");
    var setid = id.split("openDialog_");

    if (idx[1] == "component") {
      var data ="inid="+setid[1]+"";
      $.ajax({
        url: "frmModal_6.php",
        data: data,
        type: "POST",
        cache: false,
        success: function(html) {
          // $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 80 / 100;
          var tinggi = height * 70 / 100;

          // $('html').css({overflow: 'hidden'});

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "View Component",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
              // $('html').css({overflow: 'visible'});
            }
          });
        }
      });
    }
    else if (idx[1] == "material") {
      var data ="inid="+setid[1]+"";
      $.ajax({
        url: "frmModal_7.php",
        data: data,
        type: "POST",
        cache: false,
        success: function(html) {
          $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 80 / 100;
          var tinggi = height * 70 / 100;

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "View Material",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
            }
          });
        }
      });
    }
    else if (idx[1] == "supplier") {
      var data ="inid="+setid[1]+"";
      $.ajax({
        url: "frmModal_8.php",
        data: data,
        type: "POST",
        cache: false,
        success: function(html) {
          $("#frmbody").slideDown("slow");
          $("#dialog-open").html(html);

          var width = screen.width;
          var height = screen.height;
          var lebar = width * 80 / 100;
          var tinggi = height * 70 / 100;

          $("#dialog-open").dialog({
            autoOpen: true,
            modal: true,
            height: tinggi,
            width: lebar,
            title: "View Material",
            close: function(event) {
              $("#dialog-open").hide();
              $("#dialog-open").html("");
            }
          });
        }
      });
    }

  }
}

function setFilterData(rowx) {
  if ($("#txtfield" + rowx).val() == "IF(dt2.dkdbrg != '' AND dt3.spkdbrg != '', 1 , 0)") {
    var data_select =
      "Data : \n\
      <select class='txtdata'>\n\
      <option value=''>-</option>\n\
      <option value='1'>OK</option>\n\
      <option value='0'>Belum Dibuat</option>\n\
      </select>";
    $("#filter_data" + rowx).html(data_select);
  } else {
    var data_select =
      "Data : <input type='text' class='txtdata' onkeydown='enterfind(event)'>";

    $("#filter_data" + rowx).html(data_select);
  }
}

function transfer(){
  if (confirm("Transfer Data ?")){
  
  var data ="intxtmode=checktemp";
    $.ajax({
      url: "actfrm.php",
      type: "POST",
      data: data,
      cache: false,
      beforeSend: function() {
            $("#loader").show();
            $("#upload-status").css('color','green');
            $("#upload-status").text("Please Wait ... Still Saving Data");
            disabled();
          },
      success: function (data) {
          if (data == 0){
            $("#loader").hide();
            $("#upload-status").text("");
            alert("Data Tidak Ditemukan !\n Upload Data Terlebih Dahulu .....");
            enabled();
          }
          else{
            insert();
          }
      }
    });
  }
}

function insert(){
  var data ="intxtmode=transfer";
  $.ajax({
    url: "actfrm.php",
    type: "POST",
    data: data,
    cache: false,
    success: function (data) {
      var result = data.split('|');
      alert(" Import Success \n Jumlah Data : "+result[0]+" \n Import Success : "+result[1]+" \n Import Gagal : "+result[2]+"");
      $("#loader").hide();
      $("#upload-status").text("");
      clearinput();
      enabled();
    }
  });
}

function hasExtension(inputID, exts) {
  var fileName = document.getElementById(inputID).value;
  return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}

function upload(){
  if ($("#file").val() == "") {
    alert("Input File Excel Kosong !");
    $("#file").focus();
    return false;
  }
  else if(!hasExtension('file', ['.xls']) && !hasExtension('file', ['.XLS'])  && !hasExtension('file', ['.xlsx']) && !hasExtension('file', ['.XLSX'])){
    alert("Invalid Format File Excel !");
    $("#file").focus();
    return false;
  }
  else if ($("#innopo").val() == ""){
    alert("Input No PO Kosong !");
    $("#innopo").focus();
    return false;
  }
}

function viewDetailMP(mpno) {
  $("#areabutton").show();
  $("#intxtmode").val("viewDetailMP");
  $("#mode").text("View Detail");
  $("#inmpno").val(mpno);
  var data = "inmpno=" +mpno+ "";
  $.ajax({
    url: "form_viewDetailMP.php",
    type: "POST",
    data: data,
    cache: false,
    success: function(data) {
      $("#areaedit").html(data);
      $("#tabelview").fadeOut("slow", function() {
        $("#tabelinput").fadeIn("slow");
        $("#areabutton").show();
      });
      // $("#tabelinput").fadeIn("slow");
      // $("#form_viewDetailMP").html(html);
    }
  });
}

function addRow(pkj){
  var table = document.getElementById('myTable_detailMP').getElementsByTagName('tbody')[0];
  // var row = tableRef.insertRow(eval(1));
  var row = table.insertRow(eval($("#row_"+pkj).val())+1);
  var data = pkj.split('_');
  
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  var cell9 = row.insertCell(8);
  var cell10 = row.insertCell(9);
  // var cell11 = row.insertCell(10);

  cell1.style.textAlign="center";
  cell2.style.textAlign="center";
  cell3.style.textAlign="center";
  cell4.style.textAlign="center";
  cell5.style.textAlign="center";
  cell6.style.textAlign="center";
  cell7.style.textAlign="center";
  cell8.style.textAlign="center";
  cell9.style.textAlign="center";
  cell10.style.textAlign="center";
  // cell11.style.textAlign="center";
  
  cell1.innerHTML = "<INPUT id=\"subpkj_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"subpkj_"+data[1]+"\" type='hidden' style=\"width: 50px\" value=\""+$('#row_subpkj_'+data[1]).val()+"\">\n\
                    <img id=\"addRow"+data[1]+"\" src=\"img/plus.png\" onclick=\"addRow('pkj_"+data[1]+"')\" class=\"addRow\" style=\"cursor: pointer; vertical-align: center;\" title=\"Add Row\" >";
  cell2.innerHTML = "<textarea id=\"component_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"component_"+data[1]+"\" name='' onkeyup=\"resizeTextarea(this.id)\" onkeypress=\"getAutocomplete(this.id)\" data-resizable='true' style='width:85%'></textarea>\n\
                    <INPUT id=\"id_component_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"id_component_"+data[1]+"\" type='hidden' name='' style=\"width: 50px\">\n\
                    <img id=\"openDialog_component_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"openDialog\" src=\"img/search.png\" onclick=\"openDialog(this.id)\" style=\"cursor: pointer; vertical-align: center;\" title=\"Search Komponen\" >";
  cell3.innerHTML = "<span id=\"show_id_material_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"show_id_material_"+data[1]+"\" style=\"color:green;\"></span><br/>\n\
                    <textarea id=\"material_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"material_"+data[1]+"\" name='' onkeyup=\"resizeTextarea(this.id)\" onkeypress=\"getAutocomplete(this.id)\" data-resizable='true' style='width:85%'></textarea>\n\
                    <INPUT id=\"id_material_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"id_material_"+data[1]+"\" type='hidden' name='' style=\"width: 50px\">\n\
                    <img id=\"openDialog_material_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"openDialog\" src=\"img/search.png\" onclick=\"openDialog(this.id)\" style=\"cursor: pointer; vertical-align: center;\" title=\"Search Material\" >";
  cell4.innerHTML = "<span id=\"show_id_supplier_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"show_id_supplier_"+data[1]+"\" style=\"color:green;\"></span><br/>\n\
                    <textarea id=\"supplier_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"supplier_"+data[1]+"\" name='' onkeyup=\"resizeTextarea(this.id)\" onkeypress=\"getAutocomplete(this.id)\" data-resizable='true' style='width:85%'></textarea>\n\
                    <INPUT id=\"id_supplier_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"id_supplier_"+data[1]+"\" type='hidden' name='' style=\"width: 50px\">\n\
                    <img id=\"openDialog_supplier_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"openDialog\" src=\"img/search.png\" onclick=\"openDialog(this.id)\" style=\"cursor: pointer; vertical-align: center;\" title=\"Search Material\">";
  // cell5.innerHTML = "<INPUT id=\"calc_tkt_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"calc_tkt_"+data[1]+"\" type='text' name='' style=\"width: 50px; text-align: right;\">";
  cell5.innerHTML = "<INPUT id=\"calc_mp_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"calc_mp_"+data[1]+"\" onkeyup=\"calculate('qty',this.id)\" onkeydown=\"number(event)\" type='text' name='' placeholder=\"0.0000\" style=\"width: 50px; text-align: right;\">";
  cell6.innerHTML = "<INPUT id=\"qty_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"qty_"+data[1]+"\" onkeyup=\"\" onkeydown=\"number(event)\" type='text' name='' placeholder=\"0.0000\" style=\"width: 50px; text-align: right;\">";
  

  // cell8.innerHTML = "<INPUT id=\"unit_"+data[1]+"_"+$('#row_subpkj_'+data[1]).val()+"\" class=\"unit_"+data[1]+"\" type='text' name='' style=\"width: 50px; text-align: right;\">";

  var row_subpkj =  $("#row_subpkj_"+data[1]).val();

  $.ajax({
    url: "getUnit.php",
    type: "POST",
    cache: false,
    success: function(html) {
    cell7.innerHTML = "<select id=\"unit_"+data[1]+"_"+row_subpkj+"\" class=\"unit_"+data[1]+"\" onchange=\"\" style=''>\n\
                            "+html+"\n\
                      </select>";
    }
  });

  cell8.innerHTML = "<INPUT id=\"ambil_"+data[1]+"_"+row_subpkj+"\" class=\"ambil_"+data[1]+"\" type='text' name='' value=\"0.0000\" style=\"width: 50px; text-align: right;\" readonly>";
  cell9.innerHTML = "<INPUT id=\"back_order_"+data[1]+"_"+row_subpkj+"\" class=\"back_order_"+data[1]+"\" type='text' name='' value=\"0.0000\" style=\"width: 50px; text-align: right;\" onkeydown=\"number(event)\">";
  cell10.innerHTML = "<img id=\"remove_"+data[1]+"_"+row_subpkj+"\" src=\"img/delete.png\" onclick=\"removeRow(this)\" class=\""+pkj+"\" style=\"cursor: pointer; vertical-align: center;\" title=\"Delete Row\" >";

  if(pkj == 'pkj_1'){
    $("#row_pkj_1").val(eval($("#row_pkj_1").val())+1);
    $("#row_pkj_2").val(eval($("#row_pkj_2").val())+1);
    $("#row_pkj_3").val(eval($("#row_pkj_3").val())+1);
    $("#row_pkj_4").val(eval($("#row_pkj_4").val())+1);
    $("#row_pkj_5").val(eval($("#row_pkj_5").val())+1);

    $("#row_subpkj_1").val(eval($("#row_subpkj_1").val())+1);
  }
  else if(pkj == 'pkj_2'){
    $("#row_pkj_2").val(eval($("#row_pkj_2").val())+1);
    $("#row_pkj_3").val(eval($("#row_pkj_3").val())+1);
    $("#row_pkj_4").val(eval($("#row_pkj_4").val())+1);
    $("#row_pkj_5").val(eval($("#row_pkj_5").val())+1);

    $("#row_subpkj_2").val(eval($("#row_subpkj_2").val())+1);
  }
  else if(pkj == 'pkj_3'){
    $("#row_pkj_3").val(eval($("#row_pkj_3").val())+1);
    $("#row_pkj_4").val(eval($("#row_pkj_4").val())+1);
    $("#row_pkj_5").val(eval($("#row_pkj_5").val())+1);

    $("#row_subpkj_3").val(eval($("#row_subpkj_3").val())+1);
  }
  else if(pkj == 'pkj_4'){
    $("#row_pkj_4").val(eval($("#row_pkj_4").val())+1);
    $("#row_pkj_5").val(eval($("#row_pkj_5").val())+1);

    $("#row_subpkj_4").val(eval($("#row_subpkj_4").val())+1);
  }
  else if(pkj == 'pkj_5'){
    $("#row_pkj_5").val(eval($("#row_pkj_5").val())+1);

    $("#row_subpkj_5").val(eval($("#row_subpkj_5").val())+1);
  }
}

 function removeRow(row){
  if (confirm("Delete Data Detail MP?")){
    var pkj = row.className;
    var idx = (row.id).split("remove");
    var pkjx = (row.id).split("_");

    var nomp = $("#innomp").val();
    var nopkj = pkjx[1];
    var nosubpkj = $("#subpkj"+idx[1]+"").val();

    if($("#ambil"+idx[1]+"").val() == 0){

      if (nomp != "" && nopkj != "" && nosubpkj != "") {
        var datax = $("#deletedetail").val();
        var removex = datax+nomp+"|"+nopkj+"|"+nosubpkj+"#";
        $("#deletedetail").val(removex);
      }

      var row = row.parentNode.parentNode;
      row.parentNode.removeChild(row);

      if(pkj == 'pkj_1'){
          $("#row_pkj_1").val(eval($("#row_pkj_1").val())-1);
          $("#row_pkj_2").val(eval($("#row_pkj_2").val())-1);
          $("#row_pkj_3").val(eval($("#row_pkj_3").val())-1);
          $("#row_pkj_4").val(eval($("#row_pkj_4").val())-1);
          $("#row_pkj_5").val(eval($("#row_pkj_5").val())-1);

          // $("#row_subpkj_1").val(eval($("#row_subpkj_1").val())-1);
      }
      else if(pkj == 'pkj_2'){
          $("#row_pkj_2").val(eval($("#row_pkj_2").val())-1);
          $("#row_pkj_3").val(eval($("#row_pkj_3").val())-1);
          $("#row_pkj_4").val(eval($("#row_pkj_4").val())-1);
          $("#row_pkj_5").val(eval($("#row_pkj_5").val())-1);

          // $("#row_subpkj_2").val(eval($("#row_subpkj_2").val())-1);
      }
      else if(pkj == 'pkj_3'){
          $("#row_pkj_3").val(eval($("#row_pkj_3").val())-1);
          $("#row_pkj_4").val(eval($("#row_pkj_4").val())-1);
          $("#row_pkj_5").val(eval($("#row_pkj_5").val())-1);

          // $("#row_subpkj_3").val(eval($("#row_subpkj_3").val())-1);
      }
      else if(pkj == 'pkj_4'){
          $("#row_pkj_4").val(eval($("#row_pkj_4").val())-1);
          $("#row_pkj_5").val(eval($("#row_pkj_5").val())-1);

          // $("#row_subpkj_4").val(eval($("#row_subpkj_4").val())-1);
      }
      else if(pkj == 'pkj_5'){
          $("#row_pkj_5").val(eval($("#row_pkj_5").val())-1);

          // $("#row_subpkj_5").val(eval($("#row_subpkj_5").val())-1);
      }
    }
    else{
      alert("Sudah Ada Pengambilan Barang !");
    }
  }
}

function resizeTextarea (id) {
  var a = document.getElementById(id);
  a.style.height = '20px';
  a.style.height = a.scrollHeight+'px';
  // $('#'+id).scrollTop($('#'+id)[0].scrollHeight);
  // alert(a.scrollHeight);
}

function autoresize(){
  for (var i = 0; i <= 5; i++) {
    $(".component_"+i).each(function(){
      resizeTextarea($(this).attr('id'));
    });
    $(".material_"+i).each(function(){
      resizeTextarea($(this).attr('id'));
    })
    $(".supplier_"+i).each(function(){
      resizeTextarea($(this).attr('id'));
    })
  }
}

function init() {
  var a = document.getElementsByTagName('textarea');
  for(var i=0,inb=a.length;i<inb;i++) {
     if(a[i].getAttribute('data-resizable')=='true')
      resizeTextarea(a[i].id);
  }
}

function check(event,id){
  if (event.keyCode == 13 || event.keyCode == 9) {
    if (id == "customer"){
      var data ="intxtmode=checkcustomer&inkdcust=" + $("#inkdcust").val() +"";
      $.ajax({
        url: "actfrm.php",
        data: data,
        type: "POST",
        cache: false,
        success:function(data){
          var checkcustomer = data.split('|');
          if(checkcustomer[0] == 'ok'){
            $("#innmcust").val(checkcustomer[1]);

            if (checkcustomer[2] > 0) {
              $("#inkdbrand").attr('disabled',false);
              $("#innmbrand").attr('disabled',false);
              $("#inkdbrand").val('');
              $("#innmbrand").val('');
              $("#inkdbrand").focus();
            }
            else {
              $("#inartprod").focus();
              $("#inkdbrand").attr('disabled',true);
              $("#innmbrand").attr('disabled',true);
            }
          }
          else {
            openDialog(id);
            // alert("open dialog !");
          }
        }
      });
    }
    else if (id == "brand"){
      if ($("#inkdcust").val() == "") {
        alert("Kode Customer Kosong");
        $("#inkdcust").val('');
        $("#innmcust").val('');
        $("#inkdbrand").val('');
        $("#innmbrand").val('');
      }
      else{
        var data ="intxtmode=checkbrand&inkdcust=" + $("#inkdcust").val() +"&inkdbrand=" + $("#inkdbrand").val() +"";
        $.ajax({
          url: "actfrm.php",
          data: data,
          type: "POST",
          cache: false,
          success:function(data){
            var checkvaluta = data.split('|');
            if(checkvaluta[0] == 'ok'){
              $("#innmbrand").val(checkvaluta[1]);
              $("#inartprod").focus();
            }
            else {
              openDialog(id);
              // alert("open dialog !");
            }
          }
        });
      }
    }
  }
}

function checking(id){
  if (id == "customer"){
      var data ="intxtmode=checkcustomer&inkdcust=" + $("#inkdcust").val() +"";
      $.ajax({
        url: "actfrm.php",
        data: data,
        type: "POST",
        cache: false,
        success:function(data){
          var checkcustomer = data.split('|');
          if(checkcustomer[0] == 'ok'){
            $("#innmcust").val(checkcustomer[1]);

            if (checkcustomer[2] > 0) {
              if ($("#intxtmode").val() != "edit") {
                $("#inkdbrand").attr('disabled',false);
                $("#innmbrand").attr('disabled',false);
              }
            }
            else {
              $("#inartprod").focus();
              $("#inkdbrand").attr('disabled',true);
              $("#innmbrand").attr('disabled',true);
            }
          }
          else {
            openDialog(id);
            // alert("open dialog !");
          }
        }
      });
    }
    else if (id == "brand"){
        var data ="intxtmode=checkbrand&inkdcust=" + $("#inkdcust").val() +"&inkdbrand=" + $("#inkdbrand").val() +"";
        $.ajax({
          url: "actfrm.php",
          data: data,
          type: "POST",
          cache: false,
          success:function(data){
            var checkvaluta = data.split('|');
            if(checkvaluta[0] == 'ok'){
              $("#innmbrand").val(checkvaluta[1]);
              $("#inartprod").focus();
            }
            else {
              openDialog(id);
              // alert("open dialog !");
            }
          }
        });
    }
}

function checkset(id){
  if (id == "brand") {
    var data ="intxtmode=checksetbrand&inkdcust=" + $("#inkdcust").val() +"";
    $.ajax({
      url: "actfrm.php",
      data: data,
      type: "POST",
      cache: false,
      success:function(data){
        if (data == 1) {
          $("#inkdbrand").attr('disabled',false);
          $("#innmbrand").attr('disabled',false);
          $("#inkdbrand").val('');
          $("#innmbrand").val('');
          $("#inkdbrand").focus();
        }
        else {
          $("#inartprod").focus();
          $("#inkdbrand").attr('disabled',true);
          $("#innmbrand").attr('disabled',true);
        }
      }
    })
  }
}

function setnama(){
  var data ="intxtmode=setnmassort&inkdassort="+$("#inkdassort").val()+"";
  $.ajax({
    url: "actfrm.php",
    type: "POST",
    data: data,
    cache: false,
    success: function (data) {
        $("#innmassort").text(data);
    }
  })
}

function add(id){
  if (id == 'salesorder') {
    if($("#inkdbrg").val() == ""){
      alert("Input Kode Barang Kosong!");
    }
    else {
      var data ="intxtmode=addsalesorder&innoso="+$("#innoso").val()+"&inkdassort="+$("#inkdassort").val()+"&inkdbrg="+$("#inkdbrg").val()+"";
      $.ajax({
        url: "actfrm.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (data) {
            // alert(data);
          var result = data.split('|');
          if (result[0] == 0) {
            alert("Kode Barang Tidak Ada !");
          }
          else{
            selectset(result[0],result[1],result[2],result[3],result[4],result[5],result[6],result[7],result[8],result[9],result[10],result[11],result[12],result[13],result[14],result[15],result[16],result[17],result[18],result[19],result[20],result[21],result[22],result[23],result[24],result[25],result[26],result[27],result[28],result[29],result[30],result[31],'kdbrg');
          }
        }
      })
    }
  }
}

function remove(id){
  if (id == "salesorder") {
    var data ="intxtmode=removesalesorder&innomp="+$("#innomp").val()+"&inkdbrg="+$("#inkdbrg").val()+"&inkdassort="+$("#inkdassort").val()+"";
    $.ajax({
      url: "actfrm.php",
      type: "POST",
      data: data,
      cache: false,
      success: function (data) {
        alert(data);
        clearinput("salesorder");
      }
    })
  }
}

function selectset(nopo, tglpo, kdjenis, nmjenis, tglkrm, kdbrg, nmbrg, dord33, dord33s, dord34, dord34s, dord35, dord35s, dord36, dord36s, dord37, dord37s, dord38, dord38s, dord39, dord39s, dord40, dord40s, dord41, dord41s, dord42, dord42s, dord43, dord43s, dord44, dord44s, tot, id){
  if (id == "kdbrg") {
    $("#inkdbrg").val(kdbrg);
    $("#innopo").val(nopo);
    $("#intglpo").val(tglpo);
    $("#indord33").val(dord33);
    $("#indord33s").val(dord33s);
    $("#indord34").val(dord34);
    $("#indord34s").val(dord34s);
    $("#indord35").val(dord35);
    $("#indord35s").val(dord35s);
    $("#indord36").val(dord36);
    $("#indord36s").val(dord36s);
    $("#indord37").val(dord37);
    $("#indord37s").val(dord37s);
    $("#indord38").val(dord38);
    $("#indord38s").val(dord38s);
    $("#indord39").val(dord39);
    $("#indord39s").val(dord39s);
    $("#indord40").val(dord40);
    $("#indord40s").val(dord40s);
    $("#indord41").val(dord41);
    $("#indord41s").val(dord41s);
    $("#indord42").val(dord42);
    $("#indord42s").val(dord42s);
    $("#indord43").val(dord43);
    $("#indord43s").val(dord43s);
    $("#indord44").val(dord44);
    $("#indord44s").val(dord44s);
    $("#intotord").val(tot);
    $("#inkdjenis").val(kdjenis);
    $("#incategory").val(nmjenis);
    $("#intglkirim").val(tglkrm);
    $("#innmbrg").val(nmbrg);

    $(".indord33").val(dord33);
    $(".indord33s").val(dord33s);
    $(".indord34").val(dord34);
    $(".indord34s").val(dord34s);
    $(".indord35").val(dord35);
    $(".indord35s").val(dord35s);
    $(".indord36").val(dord36);
    $(".indord36s").val(dord36s);
    $(".indord37").val(dord37);
    $(".indord37s").val(dord37s);
    $(".indord38").val(dord38);
    $(".indord38s").val(dord38s);
    $(".indord39").val(dord39);
    $(".indord39s").val(dord39s);
    $(".indord40").val(dord40);
    $(".indord40s").val(dord40s);
    $(".indord41").val(dord41);
    $(".indord41s").val(dord41s);
    $(".indord42").val(dord42);
    $(".indord42s").val(dord42s);
    $(".indord43").val(dord43);
    $(".indord43s").val(dord43s);
    $(".indord44").val(dord44);
    $(".indord44s").val(dord44s);
    $(".intotord").val(tot);

    $("#dialog-open").dialog("close");

    if ($("intxtmode").val() != 'edit') {
      autocalculate();
    }
  }
}

function select(kd, nm, id) {
  if (id == "customer") {
    $("#inkdcust").val(kd);
    $("#innmcust").val(nm);
    checkset("brand");
  }
  else if (id == "brand") {
    $("#inkdbrand").val(kd);
    $("#innmbrand").val(nm);
    $("#inartprod").focus();
  }
  else if (id == "ticket") {
    showinput_detailcopy(kd,nm);
    $("#intxtmode").val('add');
    $("#mode").text('Add New');
    $("#inkdin").val('~AUTO~');
    $("#inkodetiket").val(nm);
    // $("#areabutton").hide();
    // $("#areacopy").show();
  }
  else if (id == "copymp") {
    copydata(kd);
    $("#intxtmode").val('add');
    $("#mode").text('Add New');
    $("#inkdin").val('~AUTO~');
    $("#inkodetiket").val('');
  }
  else if (id == "sku") {
    $("#insku").val(kd);
  }
  else{
    var idx = id.split("_");
    if (idx[0] == "component") {
      $("#id_"+id).val(kd);
      $("#"+id).val(nm);
      $("#"+id).focus();
      resizeTextarea(id);
    }
    else if (idx[0] == "material") {
      $("#id_"+id).val(kd);
      $("#show_id_"+id).text(kd);
      $("#"+id).val(nm);
      $("#"+id).focus();
      resizeTextarea(id);
    }
    else if (idx[0] == "supplier") {
      $("#id_"+id).val(kd);
      $("#show_id_"+id).text(kd);
      $("#"+id).val(nm);
      $("#"+id).focus();
      resizeTextarea(id);
    }
  }

  $("#dialog-open").dialog("close");
}

function change(){
  setnama();
  var indkdassort = $("#inkdassort").val();
  if (indkdassort == 'EA' ) {
    $("#33").text('S. 33');
    $("#34").text('S. 34');
    $("#35").text('S. 35');
    $("#36").text('S. 36');
    $("#37").text('S. 37');
    $("#38").text('S. 38');
    $("#39").text('S. 39');
    $("#40").text('S. 40');
    $("#41").text('S. 41');
    $("#42").text('S. 42');
    $("#43").text('S. 43');
    $("#44").text('S. 44');

    $("#33s").text('S. 33 s');
    $("#34s").text('S. 34 s');
    $("#35s").text('S. 35 s');
    $("#36s").text('S. 36 s');
    $("#37s").text('S. 37 s');
    $("#38s").text('S. 38 s');
    $("#39s").text('S. 39 s');
    $("#40s").text('S. 40 s');
    $("#41s").text('S. 41 s');
    $("#42s").text('S. 42 s');
    $("#43s").text('S. 43 s');
    $("#44s").text('S. 44 s');

    $(".33").text('33');
    $(".34").text('34');
    $(".35").text('35');
    $(".36").text('36');
    $(".37").text('37');
    $(".38").text('38');
    $(".39").text('39');
    $(".40").text('40');
    $(".41").text('41');
    $(".42").text('42');
    $(".43").text('43');
    $(".44").text('44');

    $(".33s").text('33.5');
    $(".34s").text('34.5');
    $(".35s").text('35.5');
    $(".36s").text('36.5');
    $(".37s").text('37.5');
    $(".38s").text('38.5');
    $(".39s").text('39.5');
    $(".40s").text('40.5');
    $(".41s").text('41.5');
    $(".42s").text('42.5');
    $(".43s").text('43.5');
    $(".44s").text('44.5');
  } else if (indkdassort == 'JA') {
    $("#33").text('S. 21');
    $("#34").text('S. 22');
    $("#35").text('S. 23');
    $("#36").text('S. 24');
    $("#37").text('S. 25');
    $("#38").text('S. 26');
    $("#39").text('S. 27');
    $("#40").text('S. 28');
    $("#41").text('S. 29');
    $("#42").text('S. 30');
    $("#43").text('S. 31');
    $("#44").text('S. 32');

    $("#33s").text('S. 21 s');
    $("#34s").text('S. 22 s');
    $("#35s").text('S. 23 s');
    $("#36s").text('S. 24 s');
    $("#37s").text('S. 25 s');
    $("#38s").text('S. 26 s');
    $("#39s").text('S. 27 s');
    $("#40s").text('S. 28 s');
    $("#41s").text('S. 29 s');
    $("#42s").text('S. 30 s');
    $("#43s").text('S. 31 s');
    $("#44s").text('S. 32 s');

    $(".33").text('21');
    $(".34").text('22');
    $(".35").text('23');
    $(".36").text('24');
    $(".37").text('25');
    $(".38").text('26');
    $(".39").text('27');
    $(".40").text('28');
    $(".41").text('29');
    $(".42").text('30');
    $(".43").text('31');
    $(".44").text('32');

    $(".33s").text('21.5');
    $(".34s").text('22.5');
    $(".35s").text('23.5');
    $(".36s").text('24.5');
    $(".37s").text('25.5');
    $(".38s").text('26.5');
    $(".39s").text('27.5');
    $(".40s").text('28.5');
    $(".41s").text('29.5');
    $(".42s").text('30.5');
    $(".43s").text('31.5');
    $(".44s").text('32.5');
  } else if (indkdassort == 'UA') {
    $("#33").text('S. 3');
    $("#34").text('S. 4');
    $("#35").text('S. 5');
    $("#36").text('S. 6');
    $("#37").text('S. 7');
    $("#38").text('S. 8');
    $("#39").text('S. 9');
    $("#40").text('S. 10');
    $("#41").text('S. 11');
    $("#42").text('S. 12');
    $("#43").text('S. 13');
    $("#44").text('S. 14');

    $("#33s").text('S. 3 s');
    $("#34s").text('S. 4 s');
    $("#35s").text('S. 5 s');
    $("#36s").text('S. 6 s');
    $("#37s").text('S. 7 s');
    $("#38s").text('S. 8 s');
    $("#39s").text('S. 9 s');
    $("#40s").text('S. 10 s');
    $("#41s").text('S. 11 s');
    $("#42s").text('S. 12 s');
    $("#43s").text('S. 13 s');
    $("#44s").text('S. 14 s');

    $(".33").text('3');
    $(".34").text('4');
    $(".35").text('5');
    $(".36").text('6');
    $(".37").text('7');
    $(".38").text('8');
    $(".39").text('9');
    $(".40").text('10');
    $(".41").text('11');
    $(".42").text('12');
    $(".43").text('13');
    $(".44").text('14');

    $(".33s").text('3.5');
    $(".34s").text('4.5');
    $(".35s").text('5.5');
    $(".36s").text('6.5');
    $(".37s").text('7.5');
    $(".38s").text('8.5');
    $(".39s").text('9.5');
    $(".40s").text('10.5');
    $(".41s").text('11.5');
    $(".42s").text('12.5');
    $(".43s").text('13.5');
    $(".44s").text('14.5');
  }
}

function getDate(id){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd = '0'+dd
  } 

  if(mm<10) {
    mm = '0'+mm
  } 

  today = dd + '/' + mm + '/' + yyyy;

  $("#"+id).val(today);
}

function startUpload() {
  $("#uploaded-picture").show();
  $("#uploaded-picture").html("loading...");
}

function submitclick() {
  cancel_gambar();
}

function cancel_gambar() {
  var data = "intxtmode=cancel_gambar&inxgambar=" + $("#inxgambar").val() + "";
  $.ajax({
    url: "actfrm.php",
    type: "POST",
    data: data,
    cache: false,
    success: function(data) {
      $("#uploaded-picture").html("");
      $("#formupload").submit();
    }
  });
}

function displayPicture(pictureUrl,id) {
  if (id == "modal") {
    $("#inxgambar").val(pictureUrl);
    var img = new Image();
    $(img)
      .load(function() {
        $(this).attr("width", "120");
        $(this).attr("height", "120");
        $(this).hide();
        $("#uploaded-picture").html($(this));
        $(this).fadeIn();

        $("#cmdsavepict").show();
      })
      .attr("src", pictureUrl+"?"+random(1))
      .error(function() {
        alert("Gagal Menampilkan Gambar");
      });
  }
  else {
    $("#inxgambar_1").val(pictureUrl);
    var img = new Image();
    $(img)
      .load(function() {
        $(this).attr("width", "120");
        $(this).attr("height", "120");
        $(this).hide();
        $("#uploaded-picture_1").html($(this));
        $(this).fadeIn();

        $("#cmdsavepict").show();
      })
      .attr("src", pictureUrl+"?"+random(1))
      .error(function() {
        if ($("#intxtmode").val() != "edit") {
          alert("Gagal Menampilkan Gambar");
        }
      });
  }
}

function saveImage(){
  if ($("#picture").val() == "" && $("#inxgambar").val() == "") {
    alert("Input Gambar Kosong !");
  }
  else {
    $("#cmdSaveImage").attr("disabed", "disabled");
    var data =
      "intxtmode=saveimage" +
      "&inxgambar="+encodeURIComponent($("#inxgambar").val()) +
      "&inkdcust="+$("#inkdcust").val()+
      "&inartprod="+$("#inartprod").val()+
      "";
    $.ajax({
      url: "actfrm.php",
      type: "POST",
      data: data,
      cache: false,
      success: function(data) {
        clearInputImage();
        alert("Gambar Berhasil Disimpan");
        displayPicture(data,'');
        $("#inxgambar_1").val(data);
        $("#dialog-open").dialog("close");
      }
    });
    $("#cmdSaveImage").attr("disabed", "");
  }
}

function clearInputImage() {
  $("#inxgambar").val("");
  $("#picture").val("");
  $("#uploaded-picture").html("");
}

function deleteImage() {
  var data = "intxtmode=deleteimage&inxgambar="+$("#inxgambar").val()+"";
  $.ajax({
    url: "actfrm.php",
    type: "POST",
    data: data,
    cache: false,
    success: function(data) {
      alert(data);
      $("#uploaded-picture").html("<img src=\"gambar/No_Image_Available.jpg\" style=\"width: 120px; height: 120px;\">");
      $("#uploaded-picture_1").html("<img src=\"gambar/No_Image_Available.jpg\" style=\"width: 120px; height: 120px;\">");
      $("#inxgambar").val("");
      $("#inxgambar_1").val("");
    }
  });
}

function getAutocomplete(id){
  var idx = id.split('_');
  if(idx[0] == "component"){  
    var url = "getKomponen.php";
  }
  else if (idx[0] == "material") {
    var url = "getMaterial.php";
  }
  else if (idx[0] == "supplier") {
    var url = "getSupplier.php";
  }

  $("#"+id).autocomplete({
    source: url,
    focus: function(event, ui) {
      event.preventDefault();
      $("#id_"+id).val(ui.item.value);
      $("#show_id_"+id).text(ui.item.value);
      $("#"+id).val(ui.item.label);

      if (idx[0] == "material") {
        $("#unit_"+idx[1]+"_"+idx[2]).val(ui.item.satuan);
      }
    },
    select: function (event, ui) {
      event.preventDefault();
      $("#id_"+id).val(ui.item.value);
      $("#show_id_"+id).text(ui.item.value);
      $("#"+id).val(ui.item.label);
      resizeTextarea(id);
      if (idx[0] == "material") {
        $("#unit_"+idx[1]+"_"+idx[2]).val((ui.item.satuan).trim());
      }
        // alert(id);
    }
  });

}

function issued(){
  if ($("#innomp").val() == "") {
    alert("No MP Kosong!");
  }
  else if (confirm("Issued MP '"+($("#innomp").val()).toUpperCase()+"' ?")){
    var data = "intxtmode=issuedmp&innomp="+$("#innomp").val()+"";
    $.ajax({
    url: "actfrm.php",
    type: "POST",
    data: data,
    cache: false,
    success: function(data) {
      alert(data);
      getDate('intglissuedmp');
      hide('editinput');
      }
    });
  }
}

function checkissued(){
  var nomp = $("#innompx").val();
  var data = "intxtmode=checkissued&innomp="+nomp+"";
  $.ajax({
  url: "actfrm.php",
  type: "POST",
  data: data,
  cache: false,
  success: function(data) {
      if (data == 1) {
        alert("No MP :'"+nomp+"' Sudah Di Issued");
      }
      else{
        editclick();
      }
    }
  });
}

function unissued(){
  var n = $("input:checked").length;
  if(n==0){
    alert('Pilih Data !');
  }
  else{
    if (confirm("Un Issued MP ?")){
      $("input:checked").each(function () {
          var result = ($(this).val()).split(",");
          var data = "intxtmode=unissued&innomp="+result[0]+"&innomc="+result[1]+"&innoso="+result[2]+"";
          $.ajax({
           url: "actfrm.php",
           type: "POST",
           data: data,
           cache: false,
           success: function(data) {
            alert(data);
          }
        });
      });
      findclick();
    }
  }
}

function fixNumber(id){
  var input = $("#"+id).val();
  input = input.replace(".","");
  var parts = input.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{4})+(?!\d))/g, ".");
  $("#"+id).val(parts.join("."));
}

function calculate(id, xid){
  if (id == 'qty') {
    var qty = ($("#"+xid).val())*($("#intotord").val());
    var xid = xid.split("calc_mp");

    qty = qty.toFixed(4);
    $("#qty"+xid[1]).val(qty);
  }
}

function autocalculate(){
  for (var i = 0; i <= 5; i++) {
    $(".calc_mp_"+i).each(function(){
      calculate('qty',$(this).attr('id'));
    })
  }
}

function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}

function number(e){
  // Allow: backspace, delete, tab, escape, enter and .
  if (
    $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl/cmd+A
    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+C
    (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+V
    (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+X
    (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
  }
}

function growTextarea (i,elem) {
  var elem = $(elem);
  var offset = elem.prop('offsetHeight') - elem.prop('clientHeight');
   var resizeTextarea = function( elem ) {
     var scrollLeft = window.pageXOffset || (document.documentElement || document.body.parentNode || document.body).scrollLeft;
     var scrollTop  = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
     elem.css('height', 'auto').css('height', elem.prop('scrollHeight') );

     window.scrollTo(scrollLeft, scrollTop);
  };
  elem.on('input', function() {
      resizeTextarea( $(this) );
  });
  resizeTextarea( $(elem) );
}

function resize(){
  // $('.resize').each(growTextarea);
  // $("#inrspecial").keypress(growTextarea);
  // $("#inrket").keypress(growTextarea);
  growTextarea();
}

function random(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function detail_order(no){
  var x = document.getElementById("detail_order"+no);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function checkso(){
  $.ajax({
    url:"actfrm.php",
    type:"POST",
    data:"intxtmode=checkso&innomp="+$("#innomp").val()+"&innomc="+$("#innomc").val()+"&innoso="+$("#innoso").val()+"",
    cache:false,
    success: function(data){
      if (data == 1) {
        alert("Quantity Order di MP dan SO Tidak Sama !");
      }
    }
  })
}


// ******************************* START JS MULTISEARCH ***************************************
var xrow = 1;
function addSearch(){
  var table = document.getElementById("tblSearch");

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(xrow);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        
//        cell2.className = 'txtmultisearch';

        // Add some text to the new cells:
        cell1.innerHTML = 
        "Field : \n\
        <select class='txtfield' id='txtfield" +
        xrow +
        "' onchange=\"setFilterData(" +
        xrow +
        ")\">\n\
        <option value=''>-</option>\n\
        <option value='a.mpno'>No. MP</option>\n\
        <option value='a.cust'>Kode Customer</option>\n\
        <option value=\"DATE_FORMAT(a.dateiss,'%d/%m/%Y')\">Date Issued</option>\n\
        <option value='a.article'>Article</option>\n\
        <option value='a.`last`'>Last</option>\n\
        <option value='a.noso'>No. SO</option>\n\
        </div>\n\
        </select>";
        cell2.innerHTML = "<select class='txtparameter' id='txtparameter"+xrow+"'>\n\
        <option value='like'>like</option>\n\
        <option value='equal'>equal</option>\n\
        <option value='notequal'>not equal</option>\n\
        <option value='less'>less</option>\n\
        <option value='lessorequal'>less or equal</option>\n\
        <option value='greater'>greater</option>\n\
        <option value='greaterorequal'>greater or equal</option>\n\
        <option value='isnull'>is null</option>\n\
        <option value='isnotnull'>is not null</option>\n\
        <option value='isnotnull'>is not null</option>\n\
        <option value='isin'>is in</option>\n\
        <option value='isnotin'>is not in</option>\n\
        </select>";
        cell3.innerHTML = 
        "<div id='filter_data" +
          xrow +
          "'>Data : <input type='text' class='txtdata' onkeydown='enterfind(event)'></div>";
        cell4.innerHTML = "<input type='button' value='[+]' onclick='addSearch()'>";
        cell5.innerHTML = "<input type='button' value='remove' onclick=\"deleteRow(this)\" style='cursor:pointer;'>";
        
        xrow++;
      }

      function deleteRow(btn) {
      //
      if (btn == "rmv1") {
        $("#txtfield0").val("");
        $("#txtparameter0").val("like");

        var data_select =
        "Data : <input type='text' class='txtdata' onkeydown='enterfind(event)'>";

        $("#filter_data0").html(data_select);
        $("#txtdata0").val("");
      } else {
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
        xrow--;
      }
    }

// ******************************* END JS MULTISEARCH ***************************************

function showpage(page){
  $("#txtpage").val(page);
  findclick();
}

function prevpage(){
  var n = eval($("#txtpage").val())-1 ;
  if (n >= 1) {
    $("#txtpage").val(n);
    findclick();
  }
}

function nextpage(){
  var n = eval($("#txtpage").val())+1 ;
  if (eval(n)<=eval($("#jumpage").val())){
    $("#txtpage").val(n);
    findclick();
  }
}

$(function() {
  $( "#tglmasuk" ).datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth : true,
    changeYear  : true
  });
  $( "#tglkontrak" ).datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth : true,
    changeYear  : true
  });
  $( "#intxttglmasuk" ).datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth : true,
    changeYear  : true
  });
  $( "#intxttglkontrak" ).datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth : true,
    changeYear  : true
  });
});


function MyValidDate(dateString){
    var validformat=/^\d{1,2}\/\d{1,2}\/\d{4}$/ //Basic check for format validity
    if (!validformat.test(dateString)){
      return ''
    }else{ //Detailed check for valid date ranges
      var dayfield=dateString.substring(0,2);
      var monthfield=dateString.substring(3,5);
      var yearfield=dateString.substring(6,10);
      var MyNewDate = monthfield + "/" + dayfield + "/" + yearfield;
      if (checkValidDate(MyNewDate)==true){
        var SQLNewDate = yearfield + "/" + monthfield + "/" + dayfield;
        return SQLNewDate;
      }else{
        return '';
      }
    }
  }

  function checkValidDate(dateStr) {
    // dateStr must be of format month day year with either slashes
    // or dashes separating the parts. Some minor changes would have
    // to be made to use day month year or another format.
    // This function returns True if the date is valid.
    var slash1 = dateStr.indexOf("/");
    if (slash1 == -1) { slash1 = dateStr.indexOf("-"); }
    // if no slashes or dashes, invalid date
    if (slash1 == -1) { return false; }
    var dateMonth = dateStr.substring(0, slash1)
    var dateMonthAndYear = dateStr.substring(slash1+1, dateStr.length);
    var slash2 = dateMonthAndYear.indexOf("/");
    if (slash2 == -1) { slash2 = dateMonthAndYear.indexOf("-"); }
    // if not a second slash or dash, invalid date
    if (slash2 == -1) { return false; }
    var dateDay = dateMonthAndYear.substring(0, slash2);
    var dateYear = dateMonthAndYear.substring(slash2+1, dateMonthAndYear.length);
    if ( (dateMonth == "") || (dateDay == "") || (dateYear == "") ) { return false; }
    // if any non-digits in the month, invalid date
    for (var x=0; x < dateMonth.length; x++) {
      var digit = dateMonth.substring(x, x+1);
      if ((digit < "0") || (digit > "9")) { return false; }
    }
    // convert the text month to a number
    var numMonth = 0;
    for (var x=0; x < dateMonth.length; x++) {
      digit = dateMonth.substring(x, x+1);
      numMonth *= 10;
      numMonth += parseInt(digit);
    }
    if ((numMonth <= 0) || (numMonth > 12)) { return false; }
    // if any non-digits in the day, invalid date
    for (var x=0; x < dateDay.length; x++) {
      digit = dateDay.substring(x, x+1);
      if ((digit < "0") || (digit > "9")) { return false; }
    }
    // convert the text day to a number
    var numDay = 0;
    for (var x=0; x < dateDay.length; x++) {
      digit = dateDay.substring(x, x+1);
      numDay *= 10;
      numDay += parseInt(digit);
    }
    if ((numDay <= 0) || (numDay > 31)) { return false; }
    // February can't be greater than 29 (leap year calculation comes later)
    if ((numMonth == 2) && (numDay > 29)) { return false; }
    // check for months with only 30 days
    if ((numMonth == 4) || (numMonth == 6) || (numMonth == 9) || (numMonth == 11)) {
      if (numDay > 30) { return false; }
    }
    // if any non-digits in the year, invalid date
    for (var x=0; x < dateYear.length; x++) {
      digit = dateYear.substring(x, x+1);
      if ((digit < "0") || (digit > "9")) { return false; }
    }
    // convert the text year to a number
    var numYear = 0;
    for (var x=0; x < dateYear.length; x++) {
      digit = dateYear.substring(x, x+1);
      numYear *= 10;
      numYear += parseInt(digit);
    }
    // Year must be a 2-digit year or a 4-digit year
    if ( (dateYear.length != 2) && (dateYear.length != 4) ) { return false; }
    // if 2-digit year, use 50 as a pivot date
    if ( (numYear < 50) && (dateYear.length == 2) ) { numYear += 2000; }
    if ( (numYear < 100) && (dateYear.length == 2) ) { numYear += 1900; }
    if ((numYear <= 0) || (numYear > 9999)) { return false; }
    // check for leap year if the month and day is Feb 29
    if ((numMonth == 2) && (numDay == 29)) {
      var div4 = numYear % 4;
      var div100 = numYear % 100;
      var div400 = numYear % 400;
        // if not divisible by 4, then not a leap year so Feb 29 is invalid
        if (div4 != 0) { return false; }
        // at this point, year is divisible by 4. So if year is divisible by
        // 100 and not 400, then it's not a leap year so Feb 29 is invalid
        if ((div100 == 0) && (div400 != 0)) { return false; }
      }
    // date is valid
    return true;
  }
