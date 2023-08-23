<?php
include("../../configuration.php");
include("../../connection.php");

require_once('excelReader/php-excel-reader/excel_reader2.php');
require_once('excelReader/SpreadsheetReader.php');

$fileName = $_FILES['file']['name'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];

if($fileSize > 0 || $fileError == 0){
   $targetPath = 'temp/'.$fileName;
   $move = move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

   chmod($targetPath,0777);

   if ($move) {
   $data = new Spreadsheet_Excel_Reader($targetPath,false);
   $baris = $data->rowcount($sheet_index=0);

   if (
      $data->val(1, 1) != "PO" || 
      $data->val(1, 2) != "TGL PO" || 
      $data->val(1, 3) != "SEASON" || 
      $data->val(1, 4) != "GROUP" || 
      $data->val(1, 5) != "BARCODE" || 
      $data->val(1, 6) != "SKU" || 
      $data->val(1, 7) != "CODE CUSTOMER" || 
      $data->val(1, 8) != "CODE MERK" || 
      $data->val(1, 9) != "SPECIAL CUSTOMER" || 
      $data->val(1, 10) != "SHIP DATE" || 
      $data->val(1, 11) != "ARTICLE CUSTOMER" || 
      $data->val(1, 12) != "ARTICLE KMBS" ||
      $data->val(1, 13) != "CODE MATERIAL" ||  
      $data->val(1, 14) != "CODE COLOR" || 
      $data->val(1, 15) != "CODE SHOES" || 
      $data->val(1, 16) != "CTN" || 
      $data->val(1, 17) != "P" || 
      $data->val(1, 18) != "L" || 
      $data->val(1, 19) != "T" || 
      $data->val(1, 20) != "33" ||
      $data->val(1, 21) != "33S" ||  
      $data->val(1, 22) != "34" || 
      $data->val(1, 23) != "34S" ||
      $data->val(1, 24) != "35" || 
      $data->val(1, 25) != "35S" ||
      $data->val(1, 26) != "36" || 
      $data->val(1, 27) != "36S" ||
      $data->val(1, 28) != "37" || 
      $data->val(1, 29) != "37S" ||
      $data->val(1, 30) != "38" || 
      $data->val(1, 31) != "38S" ||
      $data->val(1, 32) != "39" || 
      $data->val(1, 33) != "39S" ||
      $data->val(1, 34) != "40" || 
      $data->val(1, 35) != "40S" ||
      $data->val(1, 36) != "41" || 
      $data->val(1, 37) != "41S" ||
      $data->val(1, 38) != "42" || 
      $data->val(1, 39) != "42S" ||
      $data->val(1, 40) != "43" || 
      $data->val(1, 41) != "43S" ||
      $data->val(1, 42) != "44" || 
      $data->val(1, 43) != "44S"){
      
      echo(0);
   }
   else{
      for ($i=2; $i<=$baris; $i++){
         $po = $data->val($i, 1); 
         $tgl_po = $data->val($i, 2);
         $season = $data->val($i, 3); 
         $group = $data->val($i, 4); 
         $barcode = $data->val($i, 5); 
         $sku = $data->val($i, 6); 
         $code_customer = $data->val($i, 7); 
         $code_merk = $data->val($i, 8); 
         $special_customer = $data->val($i, 9);
         $ship_date = $data->val($i, 10);
         $article_customer = $data->val($i, 11);
         $article_kmbs = $data->val($i, 12);
         $code_material = $data->val($i, 13);
         $code_color = $data->val($i, 14);
         $code_shoes = $data->val($i, 15);
         $ctn = $data->val($i, 16);
         $p = $data->val($i, 17);
         $l = $data->val($i, 18);
         $t = $data->val($i, 19);
         $sz33 = $data->val($i, 20);
         $sz33s = $data->val($i, 21);
         $sz34 = $data->val($i, 22);
         $sz34s = $data->val($i, 23);
         $sz35 = $data->val($i, 24);
         $sz35s = $data->val($i, 25);
         $sz36 = $data->val($i, 26);
         $sz36s = $data->val($i, 27);
         $sz37 = $data->val($i, 28);
         $sz37s = $data->val($i, 29);
         $sz38 = $data->val($i, 30);
         $sz38s = $data->val($i, 31);
         $sz39 = $data->val($i, 32);
         $sz39s = $data->val($i, 33);
         $sz40 = $data->val($i, 34);
         $sz40s = $data->val($i, 35);
         $sz41 = $data->val($i, 36);
         $sz41s = $data->val($i, 37);
         $sz42 = $data->val($i, 38);
         $sz42s = $data->val($i, 39);
         $sz43 = $data->val($i, 40);
         $sz43s = $data->val($i, 41);
         $sz44 = $data->val($i, 42);
         $sz44s = $data->val($i, 43);

         $sql = "INSERT INTO temp_poelviozanon
                (xid, po, tgl_po, season, `group`, barcode, sku, code_customer, code_merk, special_customer, ship_date, article_customer, article_kmbs, 
                code_material, code_color, code_shoes, ctn, p, l, t, sz33, sz33s, sz34, sz34s, sz35, sz35s, sz36, sz36s, sz37, sz37s, sz38, sz38s, sz39, sz39s, sz40, 
                sz40s, sz41, sz41s, sz42, sz42s, sz43, sz43s, sz44, sz44s, access, komp, userby)
                VALUES
                (
                  '',
                  '".$po."',
                  '".$tgl_po."',
                  '".$season."',
                  '".$group."',
                  '".$barcode."',
                  '".$sku."',
                  '".$code_customer."',
                  '".$code_merk."',
                  '".$special_customer."',
                  '".$ship_date."',
                  '".$article_customer."',
                  '".$article_kmbs."',
                  '".$code_material."',
                  '".$code_color."',
                  '".$code_shoes."',
                  '".$ctn."',
                  '".$p."',
                  '".$l."',
                  '".$t."',
                  '".$sz33."',
                  '".$sz33s."',
                  '".$sz34."',
                  '".$sz34s."',
                  '".$sz35."',
                  '".$sz35s."',
                  '".$sz36."',
                  '".$sz36s."',
                  '".$sz37."',
                  '".$sz37s."',
                  '".$sz38."',
                  '".$sz38s."',
                  '".$sz39."',
                  '".$sz39s."',
                  '".$sz40."',
                  '".$sz40s."',
                  '".$sz41."',
                  '".$sz41s."',
                  '".$sz42."',
                  '".$sz42s."',
                  '".$sz43."',
                  '".$sz43s."',
                  '".$sz44."',
                  '".$sz44s."',
                  now(),
                  '".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."',
                  '".$_SESSION[$domainApp."_myname"]."'
               )";

      if ($po != "" && $tgl_po != "" && $season != "" && $group != "" && $barcode != "" && $sku != "" && $code_customer != "" && $code_merk != "" && $ship_date != "" && $article_customer != "" && $article_kmbs != "" && $code_material != "" && $code_color != "" && $code_shoes != "") {
         mysql_query($sql,$conn);
        // //  if (!mysql_query($sql,$conn)){
        // //   die('Error (Update Counter): ' . mysql_error());
        // // }
         // $tes .= $sql."<br/>";

      }
         flush();
      }
      echo("Upload Sukses");
      // echo($tes);

   // }
   }
   else{
      echo("Upload Gagal !");
   }
   unlink($targetPath);
}
?>