<?php

include("../../configuration.php");
include("../../connection.php");
include("actsearch.php");

    // Get Variabel

    //Cek Get Data
if(isset($_POST['txtpage'])){
  $txtpage = $_POST['txtpage'];
  $showPage = $txtpage;
  $noPage = $txtpage;
}else{
  $txtpage = 1;
  $showPage = $txtpage;
  $noPage = $txtpage;
}
if(isset($_POST['txtperpage'])){
  $txtperpage=$_POST['txtperpage'];
}else{
  $txtperpage=10;
}

$offset = ($txtpage - 1) * $txtperpage;
$sqlLIMIT = " LIMIT $offset, $txtperpage";
$sqlWHERE = " ";

if(isset($_POST['txtfield'])){
  if($_POST['txtfield']!=''){
    $txtfield = $_POST['txtfield'];

    if(isset($_POST['txtparameter'])){
      if ($_POST['txtparameter']!=''){
        $txtparameter = $_POST['txtparameter'];
      }
    }

    if(isset($_POST['txtdata'])){
      if ($_POST['txtdata']!=''){
        $txtdata = $_POST['txtdata'];
      }
    }

    $txtfieldx = explode("|",rtrim($txtfield,'|'));
    $txtparameterx = explode("|",rtrim($txtparameter,'|'));
    $txtdatax = explode("|",rtrim($txtdata,'|'));

    for($a=0;$a<count($txtfieldx);$a++){
      $sqlWHERE .= multisearch('kmsoh',$txtfieldx[$a],$txtparameterx[$a],$txtdatax[$a]);
    }
  }
}

    //echo $sqlWHERE;
    // die();
//    echo "<INPUT id=\"filterkdsup\" class=\"textbox\" type=\"hidden\" name=\"filterkdsup\" value=\"$txtkdsup\">";
//    echo "<INPUT id=\"filtersupplier\" class=\"textbox\" type=\"hidden\" name=\"filtersupplier\" value=\"$txtsuplier\">";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Form View</title>
</head>

<!--<link rel="stylesheet" href="css/style.css" type="text/css" />-->
<!--<link rel="stylesheet" type="text/css" href="css/frmstyle.css" />-->
<?php
$xrdm = date("YmdHis");
echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/style.css?verion=$xrdm\" />";
echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/frmstyle.css?version=$xrdm\" />";
?>


  <body>
    <table width="100%"  border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
         <div id="frmisi">
          <table id="myTable" class="tablesorter">
            <thead>
              <tr>
                <th align="center">No</th>
                <th align="center">No PO</th>
                <th align="center">Tgl PO</th>
                <th align="center">Art. Customer</th>
                <th align="center">Nama Kulit</th>
                <th align="center">Warna</th>
                <th align="center">Brand</th>
                <th align="center">Komposisi</th>
              </tr>
          </thead>
          <tbody>
            <?php
            $sqlCOUNT = "SELECT * FROM temp_poelviozanon WHERE 1";
            $sqlCOUNT = $sqlCOUNT.$sqlWHERE;
          //echo $sqlCOUNT.'<br>';
            $result=mysql_query($sqlCOUNT);
            $count=mysql_num_rows($result);
//          mysql_free_result($result);

            $sql = "SELECT * FROM temp_poelviozanon WHERE 1";
            $sql=$sql.$sqlWHERE.$sqlLIMIT;
          // echo $sql;
            $result=mysql_query($sql);

          // menentukan jumlah halaman yang muncul berdasarkan jumlah semua data
            $jumPage = ceil($count/$txtperpage);

          //echo $count;
            if($count>0){
          // Register $myusername, $mypassword and redirect to file "login_success.php"
          //  $row = mysql_fetch_row($result);
              $row = $offset;
              while ($data = mysql_fetch_array($result, MYSQL_BOTH)){
                $row += 1;

                $xid = $data["xid"];
                $nopo = $data["nopo"]; 
                
                $tanggalpo = $data["tanggalpo"];
                $tanggalpo = strtr($tanggalpo, '.', '/');
 
                $sku = $data["sku"];
                $article = $data["article"];
                $brand = $data["brand"];
                $material = $data["material"];
                $color = $data["color"];
                $composition = $data["composition"];

                ?>
                <tr onMouseOver="this.className='highlight'" onMouseOut="this.className='normal'" onclick="selectset('<?=$xid?>')">
                  <td align="center" nowrap><?php echo $row; ?></td>
                  <td align="left" nowrap><?php echo $nopo; ?></td>
                  <td align="center" nowrap><?php echo $tanggalpo; ?></td>
                  <td align="center" nowrap><?php echo $article; ?></td>
                  <td align="left" nowrap><?php echo $material; ?></td>
                  <td align="left" nowrap><?php echo $color; ?></td>
                  <td align="left" nowrap><?php echo $brand; ?></td>
                  <td align="center" nowrap><?php echo $composition; ?></td>
                </tr>
                <?php
              }
              mysql_free_result($result);
            }
            ?>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <table width="100%"  border="0" cellspacing="0" cellpadding="0" class="info_fieldset">
        <tr>
          <td><div align="left"><input id="jumpage" name="nmjmlrow" type="hidden" value="<?php echo $jumPage; ?>">Records: <?php echo ($offset + 1); ?> / <?php echo $row; ?> of <?php echo $count; ?> </div></td>
          <td>
            <div align="right">
              <?php

              echo "Page [ ";

// menampilkan link previous

              if ($txtpage > 1) {$prevpage = $txtpage - 1; echo  "<a href='#' onClick='showpage(".$prevpage.")'>&lt;&lt; Prev</a>";}

// memunculkan nomor halaman dan linknya

              for($page = 1; $page <= $jumPage; $page++)
              {
               if ((($page >= $noPage - 10) && ($page <= $noPage + 10)) || ($page == 1) || ($page == $jumPage))
               {
                if (($showPage == 1) && ($page != 2))  echo "...";
                if (($showPage != ($jumPage - 1)) && ($page == $jumPage))  echo "...";
                if ($page == $noPage) echo " <b>".$page."</b> ";
                else echo " <a href='#' onClick='showpage(".$page.")'>".$page."</a> ";
                $showPage = $page;
              }

//    echo " <a href='#' onClick='showpage(".$page.")'>".$page."</a> ";

            }

// menampilkan link next

            if ($txtpage < $jumPage) {$nextpage = $txtpage + 1; echo "<a href='#' onClick='showpage(".$nextpage.")'>Next &gt;&gt;</a>";}

            echo " ] ";

            ?>
          </div>
        </td>
      </tr>
    </table>
  </td>
</tr>
</table>
<FORM id="formexport" name="nmformexport" action="export.php" method="post" onsubmit="window.open ('', 'NewFormInfo', 'scrollbars,width=730,height=500')" target="NewFormInfo">
  <input id="txtSQL" name="nmSQL" type="hidden" value="<?php echo $sql; ?>">
</FORM>
<?php //echo $sql; ?>
</body>

</html>
<?php
mysql_close($conn);
?>
