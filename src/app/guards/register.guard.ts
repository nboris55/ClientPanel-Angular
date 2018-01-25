import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';


@Injectable ()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsServices: SettingsService
    ) {}

    canActivate(): boolean {
            if(this.settingsServices.getSettings().allowRegistration) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            } 
        }
    }
