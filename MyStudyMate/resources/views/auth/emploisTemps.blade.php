
<div class="signbox" style="position: relative;margin-bottom:76px">
    <form style="width:100%;" class="formSign" method="POST" action="">
            <div style="display: flex;flex-direction:column;justify-content: space-between;align-items: center;">

                <div class="email">
                    <input id="titleEmplois" type="text" name="titleEmplois" required >
                    <label class="labelf">
                        <span style="transition-delay:0ms">T</span><span style="transition-delay:50ms">I</span><span style="transition-delay:100ms">T</span><span style="transition-delay:150ms">R</span><span style="transition-delay:200ms">E</span>

                </div>
                    <Label>Jour:</Label><br>
                    <span class="custom-dropdown small" >
                        <Select class="select" name="jour" style="margin-bottom: 15px;">
                            <option class="option" value="" disabled selected>Jour</option>
                            @foreach(['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI','SAMEDI'] as $jour)
                            <option value="{{ $jour }}">{{ $jour }}</option>
                            @endforeach
                        </Select>
                    </span>
                    <Label>Creneau :</Label><br>
                    <span class="custom-dropdown small" >
                        <Select class="select" name="heure" style="margin-bottom: 15px;">
                            <option value="0">Heure</option>
                            @foreach(['09h00 - 10h45', '11h00 - 12h45', '13h00 - 14h45','15h00 - 16h45','17h00 - 18h45'] as $heure)
                            <option value="{{ $heure }}">{{ $heure }}</option>
                            @endforeach
                        </Select>
                    </span>

                <div class="sb">
                    <button type="submit">
                        <div style="margin-bottom: 0" class="btnLogin"><span>ADD</span></div>
                        </button>

                </div>
        </div>
    </form>
</div>
<h1 class="h1">Emplois du temps</h1>
<table>
    <?php
        $jour = array(null, "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
        // $rdv["Dimanche"]["16:30"] = "Dermatologue";
        // $rdv["Lundi"]["9"] = "Mémé -_-";
        echo "<tr><th>Heure</th>";
        for($x = 1; $x < 8; $x++)
            echo "<th>".$jour[$x]."</th>";
        echo "</tr>";
        for($j = 9; $j < 19; $j += 0.75) {
            echo "<tr>";
            for($i = 0; $i < 7; $i++) {
                if($i == 0) {
                    $heure = str_replace(".75", ":45", $j);
                    $heure = str_replace(".5", ":30", $j);echo "<td class=\"time\">".$heure."</td>";
                }
                echo "<td>";
                if(isset($rdv[$jour[$i+1]][$heure])) {
                    echo $rdv[$jour[$i+1]][$heure];
                }
                echo "</td>";
            }
            echo "</tr>";
        }
    ?>
    </table>


