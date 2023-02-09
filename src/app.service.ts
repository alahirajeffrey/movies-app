import { Injectable } from "@nestjs/common";
import * as qrcode from "qrcode";
import { Response } from "express";

const URL = "www.google.com";

@Injectable()
export class AppService {
  private readonly configServide;
  getHello(): string {
    return "Hello World!";
  }

  generateQrcode(stream: Response) {
    qrcode
      .toDataURL(URL)
      .then((url) => {
        return qrcode.toFileStream(stream, URL);
      })
      .then((error) => {
        return error;
      });
  }
}
