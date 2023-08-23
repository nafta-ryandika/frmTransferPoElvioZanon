<?php
  include("../../connection.php");
  include("../../endec.php");
  include("actsearch.php");

  if(isset($_POST['txtpagemodal'])){
    $txtpage = $_POST['txtpagemodal'];
    $showPage = $txtpage;
    $noPage = $txtpage;
  }
  else{
    $txtpage = 1;
    $showPage = $txtpage;
    $noPage = $txtpage;
  }

  if(isset($_POST['txtperpagemodal'])){
    $txtperpage=$_POST['txtperpagemodal'];
  }
  else{
    $txtperpage=10;
  }

  $offset = ($txtpage - 1) * $txtperpage;
  $sqlLIMIT = " LIMIT $offset, $txtperpage";
  $sqlWHERE = " ";

  if(isset($_POST['txtdatamodal'])){
    if ($_POST['txtdatamodal']!=''){
      $txtdata=$_POST['txtdatamodal'];
    }
  }
  
  if(isset($_POST['txtfield'])){
      if ($_POST['txtfield']!=''){
        $txtfield = $_POST['txtfield'];
      }
  }
  

  if($_POST['txtfield']!=''){
        
        $like_data = getsearchdata('kmjnssepatu ',$txtfield,$txtdata);
        
        if(rtrim($like_data,'|') != ''){
            $datalike = php_permutasi(explode("|",rtrim($like_data,'|')));

            $arr_like = explode("|",rtrim($datalike,'|'));

                foreach ($arr_like as $value) {
                    $where .= " ".$txtfield." like '%".$value."%' or ";
                }

                $sqlWHERE = $sqlWHERE." and (".rtrim($where,' or ')." ) ";

        }else{
                $sqlWHERE = $sqlWHERE." and ".$txtfield." like '%".$txtdata."%' ";
        }
  }

  if (isset($_POST['inid'])) {
    $inid = $_POST['inid'];
  }
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Form View</title>
</head>

<?php
  $xrdm = date("YmdHis");
  echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/style.css?verion=$xrdm\" />";
  echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/frmstyle.css?version=$xrdm\" />";
?>
<!-- script type="text/javascript" src="js/jquery-latest.js"></script> -->
<script type="text/javascript" src="js/jquery.tablesorter.js"></script>
<script type="text/javascript">
  $(document).ready(function(){
      $("#myTableModal").tablesorter();
    }
  );
</script>

<body>
  <table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>
        <div id="frmisi">
      		<table id="myTableModal1" class="tablesorter">
                  <thead>
                    <tr>
                      <th align="center">NO</th>
                      <th align="center">Kode Jenis Sepatu</th>
                      <th align="center">Nama Jenis Sepatu</th>
                      <th align="center">...</th>
                    </tr>
                  </thead>
		  <tbody>
              <?php
                $sqlCOUNT = "SELECT kdjenis, nmjenis FROM DBKMBS.kmjnssepatu WHERE 1";
                $sqlCOUNT = $sqlCOUNT.$sqlWHERE;
                $result=mysql_query($sqlCOUNT);
                $count=mysql_num_rows($result);
                mysql_free_result($result);

                $sql="SELECT kdjenis, nmjenis FROM DBKMBS.kmjnssepatu WHERE 1";
                $sqlORDER = "ORDER BY kdjenis ASC";
                $sql=$sql.$sqlWHERE.$sqlORDER.$sqlLIMIT;
                // echo $sql;
                $result=mysql_query($sql);
                $jumPage = ceil($count/$txtperpage);
                // $row = 0;

                if($count>0){
                  $row = $offset;
                  while ($data = mysql_fetch_array($result, MYSQL_BOTH)){
                    $row += 1;
              ?>

  		<tr onMouseOver="this.className='highlight'" onMouseOut="this.className='normal'">
                <td align="center" nowrap><?php echo $row; ?></td>
                <td align="left" nowrap><?php echo trim($data["kdjenis"]); ?></td>
                <td align="left" nowrap><?php echo trim($data["nmjenis"]); ?></td>
                <td align="center" nowrap><?php echo "<button id='cmdselect' class='buttonadd' name='nmcmdselect' value='".trim($data['kdjenis'])."' onclick=\"select('".htmlspecialchars(trim($data["kdjenis"]))."','".htmlspecialchars(trim($data["nmjenis"]))."','".$inid."')\" >Select</button>"; ?></td>
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
            <td>
              <div align="left"><input id="jumpagemodal" name="nmjmlrow" type="hidden" value="<?php echo $jumPage; ?>"/>Records: <?php echo ($offset + 1); ?> / <?php echo $row; ?> of <?php echo $count; ?> 
              </div>
            </td>
            <td>
              <div align="right">
              <?php
                echo "Page [ ";
                  if ($txtpage > 1) {
                    $prevpage = $txtpage - 1; echo  "<a href='#' onClick='showpage_modal(".$prevpage.")'>&lt;&lt; Prev</a>";
                  }

                  for($page = 1; $page <= $jumPage; $page++){
                    if ((($page >= $noPage - 10) && ($page <= $noPage + 10)) || ($page == 1) || ($page == $jumPage)){
                      if (($showPage == 1) && ($page != 2))  echo "...";
                      if (($showPage != ($jumPage - 1)) && ($page == $jumPage))  echo "...";
                      if ($page == $noPage) echo " <b>".$page."</b> ";
                    else echo " <a href='#' onClick='showpage_modal(".$page.")'>".$page."</a> ";
                      $showPage = $page;
                    }
                  }

                  if ($txtpage < $jumPage) {$nextpage = $txtpage + 1; echo "<a href='#' onClick='showpage_modal(".$nextpage.")'>Next &gt;&gt;</a>";}

                echo " ] ";
              ?>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        &nbsp;
      </td>
    </tr>
    <tr>
      <td>
        &nbsp;
      </td>
    </tr>
    <tr>
      <td>
        &nbsp;
      </td>
    </tr>
  </table>
</body>

</html>
<?php
  mysql_close($conn);
  unset($_POST['inid']);
?>
