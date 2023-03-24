import { Injectable } from "@nestjs/common";
import { Movie } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  /**
   * get movie by title
   * @param title : movie title
   * @returns a list of movie objects
   */
  async getMovieByTitle(title: string): Promise<Movie[]> {
    try {
      return await this.prisma.movie.findMany({ where: { title: title } });
    } catch (error) {
      return error;
    }
  }

  /**
   * get movie by id
   * @param id : movie id
   * @returns a movie object
   */
  async getMovieById(id: string): Promise<Movie> {
    try {
      return await this.prisma.movie.findFirstOrThrow({ where: { id: id } });
    } catch (error) {
      return error;
    }
  }

  /**
   * save movie to database
   * @param dto : save movie dto
   * @returns void
   */
  async saveMovieToDb(
    title: string,
    overview: string,
    poster_path: string,
  ): Promise<void> {
    try {
      await this.prisma.movie.create({
        data: {
          title: title,
          overview: overview,
          poster_path: poster_path,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
