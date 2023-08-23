<fieldset class="info_fieldset"><legend>Form Input</legend>
   <table width="100%"  border="0" cellspacing="0" cellpadding="0">
      <tr>
         <td style="width: 40%;" valign="top">
            <table width="100%"  border="0" cellspacing="0" cellpadding="0">
                 <tr>
                     <td>
                        <label>No PO</label>
                        <INPUT id="inxid" class="textbox" type="hidden" name="inxid" value="" readonly>
                        <INPUT id="innopo" class="textbox" type="text" name="intype" value="" style="width: 100px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Tanggal PO</label>
                        <INPUT id="intanggalpo" class="textbox" type="text" name="intype" value="" style="width: 100px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Total Order</label>
                        <INPUT id="inpairs" class="textbox" type="text" name="intype" value="" style="width: 100px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Total Karton</label>
                        <INPUT id="incartons" class="textbox" type="text" name="intype" value="" style="width: 100px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Article Customer</label>
                        <INPUT id="inarticle" class="textbox" type="text" name="intype" value="" style="width: 100px" readonly>
                        <INPUT id="inarticle2" class="textbox" type="text" name="intype" value="" style="width: 85px; margin-left: 5px;" readonly>
                        <br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Brand</label>
                        <INPUT id="inbrand" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Kulit</label>
                        <INPUT id="inmaterial" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                        <label>Warna</label>
                        <INPUT id="incolor" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                  <tr>
                     <td>
                        <label>Komposisi</label>
                        <INPUT id="incomposition" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                  <tr>
                     <td>
                        <label>Doc. Entry</label>
                        <INPUT id="indocentry" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                  <tr>
                     <td>
                        <label>Line No.</label>
                        <INPUT id="inlinenum" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly><br />
                     </td>
                     <td>&nbsp;</td>
                 </tr>
                 <tr>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                 </tr>
            </table>
         </td>
         <td style="width: 60%;" valign="top">
            <fieldset class="info_fieldset">
               <table width="100%"  border="0" cellspacing="0" cellpadding="0">
                  <tr>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Kode Sepatu</label>
                        <INPUT id="inkodesepatu" class="textbox" type="text" name="intype" value="" style="width: 295px" readonly>
                        <INPUT id="cmdtransfer" class="buttongofind" type="button" name="nmcmdfind" value="Transfer SO" onclick="transfer()"><br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Deskripsi Sepatu</label>
                        <INPUT id="indeskripsisepatu" class="textbox" type="text" name="intype" value="" style="width: 500px" readonly>
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Kode Brand</label>
                        <INPUT id="inkdbrand" class="textbox" type="text" name="intype" value="" style="width: 100px" onkeydown="check(event,'brand')">
                        <INPUT id="innmbrand" class="textbox" type="text" name="intype" value="" style="width: 285px; margin-left: 5px;" readonly>
                        <input type="button" value="+++" onclick="openDialog('brand')" style="cursor:pointer;">
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Golongan Sepatu</label>
                        <INPUT id="inkdgol" class="textbox" type="text" name="intype" value="" style="width: 100px" onkeydown="check(event,'golongan')">
                        <INPUT id="innmgol" class="textbox" type="text" name="intype" value="" style="width: 285px; margin-left: 5px;" readonly>
                        <input type="button" value="+++" onclick="openDialog('golongan')" style="cursor:pointer;">
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Kode Jenis Kulit</label>
                        <INPUT id="inkdjenis" class="textbox" type="text" name="intype" value="" style="width: 100px" onkeydown="check(event,'kulit')">
                        <INPUT id="innmjenis" class="textbox" type="text" name="intype" value="" style="width: 285px; margin-left: 5px;" readonly>
                        <input type="button" value="+++" onclick="openDialog('kulit')" style="cursor:pointer;">
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Kode Warna</label>
                        <INPUT id="inkdwarna" class="textbox" type="text" name="intype" value="" style="width: 100px" onkeydown="check(event,'warna')">
                        <INPUT id="innmwarna" class="textbox" type="text" name="intype" value="" style="width: 285px; margin-left: 5px;" readonly>
                        <input type="button" value="+++" onclick="openDialog('warna')" style="cursor:pointer;">
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>Jenis Sepatu</label>
                        <INPUT id="inkdjenissepatu" class="textbox" type="text" name="intype" value="" style="width: 100px" onkeydown="check(event,'sepatu')">
                        <INPUT id="innmjenissepatu" class="textbox" type="text" name="intype" value="" style="width: 285px; margin-left: 5px;" readonly>
                        <input type="button" value="+++" onclick="openDialog('sepatu')" style="cursor:pointer;">
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>
                        <label>No. Sales Order</label>
                        <INPUT id="innoso" class="textbox" type="text" name="intype" value="" style="width: 200px" readonly>
                        Special Customer
                        <INPUT id="inspecialcustomer" class="textbox" type="text" name="intype" value="" style="width: 130px; margin-left: 5px;" onkeyup="noso()" onkeydown="check(event,'special')" maxlength="2">
                        <br />
                     </td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                  </tr>
                  <tr>
                     <td colspan="2">
                     <div align="center">
                        <INPUT id="cmdcancel" class="buttondelete" type="button" name="nmcmdcancel" value="Close" onclick="cancelclick()">
                     </div>
                     </td>
                  </tr>
                  <tr>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                  </tr>
               </table>
            </fieldset>
         </td>
      </tr>
   </table>
</fieldset>