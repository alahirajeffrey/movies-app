import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "../services/app.service";
import { MovieService } from "../services/movie.service";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "../services/prisma.service";

describe("AppController", () => {
  let appController: AppController;

  const mockMovieService = {
    getMovieById: jest.fn((id) => {
      return {
        id: id,
      };
    }),

    getMovieByTitle: jest.fn((title) => []),
  };

  const appServiceMock = {
    movieList: jest.fn(() => []),

    homepage: jest.fn(() => "Qr Code Generator"),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [ConfigModule.forRoot(), HttpModule, ScheduleModule.forRoot()],
      providers: [MovieService, AppService, PrismaService],
    })
      .overrideProvider(MovieService)
      .useValue(mockMovieService)
      .overrideProvider(AppService)
      .useValue(appServiceMock)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe("homepage", () => {
    it("should return a string", () => {
      expect(appController.getHello()).toBe("Qr Code Generator");
    });
  });

  describe("get movie by id", () => {
    const movieId = "id";

    it("should return an object with id", async () => {
      expect(await appController.getMovieById(movieId)).toEqual({
        id: expect.any(String),
      });
    });
  });

  describe("get movie by title", () => {
    const movieTitle = "title";

    it("should return an array", async () => {
      expect(await appController.getMovieByTitle(movieTitle)).toEqual([]);
    });
  });

  describe("movie list", () => {
    it("should return a list of movies", async () => {
      expect(await appController.generateMovieList()).toEqual([]);
    });
  });
});
