import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
