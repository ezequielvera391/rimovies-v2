import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public checkServerHealth(): Observable<boolean> {
    return this.http.get<{message: string, timestap: string}>(this.apiUrl + '/ping').pipe(
      map(() => true),
      catchError(() => {
        console.error('❌ Server is NOT reachable.');
        return of(false);
      })
    );
  }
}
