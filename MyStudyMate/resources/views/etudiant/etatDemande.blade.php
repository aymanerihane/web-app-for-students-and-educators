<table>
    <tr>
        <th>Demande</th>
        <th>Date Demande</th>
        <th>Etat Demande</th>
        <th>Reponse</th>
    </tr>
    @php
                $Demandes = app('App\Http\Controllers\Demande')->etuddemande(); // khass function hna katjbed ga3e les demande li dar had letudiant
                @endphp
                @if (count($Demandes)>0)
                @foreach ($Demandes as $Demande)
                <tr>
                    <td>{{ $Demande->objet }}</td>
                    <td>{{ $Demande->created_at }}</td>
                    @if ($Demande->statutDemande == "Approuvée")
                    <td style="background-color: green">{{ $Demande->statutDemande }}</td>
                    @elseif ($Demande->statutDemande == "Rejetée")
                    <td style="background-color: red">{{ $Demande->statutDemande }}</td>
                    @else
                    <td style="background-color: rgb(255, 187, 0)">{{ $Demande->statutDemande }}</td>
                    @endif
                    @if ($Demande->statutDemande == "Approuvée")
                    <td>{{ $Demande->ReponseDemande }}</td>
                    @elseif ($Demande->statutDemande == "Rejetée")
                    <td>{{ $Demande->ReponseDemande }}</td>
                    @else
                    <td>-</td>
                    @endif
                </tr>
                @endforeach
                    @else
                    <td  colspan="4">no damande has been send yet</td>
                @endif
</table>
