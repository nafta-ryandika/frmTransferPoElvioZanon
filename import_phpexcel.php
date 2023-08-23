<?php
include("../../configuration.php");
include("../../connection.php");

require_once '../../PHPExcel/PHPExcel/IOFactory.php';

$fileName = $_FILES['file']['name'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];


if($fileSize > 0 || $fileError == 0){
   $targetPath = 'temp/'.$fileName;
   $move = move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

   chmod($targetPath,0777);

   if ($move) {
      $excel = PHPExcel_IOFactory::load($targetPath);

      foreach($excel->getWorksheetIterator() as $data){
         $max_row = $data->getHighestRow();

         if (
            $data->getCellByColumnAndRow(0,1)->getValue() != "PO" || 
            $data->getCellByColumnAndRow(1,1)->getValue() != "TGL PO" || 
            $data->getCellByColumnAndRow(2,1)->getValue() != "SEASON" || 
            $data->getCellByColumnAndRow(3,1)->getValue() != "GROUP" || 
            $data->getCellByColumnAndRow(4,1)->getValue() != "BARCODE" || 
            $data->getCellByColumnAndRow(5,1)->getValue() != "SKU" || 
            $data->getCellByColumnAndRow(6,1)->getValue() != "CODE CUSTOMER" || 
            $data->getCellByColumnAndRow(7,1)->getValue() != "CODE MERK" || 
            $data->getCellByColumnAndRow(8,1)->getValue() != "SPECIAL CUSTOMER" || 
            $data->getCellByColumnAndRow(9,1)->getValue() != "SHIP DATE" || 
            $data->getCellByColumnAndRow(10,1)->getValue() != "ARTICLE CUSTOMER" ||
            $data->getCellByColumnAndRow(11,1)->getValue() != "ARTICLE KMBS" ||  
            $data->getCellByColumnAndRow(12,1)->getValue() != "CODE MATERIAL" ||
            $data->getCellByColumnAndRow(13,1)->getValue() != "CODE COLOR" ||
            $data->getCellByColumnAndRow(14,1)->getValue() != "CODE SHOES" ||
            $data->getCellByColumnAndRow(15,1)->getValue() != "CTN" ||
            $data->getCellByColumnAndRow(16,1)->getValue() != "P" ||
            $data->getCellByColumnAndRow(17,1)->getValue() != "L" ||
            $data->getCellByColumnAndRow(18,1)->getValue() != "T" ||
            $data->getCellByColumnAndRow(19,1)->getValue() != "33" ||
            $data->getCellByColumnAndRow(20,1)->getValue() != "33S" ||
            $data->getCellByColumnAndRow(21,1)->getValue() != "34" ||
            $data->getCellByColumnAndRow(22,1)->getValue() != "34S" ||
            $data->getCellByColumnAndRow(23,1)->getValue() != "35" ||
            $data->getCellByColumnAndRow(24,1)->getValue() != "35S" ||
            $data->getCellByColumnAndRow(25,1)->getValue() != "36" ||
            $data->getCellByColumnAndRow(26,1)->getValue() != "36S" ||
            $data->getCellByColumnAndRow(27,1)->getValue() != "37" ||
            $data->getCellByColumnAndRow(28,1)->getValue() != "37S" ||
            $data->getCellByColumnAndRow(29,1)->getValue() != "38" ||
            $data->getCellByColumnAndRow(30,1)->getValue() != "38S" ||
            $data->getCellByColumnAndRow(31,1)->getValue() != "39" ||
            $data->getCellByColumnAndRow(32,1)->getValue() != "39S" ||
            $data->getCellByColumnAndRow(33,1)->getValue() != "40" ||
            $data->getCellByColumnAndRow(34,1)->getValue() != "40S" ||
            $data->getCellByColumnAndRow(35,1)->getValue() != "41" ||
            $data->getCellByColumnAndRow(36,1)->getValue() != "41S" ||
            $data->getCellByColumnAndRow(37,1)->getValue() != "42" ||
            $data->getCellByColumnAndRow(38,1)->getValue() != "42S" ||
            $data->getCellByColumnAndRow(39,1)->getValue() != "43" ||
            $data->getCellByColumnAndRow(40,1)->getValue() != "43S" ||
            $data->getCellByColumnAndRow(41,1)->getValue() != "44" ||
            $data->getCellByColumnAndRow(42,1)->getValue() != "44S" ||
            ){
            
            echo(0);
         }
         else{
            for($i = 2; $i <= $max_row; $i++){ 
               // $po_code = $data->getCellByColumnAndRow(0,$i)->getValue(); 
               $po = $data->getCellByColumnAndRow(0,$i)->getValue();
               $tgl_po = $data->getCellByColumnAndRow(1,$i)->getValue();
               $season = $data->getCellByColumnAndRow(2,$i)->getValue();
               $group = $data->getCellByColumnAndRow(3,$i)->getValue();
               $barcode = $data->getCellByColumnAndRow(4,$i)->getValue();
               $sku =$data->getCellByColumnAndRow(5,$i)->getValue();
               $code_customer = $data->getCellByColumnAndRow(6,$i)->getValue();
               $code_merk = $data->getCellByColumnAndRow(7,$i)->getValue();
               $special_customer = $data->getCellByColumnAndRow(8,$i)->getValue();
               $ship_date =$data->getCellByColumnAndRow(9,$i)->getValue();
               $article_customer = $data->getCellByColumnAndRow(10,$i)->getValue();
               $article_kmbs = $data->getCellByColumnAndRow(11,$i)->getValue();
               $code_material = $data->getCellByColumnAndRow(12,$i)->getValue();
               $code_color = $data->getCellByColumnAndRow(13,$i)->getValue();
               $code_shoes = $data->getCellByColumnAndRow(14,$i)->getValue();
               $ctn = $data->getCellByColumnAndRow(15,$i)->getValue();
               $p = $data->getCellByColumnAndRow(16,$i)->getValue();
               $l = $data->getCellByColumnAndRow(17,$i)->getValue();
               $t = $data->getCellByColumnAndRow(18,$i)->getValue();
               $sz33 = $data->getCellByColumnAndRow(19,$i)->getValue();
               $sz33s = $data->getCellByColumnAndRow(20,$i)->getValue();
               $sz34 = $data->getCellByColumnAndRow(21,$i)->getValue();
               $sz34s = $data->getCellByColumnAndRow(22,$i)->getValue();
               $sz35 = $data->getCellByColumnAndRow(23,$i)->getValue();
               $sz35s = $data->getCellByColumnAndRow(24,$i)->getValue();
               $sz36 = $data->getCellByColumnAndRow(25,$i)->getValue();
               $sz36s = $data->getCellByColumnAndRow(26,$i)->getValue();
               $sz37 = $data->getCellByColumnAndRow(27,$i)->getValue();
               $sz37s = $data->getCellByColumnAndRow(28,$i)->getValue();
               $sz38 = $data->getCellByColumnAndRow(29,$i)->getValue();
               $sz38s = $data->getCellByColumnAndRow(30,$i)->getValue();
               $sz39 = $data->getCellByColumnAndRow(31,$i)->getValue();
               $sz39s = $data->getCellByColumnAndRow(32,$i)->getValue();
               $sz40 = $data->getCellByColumnAndRow(33,$i)->getValue();
               $sz40s = $data->getCellByColumnAndRow(34,$i)->getValue();
               $sz41 = $data->getCellByColumnAndRow(35,$i)->getValue();
               $sz41s = $data->getCellByColumnAndRow(36,$i)->getValue();
               $sz42 = $data->getCellByColumnAndRow(37,$i)->getValue();
               $sz42s = $data->getCellByColumnAndRow(38,$i)->getValue();
               $sz43 = $data->getCellByColumnAndRow(39,$i)->getValue();
               $sz43s = $data->getCellByColumnAndRow(40,$i)->getValue();
               $sz44 = $data->getCellByColumnAndRow(41,$i)->getValue();
               $sz44s = $data->getCellByColumnAndRow(42,$i)->getValue();

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
               }    
               flush();
            }
            echo("Upload Sukses");
         }
      }
   }
   else{
      echo("Upload Gagal!");
   }
   unlink($targetPath);
}
?>