import { Injectable } from '@angular/core';
import {IToken} from "../../interfaces/itoken";

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private tokenKey = 'authToken';
  private expiresIn = 'expires';

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiresIn);
    localStorage.clear();
  }

  saveToken(token?: IToken): void {
    if (!token) return;
    localStorage.setItem(this.tokenKey, token.token);
    if (!token.expires) return
    localStorage.setItem(this.expiresIn, JSON.stringify(token.expires.valueOf()))
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
