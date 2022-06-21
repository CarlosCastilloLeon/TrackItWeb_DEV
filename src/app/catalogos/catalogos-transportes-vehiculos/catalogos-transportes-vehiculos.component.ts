import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-catalogos-transportes-vehiculos',
  templateUrl: './catalogos-transportes-vehiculos.component.html',
  styleUrls: ['./catalogos-transportes-vehiculos.component.scss']
})
export class CatalogosTransportesVehiculosComponent implements OnInit {

  agregarVehiculo() {
    var w = 1050;
    var h = 261;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/agregar-vehiculo'])
    );

    window.open(url, '_blank', 'resizable=true", toolbar=no, scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }

  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    weekDayFormat: 'dd'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

}
