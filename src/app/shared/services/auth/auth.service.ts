import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = {
    email: 'admin@gmail.com',
    password: 'admin123'
  };

  private encryptionKey = 'L(qtlsEG/uBhsB]';
  private encryptedStorageKey = 'bqLIIljQzEhGJoSCp01ea7Iog3EwZdhT';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string): boolean {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({ email, password }),
        this.encryptionKey
      ).toString();

      if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.encryptedStorageKey, encryptedData);
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    const encryptedData = isPlatformBrowser(this.platformId) ?  localStorage.getItem(this.encryptedStorageKey) : '';
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return (
          decryptedData.email === this.mockUser.email &&
          decryptedData.password === this.mockUser.password
        );
      } catch (error) {
        console.error('Error decrypting data:', error);
        return false;
      }
    }
    return false;
  }

  logout(): void {
    if(isPlatformBrowser(this.platformId)) localStorage.removeItem(this.encryptedStorageKey);
  }
}
