import { IPlanEmpresa } from "./plan";

export interface IVentaProspecto {
    idVenta: number;
    idPlan: number;
    idUsuario?: number | null;
    fechaSolicitud: string;
    nombreCliente: string;
    nombreEmpresa: string;
    correo: string;
    domicilio: string;
    ciudad: string;
    estado: string;
    rfc: string;
    numeroContacto: string;
    //idPlanNavigation?: IPlanEmpresa | null;
}
