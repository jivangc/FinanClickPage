import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { IVentaProspecto } from '../interfaces/ventaProspecto';
import { IPlanEmpresa } from '../interfaces/plan';

@Injectable({
    providedIn: 'root'
})
export class VentasProspectoService {
    // private apiUrl = 'https://localhost:5000/api/PlanEmpresa';
    // private apiUrlV = 'https://localhost:5000/api/VentasProspecto';
    private apiUrl = 'https://financlick.somee.com/api/PlanEmpresa';
    private apiUrlV = 'https://financlick.somee.com/api/VentasProspecto';

    constructor(private http: HttpClient) { }

    insertarVenta(venta: IVentaProspecto): Observable<IVentaProspecto> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<IVentaProspecto>(this.apiUrlV, venta, { headers }).pipe(
            catchError(error => {
                console.error('Error saving sale:', error);
                return throwError(() => new Error('Error saving sale'));
            })
        );
    }

    getPlanes(): Observable<IPlanEmpresa[]> {

        return this.http.get<IPlanEmpresa[]>(`${this.apiUrl}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        console.error('Error fetching plans:', error);
        return throwError(() => error);
    }
}