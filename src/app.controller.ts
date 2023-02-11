import { Body, Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";
import { MovieService } from "./movie.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly movieService: MovieService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.homepage();
  }

  @Get("generate-qrcode")
  generateQrcode(@Res() response: Response) {
    return this.appService.generateQrcode(response);
  }

  @Get("movie-list")
  async generateMovieList() {
    return await this.appService.movieList();
  }

  @Get("movie/title/:title")
  async getMovieByTitle(@Param("title") title: string) {
    return await this.movieService.getMovieById(title);
  }

  @Get("movie/:id")
  async getMovieById(@Param("id") id: string) {
    return await this.movieService.getMovieById(id);
  }
}
