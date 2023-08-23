<?php
  include("../../connection.php");
  if(isset($_POST['inkdbrand'])){
    $txtdatamodal = $_POST['inkdbrand'];
  }

  if (isset($_POST['inid'])) {
    $inid = $_POST['inid'];
  }

  unset($_POST['inkdbrand']);
  // unset($_POST['inid']);
?>
<script type="text/javascript">
  $(document).ready(function(){
    $("#frmloadingmodal").hide();
    $("#txtdatamodal").val('<?=$txtdatamodal?>');
    findclick_modal();
    }
  );
  
  function enterfindmodal(event){
    if(event.keyCode==13){
      findclick_modal();
    }
    else{
      return ;
    }
  };

  function showpage_modal(page) {
    $("#txtpagemodal").val(page);
    findclick_modal();
  }

  function prevpage_modal() {
    var n = eval($("#txtpagemodal").val()) - 1;
    if (n >= 1) {
      $("#txtpagemodal").val(n);
      findclick_modal();
    }
  }

  function nextpage_modal() {
    var n = eval($("#txtpagemodal").val()) + 1;
    if (eval(n) <= eval($("#jumpagemodal").val())) {
      $("#txtpagemodal").val(n);
      findclick_modal();
    }
  }
  
  function findclick_modal(){
    var id = '<?=$inid?>'
    var data = "txtpagemodal="+$("#txtpagemodal").val()+
               "&txtperpagemodal="+$("#txtperpagemodal").val()+
               "&txtdatamodal="+$("#txtdatamodal").val()+
               "&txtfield="+$("#txtfieldmodal").val()+
               "&inid="+id+
               "";
           
    $("#frmbodymodal").slideUp('slow',function(){
    $("#frmloadingmodal").slideDown('slow',function(){
    $.ajax({
      url: "frmviewModal.php",
      type: "POST",
      data: data,
      cache: false,
      success: function (html) {
        $("#frmcontentmodal").html(html);
                $("#frmbodymodal").slideDown('slow',function(){
                  $("#frmloadingmodal").slideUp('slow');
                });
                }
      });
    });
    });
  };
</script>

  <table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>
        <div id="areasearch">
          <fieldset class="info_fieldset"><legend>Search</legend>
            <form id="ajax-contact-form" action="#">
              <table width="100%"  border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <label style="width: 30px">Field</label>
                    <select id="txtfieldmodal">
                        <option value="">-</option>
                        <option selected value="kdbrand">Kode Brand</option>
                        <option value="nmbrand">Nama Brand</option>
                    </select>
                  </td>
                  <td>
                    <label style="width: 30px" >Data</label>
                    <INPUT type="text" id="txtdatamodal" onkeypress="enterfindmodal(event)"/>
                  </td>
                  <td>
                    <INPUT id="cmdfind_modal" class="buttongofind" type="button" name="cmdfind_modal" value="Find" onclick="findclick_modal()"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label style="width: 30px">View</label>
                    <div id="infoview" align="left"><INPUT id="txtperpagemodal" class="textbox" type="text" name="txtperpagemodal" value="10" onkeydown="enterfind(event)"/></div>
                  </td>
                  <td colspan="2">
                    <label style="width: 30px"></label>
                    <div id="infocmdpage" align="left" style="margin-right: 50px;" >
                      <INPUT id="cmdbackmodal" class="buttonback" type="button" name="nmcmdbackmodal" value="Prev" onclick="prevpage_modal()"/>
                      <INPUT id="txtpagemodal" class="textbox" type="text" name="nmtxtpagemodal" value="1"/>
                      <INPUT id="cmdnextmodal" class="buttonnext" type="button" name="nmcmdnextmodal" value="Next" onclick="nextpage_modal()"/>
                    </div>
                  </td>
                  <td>
                    <div align="right">
                      <table>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </form>
          </fieldset>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div id="frmloadingmodal" align="center">
          <img src="img/ajax-loader.gif" />
        </div>
        <div id="frmbodymodal">
          <div id="frmcontentmodal">
          </div>
        </div>
      </td>
    </tr>
  </table>