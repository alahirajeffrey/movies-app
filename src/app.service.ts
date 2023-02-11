import { Injectable } from "@nestjs/common";
import * as qrcode from "qrcode";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios/dist";
import { lastValueFrom } from "rxjs";
import { Cron, CronExpression } from "@nestjs/schedule/dist";
import { MovieService } from "./movie.service";

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly movieService: MovieService,
  ) {}

  /**
   * returns homepage
   * @returns string
   */
  homepage(): string {
    return "Qr Code Generator";
  }

  /**
   * generate a random number between the range of 1 to 1000
   * @returns a number
   */
  generateRandomNumber(): Number {
    return Math.floor(Math.random() * 1000);
  }

  /**
   * get list of movies from external api every 10 seconds
   * @returns result: Array
   */
  @Cron(CronExpression.EVERY_30_SECONDS)
  async movieList(): Promise<Array<any>> {
    try {
      const API_URL = this.configService.get<string>("API_URL");
      const API_KEY = this.configService.get<string>("API_KEY");

      // generate random number to use as page parameter in get request
      const moviePage = this.generateRandomNumber();

      // make get request to themoviedb.org api
      const result = await lastValueFrom(
        this.httpService.get(`${API_URL}?api_key=${API_KEY}&page=${moviePage}`),
      );

      // return first 10 objects from get request
      const completeResultList: Array<any> = result.data.results;
      const partialResultList: Array<any> = completeResultList.slice(0, 10);

      // loop through result and get individual movie objects
      for (let i = 0; i <= partialResultList.length - 1; i++) {
        const movie = partialResultList[i];

        //save movie to db
        await this.movieService.saveMovieToDb(
          movie.title,
          movie.overview,
          movie.poster_path,
        );
      }

      return partialResultList;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  /**
   * generates qr code from the url containing the movie list
   * @param stream: express.Response
   */
  generateQrcode(stream: Response): void {
    try {
      const BASE_URL = this.configService.get<string>("BASE_URL");
      const URL = `${BASE_URL}/movie-list`;

      // generate qr code with the url of the movie list route
      qrcode
        .toDataURL(URL)
        .then((url) => {
          return qrcode.toFileStream(stream, URL);
        })
        .then((error: any) => {
          return error;
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
