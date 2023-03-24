import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./services/app.service";
import { MovieService } from "./services/movie.service";
import { PrismaService } from "./services/prisma.service";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, MovieService, PrismaService],
})
export class AppModule {}
