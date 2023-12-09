import {Injectable} from '@angular/core';
import {HousingLocation} from "./housing-location";
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';
  url = 'http://localhost:3000/locations';
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);
    const jsonText = await response.text();
    const text = this.#setBaseUrl(jsonText);
    return (JSON.parse(text)) ?? {};
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    const jsonText = await response.text();
    const text = this.#setBaseUrl(jsonText);
    return (JSON.parse(text)) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
        `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }

  // There is a problem that in JSON file from tutorial variables in text,
  // and they will not be replaced by this.baseUrl by default.
  #setBaseUrl(text: string) {
    return text.replace(/\$\{this\.baseUrl\}/g, this.baseUrl);
  }
}
