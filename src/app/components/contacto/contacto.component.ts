import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { VentasProspectoService } from "../../services/venta-service.service";
import { IPlanEmpresa } from "../../interfaces/plan";
import { IVentaProspecto } from "../../interfaces/ventaProspecto";

@Component({
    selector: 'app-contacto',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule // Inclúyelo aquí
    ],
    templateUrl: './contacto.component.html',
    styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
    planes: IPlanEmpresa[] = [];
    contactoForm: FormGroup;
    mensajeExito: string | null = null;

    constructor(
        private ventasProspectoService: VentasProspectoService,
        private fb: FormBuilder
    ) {
        // Inicializa el formulario reactivo
        this.contactoForm = this.fb.group({
            nombreCliente: ['', Validators.required],
            empresa: ['', Validators.required],
            telefono: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            domicilio: ['', Validators.required],
            ciudad: ['', Validators.required],
            estado: ['', Validators.required],
            rfc: ['', [Validators.required, Validators.maxLength(13)]],
            plan: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.ventasProspectoService.getPlanes().subscribe({
            next: (data) => this.planes = data,
            error: (err) => console.error('Error loading plans:', err)
        });
    }

    onSubmit(): void {
        if (this.contactoForm.valid) {
            const venta: IVentaProspecto = {
                idVenta: 0,
                idPlan: this.contactoForm.get('plan')?.value,
                idUsuario: null,
                fechaSolicitud: new Date().toISOString().split('T')[0],
                nombreCliente: this.contactoForm.get('nombreCliente')?.value,
                nombreEmpresa: this.contactoForm.get('empresa')?.value,
                correo: this.contactoForm.get('email')?.value,
                domicilio: this.contactoForm.get('domicilio')?.value,
                ciudad: this.contactoForm.get('ciudad')?.value,
                estado: this.contactoForm.get('estado')?.value,
                rfc: this.contactoForm.get('rfc')?.value,
                numeroContacto: this.contactoForm.get('telefono')?.value,
                //idPlanNavigation: null
            };
    
            console.log('venta', venta);
    
            this.ventasProspectoService.insertarVenta(venta).subscribe({
                next: () => {
                    this.contactoForm.reset();
                    this.mensajeExito = '¡Datos enviados con éxito!';
                },
                error: (err) => {
                    console.error('Error al enviar los datos:', err);
                    this.mensajeExito = null;
                }
            });
        }
    }

}
