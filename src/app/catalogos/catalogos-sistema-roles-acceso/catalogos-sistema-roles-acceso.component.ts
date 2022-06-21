import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogos-sistema-roles-acceso',
  templateUrl: './catalogos-sistema-roles-acceso.component.html',
  styleUrls: ['./catalogos-sistema-roles-acceso.component.scss']
})
export class CatalogosSistemaRolesAccesoComponent implements OnInit {

  agregarAccesos() {
    var w = 800;
    var h = 600;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/agregar-accesos'])
    );

    window.open(url, '_blank', 'resizable=true", toolbar=no, scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

}
