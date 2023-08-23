<?php

    include("../../configuration.php");
    include("../../connection.php");
    include("../../endec.php");

  if(isset($_POST['intxtmode'])){
    $intxtmode = $_POST['intxtmode'];
  }


if($intxtmode=='checktemp') {
  $sql = "SELECT xid FROM temp_poelviozanon WHERE userby = '".$_SESSION[$domainApp."_myname"]."'";  
  $result =  mysql_query($sql,$conn);
  $row =  mysql_num_rows($result);

  if ($row > 0) {
    echo 1;
  }
  else{
    echo 0;
  }
  mysql_free_result($result);
}
else if($intxtmode=='transferso') {
  $sql = "SELECT * FROM temp_poelviozanon WHERE userby = '".$_SESSION[$domainApp."_myname"]."'";
  $result = mysql_query($sql,$conn);

  $sql_1 =  "SELECT a.n_tukar FROM DBSLA.slkurs_matauang a WHERE a.kdkurs = 'USD' AND a.tglkurs = CURDATE()";
  $result_1 = mysql_query($sql_1,$conn);
  $data_1 = mysql_fetch_array($result_1);
  $n_tukar = $data_1['n_tukar'];
  $no = 0;
  $tot_so = 0;
  
  while ($data = mysql_fetch_array($result)){
    $xid = $data['xid'];
    $po = trim($data['po']);
    $tgl_po = trim($data['tgl_po']);
    $season = trim($data['season']);
    $group = trim($data['group']);
    $barcode = trim($data['barcode']);
    $sku = trim($data['sku']);
    $code_customer = trim($data['code_customer']);
    $code_merk = trim($data['code_merk']);
    $special_customer = trim($data['special_customer']);
    $ship_date = trim($data['ship_date']);
    $article_customer = trim($data['article_customer']);
    $article_kmbs = trim($data['article_kmbs']);
    $code_material = trim($data['code_material']);
    $code_color = trim($data['code_color']);
    $code_shoes = trim($data['code_shoes']);
    $ctn = trim($data['ctn']);
    $p = trim($data['p']);
    $l = trim($data['l']);
    $t = trim($data['t']);
    $sz33 = $data['sz33'] * $ctn;
    $sz33s = $data['sz33s'] * $ctn;
    $sz34 = $data['sz34'] * $ctn;
    $sz34s = $data['sz34s'] * $ctn;
    $sz35 = $data['sz35'] * $ctn;
    $sz35s = $data['sz35s'] * $ctn;
    $sz36 = $data['sz36'] * $ctn;
    $sz36s = $data['sz36s'] * $ctn;
    $sz37 = $data['sz37'] * $ctn;
    $sz37s = $data['sz37s'] * $ctn;
    $sz38 = $data['sz38'] * $ctn;
    $sz38s = $data['sz38s'] * $ctn;
    $sz39 = $data['sz39'] * $ctn;
    $sz39s = $data['sz39s'] * $ctn;
    $sz40 = $data['sz40'] * $ctn;
    $sz40s = $data['sz40s'] * $ctn;
    $sz41 = $data['sz41'] * $ctn;
    $sz41s = $data['sz41s'] * $ctn;
    $sz42 = $data['sz42'] * $ctn;
    $sz42s = $data['sz42s'] * $ctn;
    $sz43 = $data['sz43'] * $ctn;
    $sz43s = $data['sz43s'] * $ctn;
    $sz44 = $data['sz44'] * $ctn;
    $sz44s = $data['sz44s'] * $ctn;


    //kmsoh
    $inslnoso = strtoupper($code_merk.$po.$group.$special_customer);
    $inslvaluta = "USD";
    $insln_tukar = $n_tukar;
    $inslkdcust = strtoupper($code_customer);
    $inslkdbrand = strtoupper($code_merk);
    $inslnopo = strtoupper($po);

    $tgl_po = strtr($tgl_po, '.', '-');
    $tgl_po = strtoupper(htmlspecialchars(date("Y-m-d", strtotime($tgl_po))));
    $insltglpo = $tgl_po;

    $ship_date = strtr($ship_date, '.', '-');
    $ship_date = strtoupper(htmlspecialchars(date("Y-m-d", strtotime($ship_date))));
    $insltglkrm = $ship_date;

    $inslket = strtoupper($season);

    $subtotal = $sz33+$sz33s+$sz34+$sz34s+$sz35+$sz35s+$sz36+$sz36s+$sz37+$sz37s+$sz38+$sz38s+$sz39+$sz39s+$sz40+$sz40s+$sz41+$sz41s+$sz42+$sz42s+$sz43+$sz43s+$sz44+$sz44s;
    $inslsub_total = $subtotal;

    $insldisc_persen = 0;
    $insldisc = 0;
    $inslppn_persen = 0;
    $inslppn = 0;
    $inslnetto = $subtotal;
    $inslseason = strtoupper($season);

    //kmsod
    $indkdbrg = strtoupper("E".$code_merk.$code_material.$article_customer.$code_color);
    $indartprod = strtoupper($article_kmbs);
    $indartcust = strtoupper($article_customer);
    $indkdassort = 'EA';
    $indhrg_sat = 1;
    $indord33 = $sz33;
    $indord33s = $sz33s;
    $indord34 = $sz34;
    $indord34s = $sz34s;
    $indord35 = $sz35;
    $indord35s = $sz35s;
    $indord36 = $sz36;
    $indord36s = $sz36s;
    $indord37 = $sz37;
    $indord37s = $sz37s;
    $indord38 = $sz38;
    $indord38s = $sz38s;
    $indord39 = $sz39;
    $indord39s = $sz39s;
    $indord40 = $sz40;
    $indord40s = $sz40s;
    $indord41 = $sz41;
    $indord41s = $sz41s;
    $indord42 = $sz42;
    $indord42s = $sz42s;
    $indord43 = $sz43;
    $indord43s = $sz43s;
    $indord44 = $sz44;
    $indord44s = $sz44s;
    $indksu = strtoupper($sku);

    //kmsopl
    $inbarcode = strtoupper($barcode);

    //kmbrgjadi
    $sql_2 = "SELECT a.nmmerk FROM kmmerksepatu a WHERE a.kdmerk = '".$code_merk."'";
    $result_2 = mysql_query($sql_2,$conn);
    $data_2 = mysql_fetch_array($result_2);
    
    $nmmerk = $data_2['nmmerk'];

    $sql_3 = "SELECT a.nmjenis FROM kmjeniskulit a WHERE a.kdjenis = '".$code_material."'";
    $result_3 = mysql_query($sql_3,$conn);
    $data_3 = mysql_fetch_array($result_3);

    $nmjenis = $data_3['nmjenis'];

    $sql_4 = "SELECT a.nmwarna FROM kmwrnsepatu a WHERE a.kdwarna = '".$code_color."'";
    $result_4 = mysql_query($sql_4,$conn);
    $data_4 = mysql_fetch_array($result_4);

    $nmwarna = $data_4['nmwarna'];

    $inspnmbrg = strtoupper(trim($nmmerk)." ".trim($article_customer)." (".trim($article_kmbs).") ".trim($nmjenis)." ".trim($nmwarna));
    $inspsatuan = "PAIRS";
    $inspkdjns = strtoupper($code_shoes);
    $inspkdgol = strtoupper($article_customer);
    $inspkdwarna = strtoupper($code_color);
    $spkdmerk = strtoupper($code_merk);
    $insppjg = $p;
    $insplbr = $l;
    $insptgg = $t;


    $sql_5 = "SELECT slnoso FROM kmsoh WHERE slnoso = '".$inslnoso."'";
    $result_5 = mysql_query($sql_5,$conn);
    $count_5 = mysql_num_rows($result_5);

    if ($count_5 == 0) {
      $sql_6 = "INSERT INTO kmsoh (slnoso, sltglso, slstatus, slvaluta, sln_tukar, slkdcust, slkdbrand, slnopo, sltglpo, sltglkrm, slket, slsub_total, sldisc_persen, 
                sldisc, slppn_persen, slppn, slnetto, slseason, access, komp, userby) VALUES (
                '".$inslnoso."' 
                ,now()
                ,''
                ,'".$inslvaluta."'
                ,'".$insln_tukar."'
                ,'".$inslkdcust."'
                ,'".$inslkdbrand."'
                ,'".$inslnopo."'
                ,'".$insltglpo."'
                ,'".$insltglkrm."'
                ,'".$inslket."'
                ,'".$inslsub_total."'
                ,'".$insldisc_persen."'
                ,'".$insldisc."'
                ,'".$inslppn_persen."'
                ,'".$inslppn."'
                ,'".$inslnetto."'
                ,'".$inslseason."'
                ,now()
                ,'".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."' 
                ,'".$_SESSION[$domainApp."_myname"]."'
                )";
      // mysql_query($sql_6,$conn);
      if (!mysql_query($sql_6,$conn)){
        die('Error (Insert kmsoh): ' . mysql_error());
      }
      else{
        $tot_so++;
      }
    }
    else{
      $sql_7 = "SELECT slsub_total, slnetto FROM kmsoh WHERE slnoso = '".$inslnoso."'";
      $result_7 = mysql_query($sql_7,$conn);
      $data_7 = mysql_fetch_array($result_7);

      $slsub_totalx = $data_7["slsub_total"];
      $slnettox = $data_7["slnetto"];
      $inslsub_totalx = $slsub_totalx + $inslsub_total;
      $inslnettox = $slnettox + $inslnetto;

      $sql_8 =  "UPDATE kmsoh SET 
                slsub_total = '".$inslsub_totalx."',
                slnetto = '".$inslnettox."',
                access = now(),
                komp = '".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."', 
                userby = '".$_SESSION[$domainApp."_myname"]."'
                WHERE
                slnoso = '".$inslnoso."'";
      // mysql_query($sql_8,$conn);
      if (!mysql_query($sql_8,$conn)){
        die('Error (Update kmsoh): ' . mysql_error());
      }
      else{
        $tot_so++;
      }
    }

    $sql_9 = "SELECT dnoso FROM kmsod WHERE dnoso = '".$inslnoso."' AND dkdbrg = '".$indkdbrg."' AND dkdassort = '".$indkdassort."'";
    $result_9 = mysql_query($sql_9,$conn);
    $count_9 = mysql_num_rows($result_9);

    if ($count_9 == 0) {
      $sql_10 = "INSERT into kmsod (dnoso,dtglso,dkdbrg,dartprod,dartcust,dkdassort,dsatuan,dhrg_sat,dord33,dord33s,dord34,dord34s,dord35,dord35s,dord36,dord36s,
                dord37,dord37s,dord38,dord38s,dord39,dord39s,dord40,dord40s,dord41,dord41s,dord42,dord42s,dord43,dord43s,dord44,dord44s,dkrm33,dkrm33s,dkrm34,dkrm34s,
                dkrm35,dkrm35s,dkrm36,dkrm36s,dkrm37,dkrm37s,dkrm38,dkrm38s,dkrm39,dkrm39s,dkrm40,dkrm40s,dkrm41,dkrm41s,dkrm42,dkrm42s,dkrm43,dkrm43s,dkrm44,dkrm44s,
                dnosj,dtglsj,dsku,access,komp,userby) VALUES (
                '".$inslnoso."' 
                ,now()
                ,'".$indkdbrg."'
                ,'".$indartprod."'
                ,'".$indartcust."'
                ,'".$indkdassort."'
                ,'".$inspsatuan."'
                ,'".$indhrg_sat."'
                ,'".$indord33."'
                ,'".$indord33s."'
                ,'".$indord34."'
                ,'".$indord34s."'
                ,'".$indord35."'
                ,'".$indord35s."'
                ,'".$indord36."'
                ,'".$indord36s."'
                ,'".$indord37."'
                ,'".$indord37s."'
                ,'".$indord38."'
                ,'".$indord38s."'
                ,'".$indord39."'
                ,'".$indord39s."'
                ,'".$indord40."'
                ,'".$indord40s."'
                ,'".$indord41."'
                ,'".$indord41s."'
                ,'".$indord42."'
                ,'".$indord42s."'
                ,'".$indord43."'
                ,'".$indord43s."'
                ,'".$indord44."'
                ,'".$indord44s."'
                ,'','','','','','','','','','','','','','','','','','','','','','','','','',''
                ,'".$inditem_code."'
                ,now()
                ,'".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."' 
                ,'".$_SESSION[$domainApp."_myname"]."'
                )";

      // mysql_query($sql_10,$conn);
      if (!mysql_query($sql_10,$conn)){
        die('Error (Insert kmsod): ' . mysql_error());
      }
    }
    else{
      $sql_11 =  "SELECT dnoso, dord33, dord33s, dord34, dord34s, dord35, dord35s, dord36, dord36s, dord37, dord37s, dord38, dord38s, dord39, dord39s, dord40, dord40s,
                  dord41, dord41s, dord42, dord42s, dord43, dord43s, dord44, dord44s
                  FROM kmsod 
                  WHERE dnoso = '".$inslnoso."' AND dkdbrg = '".$indkdbrg."' AND dkdassort = '".$indkdassort."'";
      $result_11 = mysql_query($sql_11,$conn);
      $data_11 = mysql_fetch_array($result_11);

      $size33x = $data_11["dord33"];
      $size33sx = $data_11["dord33s"];
      $size34x = $data_11["dord34"];
      $size34sx = $data_11["dord34s"];
      $size35x = $data_11["dord35"];
      $size35sx = $data_11["dord35s"];
      $size36x = $data_11["dord36"];
      $size36sx = $data_11["dord36s"];
      $size37x = $data_11["dord37"];
      $size37sx = $data_11["dord37s"];
      $size38x = $data_11["dord38"];
      $size38sx = $data_11["dord38s"];
      $size39x = $data_11["dord39"];
      $size39sx = $data_11["dord39s"];
      $size40x = $data_11["dord40"];
      $size40sx = $data_11["dord40s"];
      $size41x = $data_11["dord41"];
      $size41sx = $data_11["dord41s"];
      $size42x = $data_11["dord42"];
      $size42sx = $data_11["dord42s"];
      $size43x = $data_11["dord43"];
      $size43sx = $data_11["dord43s"];
      $size44x = $data_11["dord44"];
      $size44sx = $data_11["dord44s"];

      $indord33x =  $sz33 + $size33x;
      $indord33sx =  $sz33s + $size33sx;
      $indord34x =  $sz34 + $size34x;
      $indord34sx =  $sz34s + $size34sx;
      $indord35x =  $sz35 + $size35x;
      $indord35sx =  $sz35s + $size35sx;
      $indord36x =  $sz36 + $size36x;
      $indord36sx =  $sz36s + $size36sx;
      $indord37x =  $sz37 + $size37x;
      $indord37sx =  $sz37s + $size37sx;
      $indord38x =  $sz38 + $size38x;
      $indord38sx =  $sz38s + $size38sx;
      $indord39x =  $sz39 + $size39x;
      $indord39sx =  $sz39s + $size39sx;
      $indord40x =  $sz40 + $size40x;
      $indord40sx =  $sz40s + $size40sx;
      $indord41x =  $sz41 + $size41x;
      $indord41sx =  $sz41s + $size41sx;
      $indord42x =  $sz42 + $size42x;
      $indord42sx =  $sz42s + $size42sx;
      $indord43x =  $sz43 + $size43x;
      $indord43sx =  $sz43s + $size43sx;
      $indord44x =  $sz44 + $size44x;
      $indord44sx =  $sz44s + $size44sx;

      $sql_12 =  "UPDATE kmsod SET 
                  dord33 = ".$indord33x."
                  ,dord33s = ".$indord33sx."
                  ,dord34 = ".$indord34x."
                  ,dord34s = ".$indord34sx."
                  ,dord35 = ".$indord35x."
                  ,dord35s = ".$indord35sx."
                  ,dord36 = ".$indord36x."
                  ,dord36s = ".$indord36sx."
                  ,dord37 = ".$indord37x."
                  ,dord37s = ".$indord37sx."
                  ,dord38 = ".$indord38x."
                  ,dord38s = ".$indord38sx."
                  ,dord39 = ".$indord39x."
                  ,dord39s = ".$indord39sx."
                  ,dord40 = ".$indord40x."
                  ,dord40s = ".$indord40sx."
                  ,dord41 = ".$indord41x."
                  ,dord41s = ".$indord41sx."
                  ,dord42 = ".$indord42x."
                  ,dord42s = ".$indord42sx."
                  ,dord43 = ".$indord43x."
                  ,dord43s = ".$indord43sx."
                  ,dord44 = ".$indord44x."
                  ,dord44s = ".$indord44sx."
                  ,access = now()
                  ,komp = '".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."' 
                  ,userby = '".$_SESSION[$domainApp."_myname"]."'
                  WHERE dnoso = '".$inslnoso."' AND dkdbrg = '".$indkdbrg."' AND dkdassort = '".$indkdassort."'";
    
      // mysql_query($sql_11,$conn);
      if (!mysql_query($sql_12,$conn)){
        die('Error (Update kmsod): ' . mysql_error());
      }
    }

    $sql_13 = "SELECT spkdbrg FROM kmbrgjadi WHERE spkdbrg = '".$indkdbrg."'";
    $result_13 = mysql_query($sql_13,$conn);
    $count_13 = mysql_num_rows($result_13);

    if ($count_13 == 0) {
      $sql_14 =  "INSERT INTO kmbrgjadi (
            spkdbrg
            ,spnmbrg
            ,spsatuan
            ,spkdjns
            ,spkdgol
            ,spkdwarna
            ,spkdmerk
            ,sppjg
            ,splbr
            ,sptgg
            ,access
            ,komp
            ,userby
            ) VALUES (
            '".$indkdbrg."'
            ,'".$inspnmbrg."'
            ,'".$inspsatuan."'
            ,'".$inspkdjns."'
            ,'".$inspkdgol."'
            ,'".$inspkdwarna."'
            ,'".$spkdmerk."'
            ,'".$insppjg."'
            ,'".$insplbr."'
            ,'".$insptgg."'
            ,now() 
            ,'".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."' 
            ,'".$_SESSION[$domainApp."_myname"]."')
            ";

      // mysql_query($sql_14,$conn);
      if (!mysql_query($sql_14,$conn)){
        die('Error (Update kmbrgjadi): ' . mysql_error());
      }
    }

    $sql_15 = "DELETE FROM temp_poelviozanon WHERE xid = '".$xid."'";
    // mysql_query($sql_15,$conn);
    if (!mysql_query($sql_15,$conn)){
      die('Error (Delete temp): ' . mysql_error());
    }

     // insert kmsopl
    for ($i=0; $i < $ctn; $i++) {   
      $sql_16 = "INSERT INTO kmsopl (noso, kdbrg, barcode, access, komp, userby) 
                 VALUES 
                 ('".$inslnoso."',
                  '".$indkdbrg."',
                  '".$barcode."',
                  now(), 
                  '".$_SESSION[$domainApp."_mygroup"]." # ".$_SESSION[$domainApp."_mylevel"]."', 
                  '".$_SESSION[$domainApp."_myname"]."')";

      if (!mysql_query($sql_16,$conn)){
        die('Error (Insert kmsopl): ' . mysql_error());
      }
    }

    $no++;
  }
  echo $no."|".$tot_so;
  mysql_free_result($result);
}
// close connection !!!!
mysql_close($conn)


?>