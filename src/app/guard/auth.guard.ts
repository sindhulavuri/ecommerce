import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _router: Router, private aService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.aService.isAdmin && this.aService.displayName) {
            return true;
        }
        else {
            this._router.navigate(['/unauthorized']);
            return false;
        }

    }
}